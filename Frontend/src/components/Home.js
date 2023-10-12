import React from "react";
import { List } from "antd";

function Home() {
  const data = [
    {
      title: "Login",
      content: "Navigate to the login page and enter your email and password to log in to the system.",
    },
    {
      title: "Register",
      content: "Fill in the required fields in the registration form and click the register button to create your account.",
    },
    {
      title: "Logout",
      content: "Click the logout button. A popup will appear to confirm if you want to sign out of your account.",
    },
    {
      title: "Create Post",
      content: "On the Posts page, click the create post button and enter the title, description, and content of your post.",
    },
    {
      title: "Edit Post",
      content: "Modify your old post and click the update button to save your changes.",
    },
    {
      title: "Delete Post",
      content: "Select the post you want to delete and click the delete button to remove it from the system.",
    },
    {
      title: "Filter Post",
      content: "Filter post by clicking into the columns header of the table, the columns include: ID, Author, Title, Description and Date Created",
    },
    {
      title: "Search Post",
      content: "Type the post title into the search box in the top right corner of the screen to search for it",
    },
  ];

  return (
    <div>
      <h1>Welcome to the Post Management System</h1>

      <br />

      <div>
        <h4>I. About</h4>

        <p>
          The Post Management System is a web application that allows users to manage their personal posts. The project is built using a variety of technologies, including ReactJS for the frontend and Spring Boot for the backend. The main functions of this web application are described below.
        </p>
      </div>

      <div>
        <h4>II. Main Functions</h4>

        <p>
          The web application consists of the following features: login, logout, register account, create, edit, delete, filter and search post by title. Users who are not logged in can only view posts, while logged-in users can also modify their own posts. Each function is described below:
        </p>

        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{textAlign: "center"}}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta title={<p>{item.title}</p>} />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Home;