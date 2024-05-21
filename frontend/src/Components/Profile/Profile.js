import React from "react";
import "../../Styles/Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h2 className="profile-heading">{user?.username}'s Profile</h2>
      <div className="profile-details">
        <p className="profile-bio">Bio: {user?.bio}</p>
        <p className="profile-email">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
