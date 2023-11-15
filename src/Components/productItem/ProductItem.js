import { useState } from "react";

import "./ProductItem.css";

const ProductItem = ({ instrument, price, stock }) => {
  const [instrumentValue, setInstrumentValue] = useState(instrument);

  return (
    <div className="product-item-container">
      <h1>{instrumentValue}</h1>
      <h2>Precio: {price}</h2>
      <h3>Disponibilidad: {stock}</h3>
    </div>
  );
};

export default ProductItem;
