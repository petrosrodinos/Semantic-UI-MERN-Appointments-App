import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BusinessProfile from "./pages/business/Profile";
import CreateBusiness from "./pages/business/CreateBusiness";
import Hours from "./pages/business/Hours";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  let routes;

  if (user) {
    routes = (
      <>
        <Route path="profile" element={<Profile />} />
        <Route path="create/business" element={<CreateBusiness />} />
        <Route path="create/hours" element={<Hours />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/user/:id" element={<Profile />} />
          <Route path="profile/business/:id" element={<BusinessProfile />} />
          <Route path="create/business/profile" element={<CreateBusiness />} />
          <Route path="create/business/hours" element={<Hours />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          {/* {routes} */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
