import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message, Space } from "antd";
import Input from "./form/input";
import AxiosClient from "../axiosClient";
import jwt_decode from "jwt-decode";

const initialValues = {
  title: "",
  description: "",
  content: "",
};

const required = (value) => {
  if (value === null || value === undefined || value === "") {
    return "This field is required";
  }
  return "";
};

const maxLength = (value, length) => {
  if (value.length > length) return `Maximum ${length} characters!`;
  return "";
};

const getTitleError = (value) => {
  return required(value) || maxLength(value, 255);
};

const getDescriptionError = (value) => {
  return required(value) || maxLength(value, 500);
};

const getContentError = (value) => {
  return required(value);
};
function CreatePosts() {
  let navigate = useNavigate();
  const navigateToPosts = () => {
    navigate("/posts");
  };
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  const userInfo = decoded.sub;

  const [values, SetValues] = useState(initialValues);

  const titleError = useMemo(() => {
    return getTitleError(values.title);
  }, [values.title]);

  const descriptionError = useMemo(() => {
    return getDescriptionError(values.description);
  }, [values.description]);

  const contentError = useMemo(() => {
    return getContentError(values.content);
  }, [values.content]);

  const isFormValid = !titleError && !descriptionError && !contentError;

  const handleOnChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    SetValues(newValues);
  };

  const createPost = async () => {
    const data = {
      author: {
        username: userInfo,
      },
      title: values.title,
      description: values.description,
      content: values.content,
    };
    await AxiosClient.post("/posts", data);
    SetValues({
      title: "",
      description: "",
      content: "",
    });
    message.success("Post Created Successfully!");
  };

  const handleOnSubmit = (evt) => {
    createPost();
  };

  return (
    <div>
      <h1>Create Post</h1>
      <br />
      <div className="input">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item label="Title:">
          <Input
            value={values.title}
            onChange={handleOnChange}
            name="title"
            error={titleError}
          />
        </Form.Item>
        <Form.Item label="Description:">
          <Input
            value={values.description}
            onChange={handleOnChange}
            name="description"
            error={descriptionError}
          />
        </Form.Item>
        <Form.Item label="Content:">
          <Input
            value={values.content}
            onChange={handleOnChange}
            name="content"
            error={contentError}
          />
        </Form.Item>
      </Form>
      <Space size="middle">
        <button
          class="btn btn-outline-primary"
          type="button"
          onClick={handleOnSubmit}
          disabled={!isFormValid}
        >
          Submit
        </button>
        <button
          class="btn btn-outline-primary"
          onClick={() => navigateToPosts()}
        >
          Back To Posts
        </button>
      </Space>
      </div>
    </div>
  );
}
export default CreatePosts;
