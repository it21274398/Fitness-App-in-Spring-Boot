import React, { useState } from "react";
import "../../Styles/Login.css"; // Example path to the CSS file
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if username and password are not empty
    if (username.trim() === "" || password.trim() === "") {
      console.log("Please enter your details.");
      toast.error("Please fill in all fields.");
      return; // Exit the function early if username or password is empty
    }

    // Here you can perform your login authentication logic, such as sending a request to a backend server
    if (username === "li" && password === "123") {
      console.log("Login successful!");
      toast.success("Login successful!");
      // Redirect to dashboard upon successful login
      navigate("/userDashboard");
    } else {
      console.log("Invalid username or password. Please try again.");
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h3 className="login-heading">Login</h3>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p className="register-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
