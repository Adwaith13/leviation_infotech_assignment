import axios from "axios";

export const loginApi = async (userData) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const userLogin = await axios.post(`${url}/login`, userData);
    const loginToken = userLogin.data.token;
    localStorage.setItem("token", loginToken);
    return userLogin;
  } catch (error) {
    console.error(error);
  }
};
