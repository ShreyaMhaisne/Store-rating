import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>

        <input
          className="signup-input"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="signup-input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="signup-input"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="signup-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="signup-btn" onClick={submit}>
          Create Account
        </button>

        <p className="signup-login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
