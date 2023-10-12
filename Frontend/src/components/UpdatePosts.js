import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message, Space } from "antd";
import Input from "./form/input";
import AxiosClient from "../axiosClient";

let initialValues = {};

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

function UpdatePosts() {
  let navigate = useNavigate();
  const navigateToPosts = () => {
    navigate("/posts");
  };

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

  const isFormValid = !titleError && !descriptionError && !contentError && values !== initialValues;

  const handleOnChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    SetValues(newValues);
  };

  const { id } = useParams();
  useEffect(() => {
    getPosts();
  }, [id]);
  const getPosts = async () => {
    let response = await AxiosClient.get(`/posts/${id}`);
    SetValues(response.data);
    initialValues = response.data
  };
  const updatePost = async () => {
    const data = {
      title: values.title,
      description: values.description,
      content: values.content,
    };
    await AxiosClient.put(`/posts/${id}`, data);
    SetValues({
      title: values.title,
      description: values.description,
      content: values.content,
    });
    message.success("Post Updated Successfully!");
    getPosts();
  };

  const handleOnSubmit = () => {
      updatePost();
    
  };

  return (
    <div>
      <h1>Update Post</h1>

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
          Update
        </button>
        <button
          class="btn btn-outline-primary"
          onClick={() => navigateToPosts()}
        >
          Back To Posts
        </button>
      </Space>
    </div>
  );
}
export default UpdatePosts;
