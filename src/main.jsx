import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider>
    <>
      <Router>
        <App />
      </Router>
    </>
  </Provider>
);
