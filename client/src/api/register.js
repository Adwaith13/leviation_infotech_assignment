import axios from "axios";

export const registerApi = async (userData) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const userRegister = await axios.post(`${url}/register`, userData);
    return userRegister;
  } catch (error) {
    console.error(error);
  }
};
