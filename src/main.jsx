import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { ThemeProvider } from "@/context/ThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "@/app/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);
