import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import backgroundImage from "../Workout/workout.jpg";

function Workout() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8070/workoutall-posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setError(""); // Clear previous error message when description changes
  };

  const validateDescription = () => {
    if (description.trim() === "") {
      setError("Description cannot be empty");
      return false;
    }
    return true;
  };

  const addPost = () => {
    if (!validateDescription()) {
      return; // Don't proceed if validation fails
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    axios
      .post("http://localhost:8070/workoutadd", formData)
      .then((response) => {
        if (response.data && response.data !== -1) {
          fetchPosts();
          setDescription(""); // Clear input field after successful addition
          toast.success("Post added successfully!");
          handleClose();
        } else {
          alert("Failed to add post!");
          toast.error("Failed to add post!");
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const editPost = (id) => {
    setSelectedPostId(id);
    axios
      .get(`http://localhost:8070/workoutdescription?id=${id}`)
      .then((response) => {
        setEditDescription(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching post description:", error);
      });
  };

  const updatePostDescription = () => {
    axios
      .put(
        `http://localhost:8070/workoutupdate-description?id=${selectedPostId}`,
        {
          description: editDescription,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          fetchPosts();
          toast.success("Description updated successfully!");
          handleClose();
        } else {
          alert("Failed to update description!");
          toast.error("Failed to update description!");
        }
      })
      .catch((error) => {
        console.error("Error updating description:", error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8070/workoutdelete-post/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchPosts();
          toast.success("Post deleted successfully!");
        } else {
          alert("Failed to delete post!");
          toast.error("Failed to delete post!");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditDescription("");
    setSelectedPostId(null);
  };

  return (
    <div
      style={{
        height: "700px",
        marginTop: "-100px",
        marginBottom: "1px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Typography
          fontSize="50px"
          variant="h1"
          component="h2"
          color="#fff"
          gutterBottom
        >
          Workout Posts
        </Typography>

        {/* Button to open dialog for adding a new post */}
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Post
        </Button>

        <br />

        {/* Dialog for adding a new post */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedPostId ? "Edit Post Discripthion" : "Add New Post"}
          </DialogTitle>
          <DialogContent>
            {selectedPostId ? null : (
              <input
                type="file"
                onChange={handleImageChange}
                className="custom-file-input mb-4"
              />
            )}
            <TextField
              value={selectedPostId ? editDescription : description}
              onChange={
                selectedPostId
                  ? (e) => setEditDescription(e.target.value)
                  : handleDescriptionChange
              }
              placeholder="Enter description"
              className="description-input border border-gray-300 p-2 rounded mb-4"
              multiline
              rows={4}
              fullWidth
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={selectedPostId ? updatePostDescription : addPost}
              color="primary"
            >
              {selectedPostId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        {/* Display all posts */}
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardContent>
                  <img
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Workout"
                  />
                  <Typography variant="body1">{post.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => editPost(post.id)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => deletePost(post.id)} color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Workout;
