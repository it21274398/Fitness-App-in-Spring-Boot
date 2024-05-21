import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  IconButton,
  Avatar,
  CardHeader,
  CardActions,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";

function AllWorkout() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8070/workoutall-posts")
      .then((response) => {
        setPosts(
          response.data.map((post) => ({
            ...post,
            comments: post.comments || [],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleLike = (id) => {
    // Implement like functionality
  };

  const handleComment = (postId) => {
    const formData = {
      text: commentText,
    };

    axios
      .post(`http://localhost:8070/workoutadd-comment/${postId}`, formData)
      .then((response) => {
        if (response.data && response.data !== -1) {
          fetchPosts();
          setCommentText(""); // Clear input field after successful addition
        } else {
          alert("Failed to add comment!");
        }
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:8070/workoutall-posts/${postId}/comments/${commentId}`
      );
      fetchPosts();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (postId, commentId, newText) => {
    try {
      await axios.put(
        `http://localhost:8070/workoutall-posts/${postId}/comments/${commentId}`,
        {
          text: newText,
        }
      );
      setEditingComment({});
      fetchPosts();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment);
  };

  const cancelEditing = () => {
    setEditingComment({});
  };

  return (
    <div
      style={{
        marginBottom: "1px",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <br />
        <Typography
          fontSize="40px"
          variant="h1"
          component="h2"
          color="#000"
          gutterBottom
        >
          Workout Posts
        </Typography>
        <br />

        {/* Display all posts */}
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardHeader
                  avatar={<Avatar aria-label="User" src={post.avatar} />}
                  title={post.username}
                  subheader={post.timestamp}
                />
                {post.image && (
                  <img
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Workout"
                  />
                )}
                <CardContent>
                  <Typography variant="body1">{post.description}</Typography>
                  {/* Display comments */}
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      {editingComment.id === comment.id ? (
                        <div>
                          <TextField
                            value={editingComment.text}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                text: e.target.value,
                              })
                            }
                          />
                          <Button
                            onClick={() =>
                              handleEditComment(
                                post.id,
                                comment.id,
                                editingComment.text
                              )
                            }
                          >
                            Save
                          </Button>
                          <Button onClick={cancelEditing}>Cancel</Button>
                        </div>
                      ) : (
                        <div>
                          <Typography>{comment.text}</Typography>
                          <IconButton
                            onClick={() =>
                              handleDeleteComment(post.id, comment.id)
                            }
                          >
                            <DeleteOutlineOutlined />
                          </IconButton>
                          <IconButton onClick={() => startEditing(comment)}>
                            <EditOutlined />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Comment form */}
                  <TextField
                    fullWidth
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment"
                  />
                  <Button onClick={() => handleComment(post.id)}>
                    Comment
                  </Button>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                  <IconButton onClick={() => handleLike(post.id)}>
                    <FavoriteBorderOutlined />
                  </IconButton>
                  <Typography>{post.likes}</Typography>
                  <IconButton>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{post.comments.length}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllWorkout;
