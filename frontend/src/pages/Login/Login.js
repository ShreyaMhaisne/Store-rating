import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();   

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

    console.log("User role:", res.data.user.role); 
      login({
        id: res.data.user.id,
        role: res.data.user.role,
        token: res.data.token
      });

      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "owner") navigate("/owner");
      else navigate("/user");

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="login-link">
          New user?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
