import React from "react";

const ProductFilter = ({ onProductChange, productSelected }) => {
  const changeProductHandler = (event) => {
    onProductChange(event.target.value);
  };
  return (
    <select onChange={changeProductHandler} value={productSelected}>
      <option value=""></option>
      <option value="bateria">bateria</option>
      <option value="guitarra">guitarra</option>
      <option value="trompeta">trompeta</option>
      <option value=""></option>
    </select>
  );
};

export default ProductFilter;
