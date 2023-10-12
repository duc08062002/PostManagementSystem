import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import DateFormat from "./format/dateFormat";
import jwt_decode from "jwt-decode";
import AxiosClient from "../axiosClient";
import "../styles/profile.css";

function Profile() {
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  const userInfo = decoded.sub;
  const [author, SetAuthor] = useState([]);
  const getAuthor = async () => {
    let response = await AxiosClient.get(`/authors/${userInfo}`);
    SetAuthor(response.data);
  };
  useEffect(() => {
    getAuthor();
  }, [userInfo]);
  return (
    <div>
      <h1>User Profile</h1>
      <div className="profile-container">
        <Descriptions bordered size={"default"}>
          <Descriptions.Item
            label="Username:"
            labelStyle={{ fontWeight: "bold" }}
            className="profile-text"
          >
            {author.username}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="First name:"
            labelStyle={{ fontWeight: "bold" }}
            className="profile-text"
          >
            {author.firstName}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Last name:"
            labelStyle={{ fontWeight: "bold" }}
            className="profile-text"
          >
            {author.lastName}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Email:"
            labelStyle={{ fontWeight: "bold" }}
            className="profile-text"
          >
            {author.email}
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item
            label="Birthdate:"
            labelStyle={{ fontWeight: "bold" }}
            className="profile-text"
          >
            {DateFormat(author.birthDate)}
          </Descriptions.Item>
        </Descriptions>

      </div>
      
    </div>
  );
}
export default Profile;
