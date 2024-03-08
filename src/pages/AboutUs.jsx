import React from "react";
import Header from "../global_components/Header";
import Footer from "../global_components/Footer";

const aboutTeamArray = [
  {
    name: "Zhanak",
    occupation: "Captain Clueless",
    image: "",
    description: "Needs a comfortable chair and a decent cup of coffee.",
  },
  {
    name: "Krish",
    occupation: "Lazy Loader",
    image: "",
    description: "Listens to the captain.",
  },
  {
    name: "Saurav",
    occupation: "The Padawan",
    image: "",
    description: "Our newbie coder.",
  },
  {
    name: "Mahin",
    occupation: "The Hibernating Hippo",
    image: "",
    description: "Thinks out of the box.",
  },
];

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about_us_container">
        <h1>Meet The Team</h1>

        <div className="content-container">
          {aboutTeamArray.map((element) => {
            return (
              <div className="content-subcontainer">
                <h2>{element.name}</h2>
                <p className="input-title">{element.occupation}</p>
                <p>{element.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
