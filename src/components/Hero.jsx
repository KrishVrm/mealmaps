import React from "react";
import Header from "../global_components/Header";
import HeroImage from "../assets/HeroBackground.jpg";

const Hero = () => {
  return (
    <>
      <Header />
      <section className="hero">
        <img className="hero_image" src={HeroImage} alt="HeroBackground" />
        <div className="hero_left_content">
          <h1>Eat Like Never Before With MealMaps!</h1>
          <p>
            Meal Maps plans your favourite meals while maintaining your good
            health. Achieve your nutritional objectives just by a few steps!
          </p>
          <a href="#form-section">
            <button className="cta">
              Plan a Meal{" "}
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.0800781 8.15003C0.0800781 7.84698 0.204853 7.55634 0.426955 7.34205C0.649056 7.12776 0.950289 7.00737 1.26439 7.00737H14.9858L9.90037 2.10312C9.67799 1.88856 9.55306 1.59755 9.55306 1.29412C9.55306 0.990687 9.67799 0.699682 9.90037 0.485122C10.1228 0.270563 10.4244 0.150024 10.7389 0.150024C11.0534 0.150024 11.355 0.270563 11.5774 0.485122L18.6832 7.34103C18.7935 7.44717 18.881 7.57326 18.9407 7.71208C19.0004 7.85091 19.0312 7.99973 19.0312 8.15003C19.0312 8.30032 19.0004 8.44914 18.9407 8.58797C18.881 8.72679 18.7935 8.85288 18.6832 8.95902L11.5774 15.8149C11.355 16.0295 11.0534 16.15 10.7389 16.15C10.4244 16.15 10.1228 16.0295 9.90037 15.8149C9.67799 15.6004 9.55306 15.3094 9.55306 15.0059C9.55306 14.7025 9.67799 14.4115 9.90037 14.1969L14.9858 9.29268H1.26439C0.950289 9.29268 0.649056 9.17229 0.426955 8.958C0.204853 8.74371 0.0800781 8.45308 0.0800781 8.15003Z"
                  fill="#1A1A1A"
                />
              </svg>
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
