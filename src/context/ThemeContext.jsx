import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme") || "light";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(stored);
    return stored;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    if(user) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, user]);

  const toggleTheme = () => {
    if(!user) return;
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
