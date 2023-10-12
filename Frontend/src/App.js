import "./App.css";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/authContext";
import RequiredAuth from "./components/RequireAuth";
import CreatePosts from "./components/CreatePosts";
import UpdatePosts from "./components/UpdatePosts";
import Logout from "./components/Logout";
import PageLayout from "./components/PageLayout";
import PostDetails from "./components/PostDetails";
import PostSearch from "./components/PostSearch";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />}/>
            <Route
              path="/profile"
              element={
                <RequiredAuth>
                  <Profile />
                </RequiredAuth>
              }
            />
            <Route path="/create" element={<CreatePosts />} />
            <Route path="/update/:id" element={<UpdatePosts />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/search/:title" element={<PostSearch />} /> 
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
