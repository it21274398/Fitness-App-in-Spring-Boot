import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faTimes,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../../Styles/PostList.css"; // Import CSS file for styling

const PostList = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [description, setDescription] = useState("");
  const [commentInput, setCommentInput] = useState(""); // State variable for comment input
  const [comments, setComments] = useState([]); // State variable for comments
  const [, setFilter] = useState("none"); // State variable for filter
  const [isLiked, setIsLiked] = useState(false); // State variable for like status

  const fetchMedia = async (mediaType) => {
    setLoading(true);
    try {
      const endpoint = mediaType === "image" ? "all-posts" : "videos";
      const response = await axios.get(`http://localhost:8070/${endpoint}`);
      setMedia(response.data.map((item) => ({ ...item, type: mediaType }))); // Set the type of each item in the response based on the mediaType
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${mediaType}s:`, error);
      toast.error(`Failed to fetch ${mediaType}s.`);
      setLoading(false);
    }
  };

  const handleMediaClick = async (id, type) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/display?id=${id}`
      );
      setSelectedMedia({ ...response.data, id, type });
      setDescription(response.data.description);
      fetchComments(id); // Fetch comments for the selected post
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error(`Failed to display post ${id}!`);
    }
  };

  const handlevideoClick = async (id, type) => {
    try {
      const response = await axios.get(`http://localhost:8070/video/${id}`);
      setSelectedMedia({ ...response.data, id, type });
      setDescription(response.data.description);
      fetchComments(id); // Fetch comments for the selected post
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error(`Failed to display post ${id}!`);
    }
  };

  const handleClosePreview = () => {
    setSelectedMedia(null);
  };

  const handleDescriptionUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8070/update-description?id=${selectedMedia.id}`,
        { description: description }
      );
      // Update the description in the local state
      setMedia((prevMedia) =>
        prevMedia.map((item) =>
          item.id === selectedMedia.id
            ? { ...item, description: description }
            : item
        )
      );
      toast.success("Description updated successfully!");
      setSelectedMedia(null); // Close the popup window after update
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8070/delete-post/${selectedMedia.id}`
      );
      // Remove the deleted media from the local state
      setMedia((prevMedia) =>
        prevMedia.filter((item) => item.id !== selectedMedia.id)
      );
      toast.success("Media deleted successfully!");
      setSelectedMedia(null); // Close the popup window after deletion
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media!");
    }
  };

  const fetchComments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8070/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      // Make a POST request to save the comment to the database
      const response = await axios.post(
        `http://localhost:8070/add-comment/${selectedMedia.id}`,
        { content: commentInput } // Send the comment input as content
      );
      // Update the state with the new comment
      setComments([...comments, response.data]);
      // Clear the comment input field
      setCommentInput("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8070/delete-comment/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleFilterChange = (mediaType) => {
    setFilter(mediaType);
    fetchMedia(mediaType);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-list-container">
      <h2 className="post-list-heading">My Posts</h2>
      <div className="filter-buttons">
        <button
          className="image1-button"
          onClick={() => handleFilterChange("image")}
        >
          View Images
        </button>
        <button
          className="video1-button"
          onClick={() => handleFilterChange("video")}
        >
          View Videos
        </button>
      </div>
      {loading ? (
        <p>Loading media...</p>
      ) : (
        <div className="post-list-items-container">
          {media.map((item) => (
            <div key={item.id} className="post-item">
              {item.type === "image" ? (
                <img
                  src={`http://localhost:8070/display?id=${item.id}`}
                  alt="Uploaded"
                  className="post-image"
                  onClick={() => handleMediaClick(item.id, item.type)}
                />
              ) : (
                <div className="video-container">
                  <video className="post-video" controls>
                    <source
                      src={`http://localhost:8070/video/${item.id}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="view-button"
                    onClick={() => handlevideoClick(item.id, item.type)}
                  >
                    View
                  </button>
                </div>
              )}
              <p className="post-description">{item.description}</p>
              {selectedMedia && selectedMedia.id === item.id && <></>}
            </div>
          ))}
        </div>
      )}
      {selectedMedia && (
        <div className="popup-container active">
          <div className="popup-content active">
            {selectedMedia.type === "image" ? (
              <img
                src={`http://localhost:8070/display?id=${selectedMedia.id}`}
                alt="Selected"
                className="selected-image"
              />
            ) : (
              <div className="selected-video-container">
                <video className="selected-video" controls>
                  <source
                    src={`http://localhost:8070/video/${selectedMedia.id}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p className="selected-description">{description}</p>
            <button
              className="update-description-button"
              onClick={handleDescriptionUpdate}
            >
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="close-popup" onClick={handleClosePreview}>
              <FontAwesomeIcon icon={faTimes} />
            </button>{" "}
            {/* Like button */}
            <button
              className="like-button"
              onClick={toggleLike}
              style={{ color: isLiked ? "red" : "white" }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <textarea
              className="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update your Description here.."
            />
            {/* Comment input field */}
            <div className="like-comment-container">
              <input
                className="commentcontainer"
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              {/* Button to submit the comment */}
              <button
                className="submit-comment-button"
                onClick={handleCommentSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            {/* Display comments */}
            <div className="comments-section">
              <p className="posts-comments">Comments...</p>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                  <button
                    className="delete-comment-button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
