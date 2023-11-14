import { useState } from "react";

import "./ProductItem.css";

import ProductCard from "../ProductCard/ProductCard";
import Products from "../Products/Products";

const ProductItem = ({ instrument, price, seller }) => {
  const [instrumentValue, setInstrumentValue] = useState(instrument);
  const clickHandler = () => {
    console.log("CLICKED");
    setInstrumentValue("¡actualizado!");
    console.log(instrumentValue);
  };
  return (
    <ProductCard className="product-item-container">
      <h1>{instrumentValue}</h1>
      <h2>el precio es: {price}</h2>
      <h3>Vendedor: {seller}</h3>

      <button onClick={clickHandler}>cambiar instrumento</button>
    </ProductCard>
  );
};

export default ProductItem;
