import { useState } from "react";
import { loginApi } from "../api/login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      if (!userLogin.email) {
        setEmailError(true);
      }
      if (!userLogin.password) {
        setPasswordError(true);
      }

      const loginUser = await loginApi(userLogin);
      console.log("user logged in", loginUser.data);
      setUserLogin({
        email: "",
        password: "",
      });
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleUserLogin}>
        <h1>Login Here!</h1>
        <input
          type="email"
          placeholder="Enter Your Email ID"
          name="email"
          value={userLogin.email}
          onChange={(e) => {
            setUserLogin({ ...userLogin, email: e.target.value });
          }}
        ></input>
        {emailError ? "Email is required" : ""}
        <br />
        <input
          type="password"
          name="password"
          value={userLogin.password}
          placeholder="Enter Your Password"
          onChange={(e) => {
            setUserLogin({ ...userLogin, password: e.target.value });
          }}
        ></input>
        {passwordError ? "Password is required" : ""}
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Not Register?<Link to="/register">Register Here</Link>
      </p>
    </>
  );
}
