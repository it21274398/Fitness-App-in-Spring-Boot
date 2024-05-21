import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import BrowserRouter and useLocation
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import Profile from "./Components/Profile/Profile";
import ProfileEdit from "./Components/ProfileEdit/ProfileEdit";
import Post from "./Components/Post/Post";
import ImageUploader from "./Components/Post/ImageUploader";
import Comment from "./Components/Comment/Comment";
import CommentsList from "./Components/Comment/CommentsList";
import Footer from "./Components/Footer/Footer";
import MealPlan from "./Components/MealPlan/MealPlan";
import MealPlanUpload from "./Components/MealPlanUpload/MealPlanUpload";
import Workout from "./Components/Workout/Workout";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import Feed from "./Components/Feed/Feed";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

// Layout component to conditionally render header and footer
function Layout({ children }) {
  const location = useLocation(); // Use useLocation hook to get the current location

  // Define an array of paths where header and footer should be shown
  const showHeaderFooterPaths = [
    "/userDashboard",
    "/profile",
    "/posts",
    "/comment",
    "/commentsList",
    "/mealPlan",
    "/profileEdit",
    "/mealPlanUpload",
    "/workout",
    "/feed",
    "/imageUploader",
  ];

  // Check if the current path is included in the array
  const showHeaderFooter = showHeaderFooterPaths.includes(location.pathname);

  // Render header and footer only if the current path matches the conditions
  return (
    <div className="App">
      {showHeaderFooter && <NavBar />}
      {children}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/commentsList" element={<CommentsList />} />
          <Route path="/mealPlan" element={<MealPlan />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/mealPlanUpload" element={<MealPlanUpload />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/imageUploader" element={<ImageUploader />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
