import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Layout, Menu, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Header } = Layout;

function PageLayout() {
  const { isAuthenticated } = useAuthContext();
  let navigate = useNavigate();
  const onSearch = (value) => {
    if (!value) {
      navigate("/");
    } else {
      navigate(`/search/${value}`);
      console.log(value);
    }
  };
  const menuitems = [
    {
      key: "/",
      label: (
        <Link to="/" style={{ padding: "10px", textDecoration: "none" }}>
          Home
        </Link>
      ),
    },
    {
      key: "/profile",
      label: (
        <Link to="/profile" style={{ padding: "10px", textDecoration: "none" }}>
          Profile
        </Link>
      ),
    },
    {
      key: "/posts",
      label: (
        <Link to="/posts" style={{ padding: "10px", textDecoration: "none" }}>
          Posts
        </Link>
      ),
    },
    {
      key: "/login",
      label: (
        <>
          {isAuthenticated === false && (
            <Link
              to="/login"
              style={{ padding: "10px", textDecoration: "none" }}
            >
              Login
            </Link>
          )}
          {isAuthenticated === true && (
            <Link
              to="/logout"
              style={{ padding: "10px", textDecoration: "none" }}
            >
              Logout
            </Link>
          )}
        </>
      ),
    },
  ];
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);
  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <div>
      <div id="background-image"></div>
      <Layout>
        <Header
          style={{
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="logo" />
          <Menu
            onClick={handleClick}
            theme="dark"
            mode="horizontal"
            height="50px"
            selectedKeys={[current]}
            items={menuitems}
            style={{
              width: "100%",
            }}
          ></Menu>
          <div>
            <Input.Search
              placeholder="Search here"
              onSearch={onSearch}
              style={{
                width: 300,
                paddingTop: 15,
              }}
            ></Input.Search>
          </div>
        </Header>
      </Layout>
      <div style={{ padding: "50px" }}>
        <Outlet />
      </div>
    </div>
  );
}
export default PageLayout;
