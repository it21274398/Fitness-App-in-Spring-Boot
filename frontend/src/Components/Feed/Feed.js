import React from "react";
import "../../Styles/Feed.css"; // Import your CSS file
import Post from "../Post/Post";

const Feed = ({ posts }) => {
  // Check if posts is undefined or null
  // if (!posts || posts.length === 0) {
  //   return <div>No posts available</div>;
  // }

  // Hard-coded posts for demonstration
  const hardCodedPosts = [
    {
      id: 1,
      title: " Post 1",
      content: "This is the content of the first hard-coded post.",
      author: "Hard Coder",
    },
  ];

  return (
    <div className="feed-container">
      <div className="feed-content">
        {/* Map through the hard-coded posts array */}
        {hardCodedPosts.map((post) => (
          <div key={post.id} className="post-container">
            {/* Render individual Post components */}
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
