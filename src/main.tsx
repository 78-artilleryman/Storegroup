import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Google Analytics 초기화
if (import.meta.env.VITE_GA_MEASUREMENT_ID && (window as any).gtag) {
  (window as any).gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
