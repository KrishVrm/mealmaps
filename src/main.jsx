import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/aboutus", element: <AboutUs /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
