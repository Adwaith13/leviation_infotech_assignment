import axios from "axios";

export const addProduct = async (productData, token) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const addProduct = await axios.post(`${url}/product`, productData, {
      headers: {
        token,
      },
    });
    return addProduct.data;
  } catch (error) {
    console.error(error);
  }
};
