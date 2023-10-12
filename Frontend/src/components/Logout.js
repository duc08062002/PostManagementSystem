import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Modal from "antd/lib/modal/Modal";
import React, {useState} from "react"

function Logout() {
  let navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const [logoutModalVisible, setLogoutModalVisible] = useState(true);

  const handleLogoutModalOk = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  const handleLogoutModalCancel = () => {
    setLogoutModalVisible(false);
    navigate("/")
  };
  return (

    <Modal
      title="Logout Confirmation"
      visible={logoutModalVisible}
      onOk={handleLogoutModalOk}
      onCancel={handleLogoutModalCancel}
    >
      Are you sure you want to log out?
    </Modal>
  );
}

export default Logout;
