import React, { useState, useEffect } from "react";
import axios from "axios";
import Window from "./Window";

const Card = ({ dishArray, apiKey }) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  document.body.style.overflow = isWindowOpen ? "hidden" : "visible";

  const [isLoading, setIsLoading] = useState(false);

  const [dishID, setDishID] = useState(null);

  const [dishData, setDishData] = useState({
    title: "",
    image: "",
    servings: "",
  });
  const [diet, setDiet] = useState({
    vegan: false,
    veg: false,
    nonVeg: false,
    glutenFree: false,
    dairyFree: false,
  });

  const [instructions, setInstructions] = useState([]);

  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleCardClick = (e) => {
    setIsWindowOpen(true);
    setDishID(e.target.id);
  };

  // Nutrition by ID API (more data about the dish, pushed to window)
  useEffect(() => {
    if (dishArray.length !== 0) {
      (async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${dishID}/information?apiKey=${apiKey}&includeNutrition=true`
          );
          console.log("this is nutrition widget", response.data.dishTypes);
          setDishData((prev) => {
            return {
              ...prev,
              title: response.data.title,
              image: response.data.image,
              servings: response.data.servings,
            };
          });

          console.log(response.data.nutrition);
          const responseNutritionData = response.data.nutrition;

          setNutrition(responseNutritionData.nutrients);

          setIngredients(responseNutritionData.ingredients);

          setDiet({
            ...diet,
            vegan: response.data.vegan,
            veg: response.data.vegetarian,
            glutenFree: response.data.glutenFree,
            dairyFree: response.data.dairyFree,
          });

          setInstructions(response.data.analyzedInstructions[0].steps);
          setIsLoading(false);
        } catch (error) {
          // console.log(error)
        }
      })();
    }
  }, [dishID]);

  return (
    <>
      {dishArray.map((element) => {
        return (
          <div
            key={element.id}
            id={element.id}
            className="card"
            onClick={handleCardClick}
          >
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${element.image})`,
              }}
            ></div>
            <div className="card-content">
              {/* {diet.vegan && <h3 className="diet">Vegan</h3>}
              {diet.veg && <h3 className="diet">Vegetarian</h3>}
              {diet.glutenFree && <h3 className="diet">Gluten-Free</h3>}
              {diet.dairyFree && <h3 className="diet">Dairy-Free</h3>} */}

              <h3 className="card-content-title">{element.title}</h3>

              <div className="nutrients-row-container">
                <div className="nutrients-content">
                  <h4 className="input-title">Fat</h4>
                  <h3>{element.fat}</h3>
                </div>

                <div className="nutrients-content">
                  <h4 className="input-title">Carbs</h4>
                  <h3>{element.carbs}</h3>
                </div>
                <div className="nutrients-content">
                  <h4 className="input-title">Protein</h4>
                  <h3>{element.protein}</h3>
                </div>
              </div>

              {/* <p>Calories = {element.calories}</p> */}
            </div>
            {/* <button onClick={handleCardClick} className="cta">
              More Info
            </button> */}
          </div>
        );
      })}
      {isWindowOpen && (
        <Window
          diet={diet}
          nutrition={nutrition}
          dishData={dishData}
          ingredients={ingredients}
          isWindowOpen={isWindowOpen}
          setIsWindowOpen={setIsWindowOpen}
          isLoading={isLoading}
          dishID={dishID}
          instructions={instructions}
          apiKey={apiKey}
        />
      )}
    </>
  );
};

export default Card;
