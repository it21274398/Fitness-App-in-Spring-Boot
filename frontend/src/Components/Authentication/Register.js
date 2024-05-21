import React, { useState } from "react";
import "../../Styles/Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Check if username, email, password, and bio are not empty
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      bio.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return; // Exit the function early if any field is empty
    }

    // Validate email using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return; // Exit the function if email is not valid
    }

    // Assuming registration is successful, you can log the registration details
    console.log("Registering with:", username, email, password, bio);

    // Show success message using toast
    toast.success("Registration successful!");

    // Redirect to the profile page upon successful registration
    navigate("/profile");
  };

  return (
    <div className="Register">
      <div className="register-container">
        <h3 className="register-heading">Register</h3>
        <input
          type="text"
          className="register-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          className="register-input"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
