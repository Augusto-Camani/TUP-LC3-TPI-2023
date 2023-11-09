import { useContext } from "react";
import { ThemeContext } from "../../services/themeContext/theme.context";

import "./ProductCard.css";

const ProductCard = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`product-item-container ${
        theme === "DARK" && "product-item-container-dark"
      }`}
    >
      {children}
    </div>
  );
};
export default ProductCard;
