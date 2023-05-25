import { useState, useEffect } from "react";

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqListener = (e) => setIsDarkTheme(e.matches);

    darkThemeMq.addEventListener("change", mqListener);

    return () => {
      darkThemeMq.removeEventListener("change", mqListener);
    };
  }, []);

  return { isDarkTheme };
};

export { useThemeDetector };
