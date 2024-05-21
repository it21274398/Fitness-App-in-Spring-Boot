import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../Styles/MealPlanUpload.css";

const MealPlanUpload = ({ onUpload }) => {
  const [mealPlan, setMealPlan] = useState("");

  const handleUpload = async () => {
    try {
      // Send the meal plan data to the backend
      await axios.post("/api/meal-plans/upload", mealPlan);
      onUpload();

      // Display a success message
      toast.success("Meal Plan Uploaded Successfully!");
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error("Error uploading meal plan:", error);
      toast.error("Failed to Upload Meal Plan!");
    }
  };

  return (
    <div className="meal-plan-upload-container">
      <h2 className="upload-heading">Upload Meal Plan</h2>
      <textarea
        className="meal-plan-textarea"
        placeholder="Enter meal plan"
        value={mealPlan}
        onChange={(e) => setMealPlan(e.target.value)}
      ></textarea>
      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default MealPlanUpload;
