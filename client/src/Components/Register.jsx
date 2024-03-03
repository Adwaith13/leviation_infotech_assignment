import { useState } from "react";
import { registerApi } from "../api/register";
import { Link } from "react-router-dom";

export default function Register() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUserRegister = async (e) => {
    e.preventDefault();
    try {
      if (!userRegister.name) {
        setNameError(true);
      }
      if (!userRegister.email) {
        setEmailError(false);
      }
      if (!userRegister.password) {
        setPasswordError(false);
      }
      const registerUser = await registerApi(userRegister);
      console.log("user registered", registerUser);
      setUserRegister({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Register Here!</h1>
      <form onSubmit={handleUserRegister}>
        <input
          type="text"
          name="name"
          value={userRegister.name}
          placeholder="Enter Your Name"
          onChange={(e) =>
            setUserRegister({ ...userRegister, name: e.target.value })
          }
        ></input>
        {nameError ? "Name is required" : ""}
        <br />
        <input
          type="email"
          name="email"
          value={userRegister.email}
          placeholder="Enter Your Email ID"
          onChange={(e) => {
            setUserRegister({ ...userRegister, email: e.target.value });
          }}
        ></input>
        {emailError ? "Email is required" : ""}
        <br />
        <input
          type="password"
          name="password"
          value={userRegister.password}
          placeholder="Enter Your Password"
          onChange={(e) => {
            setUserRegister({ ...userRegister, password: e.target.value });
          }}
        ></input>
        {passwordError ? "Password is required" : ""}
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already Have an Account?<Link to="/">Login Here</Link>
      </p>
    </>
  );
}
