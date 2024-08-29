import bcrypt from "bcryptjs";
import { createUser } from "../models/Users.model.js";

export const register = async (req, res) => {
  // db operations
  const { username, email, password } = req.body;

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user an save to db
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user!" });
  }
};
export const login = (req, res) => {
  // db operations
};
export const logout = (req, res) => {
  // db operations
};
