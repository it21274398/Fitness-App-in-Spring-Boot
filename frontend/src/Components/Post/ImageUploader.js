import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "../../Styles/ImageUploader.css"; // Import CSS file for styling

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadType, setUploadType] = useState("image");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClear = () => {
    window.location.reload();
    setFile(null);
    setDescription("");
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append(uploadType, file);
      formData.append("description", description);

      const endpoint =
        uploadType === "image"
          ? "http://localhost:8070/add"
          : "http://localhost:8070/add-video";

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();

      console.log(
        `${
          uploadType.charAt(0).toUpperCase() + uploadType.slice(1)
        } uploaded successfully. ID:`,
        response.data
      );
      handleClear();
    } catch (error) {
      toast.error(`Failed to upload ${uploadType}...`);
      console.error(`Error uploading ${uploadType}:`, error);
      setUploadError(`Error uploading ${uploadType}. Please try again.`);
    }
    setIsUploading(false);
  };

  return (
    <div className="imageuploader" id="imageuploder">
      <div className="image-uploader-container">
        <h2 className="title">
          Upload {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}
        </h2>
        <div className="upload-type-buttons">
          <button
            className={`toggle-button ${
              uploadType === "image" ? "active" : ""
            }`}
            onClick={() => setUploadType("image")}
          >
            <FontAwesomeIcon icon={faImage} /> Upload a Image
          </button>
          <button
            className={`toggle-button ${
              uploadType === "video" ? "active" : ""
            }`}
            onClick={() => setUploadType("video")}
          >
            <FontAwesomeIcon icon={faVideo} /> Upload a Video
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              className="chooseimagelabel"
              htmlFor={uploadType}
              id="upload-label"
            >
              Choose {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}:
            </label>
            <input
              className="chooseimagebutton"
              type="file"
              id={uploadType}
              accept={uploadType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
            />
          </div>
          {previewUrl && (
            <div className="preview-container">
              {uploadType === "image" ? (
                <img src={previewUrl} alt="Preview" className="preview-image" />
              ) : (
                <video controls className="preview-video">
                  <source src={previewUrl} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          <div className="form-group">
            <label className="descriptioncolor" htmlFor="description">
              Description:
            </label>
            <input
              placeholder="Type here"
              type="text"
              id="description"
              className="description-input"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              disabled={isUploading}
            >
              <FontAwesomeIcon icon={faUpload} />{" "}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faTrash} /> Clear
            </button>
          </div>
          {uploadError && <div className="error-message">{uploadError}</div>}
        </form>
      </div>
    </div>
  );
};

export default ImageUploader;
