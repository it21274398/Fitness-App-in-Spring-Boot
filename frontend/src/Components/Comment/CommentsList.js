import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Comment.css";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
