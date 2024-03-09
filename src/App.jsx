import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import "./styles/main.css";
import Card from "./components/Card";
import axios from "axios";
import Select from "react-select";
import GenderNotSelected from "./svgs/GenderNotSelected";
import MaleSelected from "./svgs/MaleSelected";
import FemaleSelected from "./svgs/FemaleSelected";
import FemaleAvatarSelected from "./svgs/FemaleAvatarSelected";
import MaleAvatarSelected from "./svgs/MaleAvatarSelected";
import FemaleAvatarUnselected from "./svgs/FemaleAvatarUnselected";
import MaleAvatarUnselected from "./svgs/MaleAvatarUnselected";
import Footer from "./global_components/Footer";
import dotenv from "dotenv";

function App() {
  const API_KEY = "4ace843bbba94a86b532d81045caea70";
  const numberRegex = /^[0-9]*$/;
  const stringRegex = /^[a-zA-Z]+$/;

  // useStates
  const [form, setForm] = useState({
    age: { value: 0, unit: "yrs" },
    weight: { value: 0, unit: "kgs" },
    height: { value: 0, unit: "cms" },
    gender: "",
    activity: "Sedentary",
  });
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);
  const [caloriesPerMeal, setCaloriesPerMeal] = useState(null);
  const [showMaleSelected, setShowMaleSelected] = useState(false);
  const [showFemaleSelected, setShowFemaleSelected] = useState(false);
  const [showMaleUnselected, setShowMaleUnselected] = useState(true);
  const [showFemaleUnselected, setShowFemaleUnselected] = useState(true);
  const [dishArray, setDishArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${API_KEY}&minCalories=${
              caloriesPerMeal - 20
            }&maxCalories=${caloriesPerMeal + 20}&number=10`
          );
          setDishArray(response.data);
          console.log("first response data (dishes)", response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
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
    console.log(form);
    setCaloriesPerDay(cals);
    setCaloriesPerMeal(Math.round(cals / 3));
  }

  return (
    <>
      <Hero />

      <div className="form-container" id="form-section">
        <div className="form">
          <h2>Fill In Your Details </h2>
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
                  // setHeight(e.target.value);
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
                  // setWeight(e.target.value);
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
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "none",
                  color: "var(--white)",
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "var(--gray)",
                }),
              }}
            />
          </div>
          <button
            style={{ justifyContent: "center" }}
            className="cta"
            onClick={handleCalculate}
          >
            Calculate
          </button>
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

      <div className="meal-section-container">
        {caloriesPerDay !== null && (
          <>
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
          </>
        )}
        <div id="meal-section" className="cards-container">
          {isLoading ? (
            <h2>Loading Meals...</h2>
          ) : (
            <Card dishArray={dishArray} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
