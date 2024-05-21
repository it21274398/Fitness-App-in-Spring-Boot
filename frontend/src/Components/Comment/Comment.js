// AddComment.js

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/comments", {
        content: content,
      });

      console.log("Comment added successfully:", response.data);
      toast.success("Comment added successfully.");
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment.");
    }
  };

  return (
    <div className="add-comment-container">
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="comment-input"
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Comment;
