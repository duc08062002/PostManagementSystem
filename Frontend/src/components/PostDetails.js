import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions } from "antd";
import DateFormat from "./format/dateFormat";
import AxiosClient from "../axiosClient";
import "../styles/postdetails.css";
function PostDetails() {
  let navigate = useNavigate();
  const navigateToPosts = () => {
    navigate("/posts");
  };
  const [post, SetPost] = useState([]);
  const [author, SetAuthor] = useState([]);
  const { id } = useParams();
  const getPostDetails = async () => {
    let response = await AxiosClient.get(`/posts/${id}`);
    SetPost(response.data);
    SetAuthor(response.data.author);
  };
  useEffect(() => {
    getPostDetails();
  }, [id]);
  return (
    <div>
      <h1>Post Details</h1>
      <br />
      <div className="postdetails-containter">
        <Descriptions bordered size={"default"}>
          <Descriptions.Item
            label="Author:"
            labelStyle={{ fontWeight: "bold" }}
            className="postdetails-text"
          >
            {author.username}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Title:"
            labelStyle={{ fontWeight: "bold" }}
            className="postdetails-text"
          >
            {post.title}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Description:"
            labelStyle={{ fontWeight: "bold" }}
            className="postdetails-text"
          >
            {post.description}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Content:"
            labelStyle={{ fontWeight: "bold" }}
            className="postdetails-text"
          >
            {post.content}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Created at:"
            labelStyle={{ fontWeight: "bold" }}
            className="postdetails-text"
          >
            {DateFormat(post.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <br />
      <button class="btn btn-outline-primary" onClick={() => navigateToPosts()}>
        Back To Posts
      </button>
    </div>
  );
}
export default PostDetails;
