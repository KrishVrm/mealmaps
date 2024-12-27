import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";

const Window = ({
  setIsWindowOpen,
  isWindowOpen,
  nutrition,
  isLoading,
  dishData,
  ingredients,
  dishID,
  instructions,
  apiKey,
}) => {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showRecipe, setShowRecipe] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const windowRef = useRef();

  // Fetching Similar Recipes.
  useEffect(() => {
    if (isWindowOpen) {
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
    }
  }, []);

  // Close window by clicking anywhere outside it.
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
      <button className="icon-btn">
        <IoCloseCircleOutline
          style={{ height: "2rem", width: "2rem" }}
          onClick={() => setIsWindowOpen(false)}
        />
      </button>
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
                <h3>Similar Recipes</h3>
                {similarRecipes.map((element) => {
                  return (
                    <>
                      <p>{element.title}</p>
                      <button className="secondary-btn">
                        <a target="_blank" href={element.sourceUrl}>
                          Source Link
                        </a>
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="second-container">
              {/* <button
                onClick={() => setIsWindowOpen(false)}
                className="secondary-btn close-btn"
              >
                Close
              </button> */}
              <h2>{dishData.title}</h2>
              <h4>Servings: {dishData.servings}</h4>
              {/* <h4>Weight Per Serving: {nutrition.weightPerServing}</h4>  */}

              <div className="second-container_button_container">
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
              </div>

              {showIngredients &&
                ingredients.map((element) => {
                  return (
                    <>
                      <div>
                        <p
                          key={element.id}
                        >{`${element.amount} ${element.unit} of ${element.name}  `}</p>
                      </div>
                    </>
                  );
                })}

              {showRecipe &&
                instructions.map((element) => {
                  return (
                    <>
                      <p>{element.step}</p>
                    </>
                  );
                })}
            </div>

            <div className="nutrition-container">
              {/* <button className="secondary-btn">Close</button> */}
              <h3>Nutrition</h3>
              <hr />
              {nutrition.map((element, index) => {
                return (
                  <div className="nutrition_div">
                    <h5>{element.name}:</h5>
                    <p id={element.id}>{`${element.amount} ${element.unit}`}</p>
                  </div>
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
