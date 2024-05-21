import React, { useState } from "react";
import "../../Styles/ProfileEdit.css"; // Import styles

const ProfileEdit = ({ profile = {}, onSave }) => {
  const [bio, setBio] = useState(profile?.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    profile?.profilePictureUrl || ""
  );

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      bio: bio,
      profilePictureUrl: profilePicture,
    };
    onSave(updatedProfile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-heading">Edit Profile</h2>
      <div className="profile-edit-form">
        <label htmlFor="bio" className="profile-edit-label">
          Bio:
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="profile-edit-textarea"
        />
        <label htmlFor="profilePicture" className="profile-edit-label">
          Profile Picture:
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleImageUpload}
          className="profile-edit-file"
        />
        <img
          src={profilePicture}
          alt="Profile"
          className="profile-edit-preview"
        />
        <button onClick={handleSaveProfile} className="profile-edit-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
