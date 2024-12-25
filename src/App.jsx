import React, { useEffect, useState, useRef } from "react";
import Hero from "./components/Hero";
import "./styles/main.css";
import Card from "./components/Card";
import MealPlan from "./components/MealPlan";
import axios from "axios";
import Select from "react-select";
import ErrorPage from "./components/ErrorPage";
import GenderNotSelected from "./svgs/GenderNotSelected";
import MaleSelected from "./svgs/MaleSelected";
import FemaleSelected from "./svgs/FemaleSelected";
import FemaleAvatarSelected from "./svgs/FemaleAvatarSelected";
import MaleAvatarSelected from "./svgs/MaleAvatarSelected";
import FemaleAvatarUnselected from "./svgs/FemaleAvatarUnselected";
import MaleAvatarUnselected from "./svgs/MaleAvatarUnselected";
import Footer from "./global_components/Footer";

function App() {
  const numberRegex = /^[0-9]*$/;
  const stringRegex = /^[a-zA-Z]+$/;
  const apiKey = "4ace843bbba94a86b532d81045caea70";

  // useStates
  const [form, setForm] = useState({
    age: { value: "", unit: "yrs" },
    weight: { value: "", unit: "kgs" },
    height: { value: "", unit: "cms" },
    gender: "",
    activity: "Sedentary",
  });
  const react_selectCustomStyles = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "var(--lime-green)" // Change background color when option is selected
        : state.isFocused
        ? "#f0a500" // Change background color when option is hovered
        : baseStyles.backgroundColor, // Default background color

      backgroundColor: state.isFocused
        ? "var(--lime-green)"
        : baseStyles.backgroundColor, // Change hover color
      color: state.isFocused ? "var(--charcoal)" : baseStyles.color, // Optional: change text color
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: "none",
      borderWidth: "2px",
      borderColor:
        state.isFocused || state.isPressed
          ? "var(--lime-green)"
          : baseStyles.borderColor, // Change border color
      color: "var(--white)",
      boxShadow: state.isFocused ? "var(--lime-green)" : baseStyles.boxShadow,
      "&:hover": {
        borderColor: "var(--lime-green)", // Change border color on hover
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      background: "var(--gray)",
    }),
  };
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);
  const [caloriesPerMeal, setCaloriesPerMeal] = useState(null);
  const [showMaleSelected, setShowMaleSelected] = useState(false);
  const [showFemaleSelected, setShowFemaleSelected] = useState(false);
  const [showMaleUnselected, setShowMaleUnselected] = useState(true);
  const [showFemaleUnselected, setShowFemaleUnselected] = useState(true);
  const [dishArray, setDishArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  // Dropdown Options
  const activityOptions = [
    { value: "Sedentary", label: "Sedentary" },
    { value: "Lightly Active", label: "Lightly Active" },
    { value: "Moderately Active", label: "Moderately Active" },
    { value: "Active", label: "Active" },
    { value: "Very Active", label: "Very Active" },
  ];

  // Fetching Data from Spoonacular API
  useEffect(() => {
    if (caloriesPerMeal !== null) {
      (async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}&minCalories=${
              caloriesPerMeal - 20
            }&maxCalories=${caloriesPerMeal + 20}&number=10`
          );
          setDishArray(response.data);
          console.log("first response data (dishes)", response.data);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log("this is error", err);
          err.response.status == 402 && setErrorPage(true);
        }
      })();
    }
  }, [caloriesPerMeal]);

  function calculateCaloriesPerDay({ age, weight, height, gender, activity }) {
    let bmr;
    if (gender == "female")
      bmr =
        655.1 + 9.563 * weight.value + 1.85 * height.value - 4.676 * age.value;

    if (gender == "male")
      bmr =
        66.47 + 13.75 * weight.value + 5.003 * height.value - 6.755 * age.value;

    let amr;
    switch (activity) {
      case "Sedentary":
        amr = bmr * 1.2;
        break;
      case "Lightly Active":
        amr = bmr * 1.375;
        break;
      case "Moderately Active":
        amr = bmr * 1.55;
        break;
      case "Active":
        amr = bmr * 1.725;
        break;
      case "Very Active":
        amr = bmr * 1.9;
        break;
      default:
        break;
    }
    return Math.round(amr);
  }

  // Handle Calculate Button
  function handleCalculate() {
    const cals = calculateCaloriesPerDay(form);
    if (
      form.activity !== "" &&
      form.age.value !== "" &&
      form.age.value < 100 &&
      form.weight.value !== "" &&
      form.weight.value < 2000 &&
      form.height.value !== "" &&
      form.height.value < 300 &&
      form.gender !== ""
    ) {
      setShowFormError(false);
      setCaloriesPerDay(cals);
      setCaloriesPerMeal(Math.round(cals / 3));
    } else {
      setShowFormError(true);
    }
  }

  return (
    <>
      <Hero />

      <div className="form-container" id="form-section">
        <div className="form">
          <div className="mobo-text-align-center">
            <h2>Fill In Your Details </h2>
            <p>This helps us know how much calories your body needs.</p>
          </div>
          <div className="input-container">
            <h4 className="input-title">Gender</h4>
            <div className="radio-container">
              <input
                id="male-radio"
                type="radio"
                name="gender"
                checked={form.gender === "male"}
                value="male"
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, gender: e.target.value };
                  });
                  setShowMaleSelected(true);
                  setShowMaleUnselected(false);
                  setShowFemaleSelected(false);
                  setShowFemaleUnselected(true);
                }}
              />
              {showMaleUnselected && <MaleAvatarUnselected />}
              {showMaleSelected && <MaleAvatarSelected />}
              {showFemaleUnselected && <FemaleAvatarUnselected />}
              {showFemaleSelected && <FemaleAvatarSelected />}
              <input
                type="radio"
                id="female-radio"
                checked={form.gender === "female"}
                name="gender"
                value="female"
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, gender: e.target.value };
                  });
                  setShowFemaleSelected(true);
                  setShowFemaleUnselected(false);
                  setShowMaleSelected(false);
                  setShowMaleUnselected(true);
                }}
              />
            </div>
          </div>
          <div className="input-container">
            <h4 className="input-title">Age</h4>
            <input
              type="text"
              placeholder="Your vintage, in years?  "
              onChange={(e) => {
                if (!numberRegex.test(e.target.value)) {
                  e.target.value = "";
                } else {
                  setForm((prev) => {
                    return {
                      ...prev,
                      age: { ...prev.age, value: e.target.value },
                    };
                  });
                }
              }}
            />
            <p className="unit-font">{form.age.unit}</p>
          </div>
          <div className="input-container">
            <h4 className="input-title">Height</h4>
            <input
              type="text"
              placeholder="Your vertical greatness in numbers?"
              onChange={(e) => {
                // const heightRegex =
                //   /^(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-6][0-9]|27[0-2])$/;
                // if (stringRegex.test(e.target.value)) {
                //   e.target.value = "";
                // } else if (!heightRegex.test(e.target.value)) {
                //   window.alert("please input a valid height");
                // } else {
                //   setHeight(e.target.value);
                // }
                // console.log(height);
                if (!numberRegex.test(e.target.value)) {
                  e.target.value = "";
                } else {
                  setForm((prev) => {
                    return {
                      ...prev,
                      height: { ...prev.height, value: e.target.value },
                    };
                  });
                }
              }}
            />
            <p className="unit-font">{form.height.unit}</p>
          </div>
          <div className="input-container">
            <h4 className="input-title">Weight</h4>
            <input
              type="text"
              placeholder="How much gravity loves you?"
              onChange={(e) => {
                // const weightRegex = /^(?:[0-2][0-7][0-2]|442)$/;
                // if (stringRegex.test(e.target.value)) {
                //   e.target.value = "";
                // } else if (!weightRegex.test(e.target.value)) {
                //   window.alert("please input a valid weight");
                // } else {
                //   setWeight(e.target.value);
                // }
                if (!numberRegex.test(e.target.value)) {
                  e.target.value = "";
                } else {
                  setForm((prev) => {
                    return {
                      ...prev,
                      weight: { ...prev.weight, value: e.target.value },
                    };
                  });
                }
              }}
            />
            <p className="unit-font">{form.weight.unit}</p>
          </div>
          <div className="input-container">
            <h4 className="input-title">Activity Level</h4>
            <Select
              onChange={(e) => {
                setForm((prev) => {
                  return { ...prev, activity: e.value };
                });
              }}
              options={activityOptions}
              styles={react_selectCustomStyles}
            />
          </div>
          <div
            className="button-error-container"
            style={{ position: "relative" }}
          >
            <button
              style={{
                justifyContent: "center",
                width: "100%",
              }}
              className="cta"
              onClick={handleCalculate}
            >
              Calculate Calories
            </button>
            <span
              className="error-message"
              style={{ bottom: showFormError && "-25px" }}
            >
              Please fill in all the fields.
            </span>
          </div>
        </div>

        {/* No gender selected */}
        <div className="gender-image-container">
          {form.gender == "" && <GenderNotSelected />}
          {/* Male SVG */}
          {form.gender == "male" && <MaleSelected />}
          {/* Female SVG */}
          {form.gender == "female" && <FemaleSelected />}
        </div>
      </div>

      <div id="meal-cards-and-heading" className="meal-section-container">
        {caloriesPerDay !== null && (
          <div
            style={{ textAlign: "center", marginBottom: "2rem" }}
            className="mobo-text-align-center"
          >
            <h2>Suggested Meals</h2>
            <p>
              You need{" "}
              <span
                className="input-title"
                style={{
                  fontSize: "18px",
                  color: "var(--lime-green)",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                {caloriesPerDay}
              </span>{" "}
              cals in a day and{" "}
              <span
                className="input-title"
                style={{
                  color: "var(--lime-green)",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                {caloriesPerMeal}
              </span>{" "}
              cals in a single meal if you take{" "}
              <span
                className="input-title"
                style={{
                  color: "var(--lime-green)",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                3
              </span>{" "}
              meals in a day. Here are some of the meals that contain the
              required calories.
            </p>
          </div>
        )}

        {errorPage && <ErrorPage />}
        <div className="mealplan_and_cardscontainer">
          {/* first child (cards section) */}
          <div id="meal-section" className="cards-container">
            {isLoading ? (
              <h2>Loading Meals...</h2>
            ) : (
              <Card apiKey={apiKey} dishArray={dishArray} />
            )}
          </div>

          {/* second child (meal plan section) */}
          <div id="meal-plan-section">
            <MealPlan
              apiKey={apiKey}
              dishArray={dishArray}
              caloriesPerMeal={caloriesPerMeal}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
