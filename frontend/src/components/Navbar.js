import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left" onClick={() => navigate("/")}>
        ⭐ Store Rating System
      </div>

      <div className="nav-right">
        {role === "admin" && <span onClick={() => navigate("/admin")}>Admin Dashboard</span>}
        {role === "user" && <span onClick={() => navigate("/user")}>User Dashboard</span>}
        {role === "owner" && <span onClick={() => navigate("/owner")}>Owner Dashboard</span>}

        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
