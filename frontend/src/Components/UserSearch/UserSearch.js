import React, { useState } from "react";

const UserSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Logic for searching users based on searchTerm
    onSearch(searchTerm);
  };

  return (
    <div>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserSearch;
