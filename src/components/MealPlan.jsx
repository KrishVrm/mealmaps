import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const MealPlan = ({ caloriesPerMeal }) => {
  const [breakfastMealPlan, setBreakfastMealPlan] = useState([]);
  const [lunchMealPlan, setLunchMealPlan] = useState([]);
  const [dinnerMealPlan, setDinnerMealPlan] = useState([]);
  // Fetching Data from Spoonacular API
  useEffect(() => {
    if (caloriesPerMeal !== null) {
      (async () => {
        try {
          // setIsLoading(true);
          const breakfastResponse = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=4ace843bbba94a86b532d81045caea70&minCalories=${
              caloriesPerMeal - 20
            }&maxCalories=${caloriesPerMeal + 20}&type=breakfast&number=6`
          );
          const lunchResponse = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=4ace843bbba94a86b532d81045caea70&minCalories=${
              caloriesPerMeal - 20
            }&maxCalories=${caloriesPerMeal + 20}&type=lunch&number=6`
          );
          const dinnerResponse = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=4ace843bbba94a86b532d81045caea70&minCalories=${
              caloriesPerMeal - 20
            }&maxCalories=${caloriesPerMeal + 20}&type=maincourse&number=6`
          );
          // console.log("complex search response", response.data);
          setBreakfastMealPlan(breakfastResponse.data.results);
          setLunchMealPlan(lunchResponse.data.results);
          setDinnerMealPlan(dinnerResponse.data.results);
          console.log("hello from mealplan", breakfastMealPlan);
          console.log("hello from mealplan lunch", lunchMealPlan);
          console.log("hello from mealplan dinner", dinnerMealPlan);
          // console.log("this is breakfast mealPlan.jsx", mealPlan.breakfast);
          // setMealPlan({...MealPlan, })
          // setIsLoading(false);
        } catch (err) {
          // setIsLoading(false);
          console.log("this is error from complex search", err);
          // err.response.status == 402 && setErrorPage(true);
        }
      })();
    }
  }, [caloriesPerMeal]);
  return (
    <div className="meal_plan_container">
      {breakfastMealPlan.map((element, index) => {
        return (
          <>
            <div className="meal_plan_container_card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${breakfastMealPlan[index].image})`,
                }}
              ></div>
              <h4>{breakfastMealPlan[index].title}</h4>
            </div>
            <div className="meal_plan_container_card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${lunchMealPlan[index].image})`,
                }}
              ></div>
              <h4>{lunchMealPlan[index].title}</h4>
            </div>
            <div className="meal_plan_container_card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${dinnerMealPlan[index].image})`,
                }}
              ></div>
              <h4>{dinnerMealPlan[index].title}</h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MealPlan;
