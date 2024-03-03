const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "All the fields are required",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists. Please use different Email",
      });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: encryptPassword,
    });

    return res.status(200).json({
      status: "Success",
      message: "User Registered",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "All the fields are required",
      });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(401).json({
        status: "Failed",
        message: "User not found, Use valid email id",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Failed",
        message: "Password Incorrect",
      });
    }

    const loginToken = jwt.sign(findUser.toJSON(), process.env.JWT_KEY, {
      expiresIn: 14400,
    });

    return res.status(200).json({
      status: "Success",
      message: "User Logged In",
      user: findUser,
      token: loginToken,
    });
  } catch (erorr) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server Error",
    });
  }
});

module.exports = router;
