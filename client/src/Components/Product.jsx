import { useState } from "react";
import { addProduct } from "../api/addProduct";

export default function Product() {
  const [productData, setProductData] = useState({
    product_name: "",
    product_qty: 0,
    product_rate: 0,
  });

  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      if (!productData.product_name) {
        setError(true);
      }
      if (productData.product_qty <= 0 || productData.product_rate <= 0) {
        setError(true);
      }
      const product = await addProduct(productData, token);
      console.log("product added", product.product);
      setProductData({
        product_name: "",
        product_qty: 0,
        product_rate: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>Add Products here</h1>
      <form onSubmit={handleProduct}>
        <input
          type="text"
          name="product_name"
          value={productData.product_name}
          placeholder="Enter Product"
          onChange={(e) => {
            setProductData({ ...productData, product_name: e.target.value });
          }}
        ></input>
        <br />
        <input
          type="number"
          name="product_qty"
          value={productData.product_qty}
          placeholder="Enter Product Quantity"
          onChange={(e) => {
            setProductData({ ...productData, product_qty: e.target.value });
          }}
        ></input>
        <br />
        <input
          type="number"
          name="product_rate"
          value={productData.product_rate}
          placeholder="Enter Product Rate"
          onChange={(e) =>
            setProductData({ ...productData, product_rate: e.target.value })
          }
        ></input>
        <br />
        <button type="submit">Next</button>
      </form>
    </>
  );
}
