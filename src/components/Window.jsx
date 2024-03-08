import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Window = ({
  setIsWindowOpen,
  isWindowOpen,
  diet,
  nutrition,
  isLoading,
  dishData,
  ingredients,
  dishID,
  instructions,
}) => {
  const apiKey = "4ace843bbba94a86b532d81045caea70";
  const [showIngredients, setShowIngredients] = useState(true);
  const [showRecipe, setShowRecipe] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const windowRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${dishID}/similar?apiKey=${apiKey}&number=1`
        );
        console.log("similar recipes", response);
        setSimilarRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!windowRef.current.contains(e.target)) {
        setIsWindowOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="window">
      <div ref={windowRef} className="window-content-container">
        {isLoading ? (
          <h2>Loading more info...</h2>
        ) : (
          <>
            <div className="first-container">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${dishData.image})`,
                }}
              ></div>

              <div className="similar-recipes-container">
                <h2>Similar Recipes</h2>
                {similarRecipes.map((element) => {
                  return (
                    <>
                      <h4>{element.title}</h4>
                      <a target="_blank" href={element.sourceUrl}>
                        Source Link
                      </a>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="second-container">
              <h2>{dishData.title}</h2>
              <h4>Servings: {dishData.servings}</h4>
              <h4>Weight Per Serving: {nutrition.weightPerServing}</h4>
              <button
                onClick={() => {
                  setShowRecipe(false);
                  setShowIngredients(true);
                }}
                style={{ opacity: showIngredients && 1 }}
                className="secondary-btn"
              >
                Ingredients
              </button>

              <button
                onClick={() => {
                  setShowIngredients(false);
                  setShowRecipe(true);
                }}
                style={{ opacity: showRecipe && 1 }}
                className="secondary-btn"
              >
                Recipe
              </button>

              {showIngredients &&
                ingredients.map((element) => {
                  return (
                    <>
                      <div>
                        <h4
                          key={element.id}
                        >{`${element.amount} ${element.unit} of ${element.name}  `}</h4>
                      </div>
                    </>
                  );
                })}

              {showRecipe &&
                instructions.map((element) => {
                  return (
                    <>
                      <h4>{element.step}</h4>
                    </>
                  );
                })}
            </div>

            <div className="nutrition-container">
              <h2>Nutrition</h2>
              {nutrition.map((element, index) => {
                return (
                  <>
                    <h4
                      id={element.id}
                    >{`${element.name}: ${element.amount} ${element.unit}`}</h4>
                  </>
                );
              })}
              <h4>{nutrition.sugar}</h4>
              <h4>{nutrition.sodium}</h4>
              <h4>{nutrition.cholesterol}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Window;
