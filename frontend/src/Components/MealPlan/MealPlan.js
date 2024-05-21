import React, { useState } from "react";
import "../../Styles/MealPlan.css";
import { toast } from "react-toastify";

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState("");

  const handleShareMealPlan = () => {
    // Logic for sharing meal plan
    console.log("Sharing meal plan:", mealPlan);
    toast.success(`Your meal plan has been shared!`);
  };

  return (
    <div className="meal-plan-container">
      <h2 className="meal-plan-heading">Meal Plan</h2>
      <textarea
        placeholder="Enter meal plan"
        value={mealPlan}
        onChange={(e) => setMealPlan(e.target.value)}
        className="meal-plan-textarea"
      ></textarea>
      <button onClick={handleShareMealPlan} className="share-btn">
        Share
      </button>
    </div>
  );
};

export default MealPlan;
