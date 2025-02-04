
import { useState, useEffect } from 'react';

const useTheme = ({defaultTheme}) => {
  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage, or use the default
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => prev === "light"? "dark" :"light");
  }
  return [theme, handleTheme];
};

export default useTheme;