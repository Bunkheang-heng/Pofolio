import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ResumePage from "./ResumePage.jsx";
import "../index.css";
import "./resume.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumePage />
  </StrictMode>,
);
