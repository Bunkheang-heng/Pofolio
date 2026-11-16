import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TradingPortfolio from "./TradingPortfolio.jsx";
import "./trading.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TradingPortfolio />
  </StrictMode>,
);
