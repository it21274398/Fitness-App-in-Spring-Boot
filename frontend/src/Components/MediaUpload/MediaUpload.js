import React, { useState } from "react";

const MediaUpload = ({ onUpload }) => {
  const [mediaFile, setMediaFile] = useState(null);

  const handleUpload = () => {
    // Logic for uploading media file
    onUpload(mediaFile);
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MediaUpload;
