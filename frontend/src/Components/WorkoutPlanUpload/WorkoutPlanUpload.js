import React, { useState } from "react";
import "../../Styles/WorkoutPlanUpload.css"; // Import styles

const WorkoutPlanUpload = ({ onUpload }) => {
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpload = () => {
    if (workoutPlan.trim() === "") {
      setErrorMessage("Please enter a workout plan.");
      return;
    }

    // Perform file type validation (for demonstration, assume only text files are allowed)
    if (!workoutPlan.endsWith(".txt")) {
      setErrorMessage("Only text files (.txt) are allowed.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    // Call the onUpload function with the workout plan
    onUpload(workoutPlan);

    // Display success message
    setSuccessMessage("Workout plan uploaded successfully.");

    // Reset the input field after upload
    setWorkoutPlan("");
  };

  return (
    <div className="workout-plan-upload-container">
      <h2 className="workout-plan-upload-heading">Upload Workout Plan</h2>
      <textarea
        placeholder="Enter workout plan"
        value={workoutPlan}
        onChange={(e) => setWorkoutPlan(e.target.value)}
        className="workout-plan-upload-textarea"
      ></textarea>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <button onClick={handleUpload} className="workout-plan-upload-button">
        Upload
      </button>
    </div>
  );
};

export default WorkoutPlanUpload;
