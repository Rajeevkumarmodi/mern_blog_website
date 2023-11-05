import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import UserHome from "./pages/userHome/UserHome";
import CreateBlog from "./pages/createBlog/CreateBlog";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/creatblog" element={<CreateBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myblogs" element={<p>this is my blogs page</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
