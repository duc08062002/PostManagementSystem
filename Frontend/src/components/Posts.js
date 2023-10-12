import { useNavigate } from "react-router-dom";
import { Space, Table, message} from "antd";
import { useState, useEffect } from "react";
import DateFormat from "./format/dateFormat";
import { useAuthContext } from "../context/authContext";
import jwt_decode from "jwt-decode";
import AxiosClient from "../axiosClient";
import TimeFormat from "./format/timeFormat";
import { Modal, Button } from "react-bootstrap";

function Post() {
  const { Column } = Table;
  const { isAuthenticated } = useAuthContext();
  const [post, SetPost] = useState([]);
  const [authors, SetAuthors] = useState([]);
  let token = localStorage.getItem("access_token");
  const [userInfo, SetUserInfo] = useState(null);

  const getPosts = async () => {
    let response = await AxiosClient.get("/posts");
    SetPost(response.data);
  };
  const getAuthors = async () => {
    let response = await AxiosClient.get("/authors");
    SetAuthors(response.data);
  };
  const deletePost = async (id) => {
    await AxiosClient.delete(`/posts/${id}`);
    getPosts();
  };
  useEffect(() => {
    getPosts();
    getAuthors();
    if (token !== null) {
      const decoded = jwt_decode(token);
      SetUserInfo(decoded.sub);
    }
  }, [token]);
  let navigate = useNavigate();
  const navigateToCreatePost = () => {
    navigate("/create");
  };
  const navigateToUpdatePost = (id) => {
    navigate(`/update/${id}`);
  };
  const navigateToPostDetails = (id) => {
    navigate(`/posts/${id}`);
  };

  function authorListHandler(authors) {
    return {
      value: authors.username,
      text: authors.username,
    };
  }
  const newAuthorList = authors.map(authorListHandler);

  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const handleDeleteItem = () => {
    var id = deleteId
    deletePost(id)
    setShow(false);
    message.success('Post deleted.')
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this post from the database? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Post Management System</h1>
      {isAuthenticated === true && (
        <button class="btn btn-outline-primary" onClick={navigateToCreatePost} style={{float:"right"}}>
          Create post
        </button>
      )}
      <br /><br />
      <Table
        dataSource={post.map((p) => ({ ...p, author: p.author.username }))}
        key="1"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
      >
        <Column title="Id" dataIndex="id" key={post.id} />
        <Column
          title="Author"
          dataIndex="author"
          key={post.author}
          filters={newAuthorList}
          onFilter={(value, record) => record.author.indexOf(value) === 0}
        />
        <Column
          title="Title"
          dataIndex="title"
          key={post.title}
          sorter={(a, b) => a.title.localeCompare(b.title)}
        />
        <Column
          title="Description"
          dataIndex="description"
          key={post.description}
          sorter={(a, b) => a.description.localeCompare(b.description)}
        />
        <Column
          title="Date Created"
          key={post.createdAt}
          sorter={(a, b) => TimeFormat(a.createdAt) - TimeFormat(b.createdAt)}
          render={(_, record) => <>{DateFormat(`${record.createdAt}`)}</>}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button
                class="btn btn-primary btn-sm"
                onClick={() => navigateToPostDetails(`${record.id}`)}
              >
                Details
              </button>
              {isAuthenticated === true && userInfo === record.author && (
                <>
                  <button
                    class="btn btn-secondary btn-sm"
                    onClick={() => navigateToUpdatePost(`${record.id}`)}
                  >
                    Edit 
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleClickDelete(record.id)}
                  >
                    Delete
                  </button>

                </>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Post;
