import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UrlContextProvider from "./context/UrlContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UrlContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UrlContextProvider>
  </StrictMode>,
);
