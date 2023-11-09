import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../services/themeContext/theme.context";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <Button className="mt-4" onClick={handleToggleTheme}>
      Cambiar a tema {theme === "LIGHT" ? "oscuro" : "claro"}
    </Button>
  );
};

export default ToggleTheme;
