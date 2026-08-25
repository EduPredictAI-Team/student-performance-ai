import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/* =========================================================
   LOAD SAVED THEME BEFORE REACT RENDERS
   ========================================================= */

const savedTheme =
  localStorage.getItem("edupredictai-theme") || "light";

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark-mode");
  document.body.classList.add("dark-mode");
} else {
  document.documentElement.classList.remove("dark-mode");
  document.body.classList.remove("dark-mode");
}

/* =========================================================
   REACT
   ========================================================= */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);