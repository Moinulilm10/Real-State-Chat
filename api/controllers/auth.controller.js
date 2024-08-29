import bcrypt from "bcryptjs";
import { createUser } from "../models/Users.model.js";

export const register = async (req, res) => {
  // db operations
  const { username, email, password } = req.body;

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    /* The code snippet `const newUser = await createUser({ username, email, password: hashedPassword
    });` is creating a new user object with the provided `username`, `email`, and `password` properties.The`createUser` function is then called with this user object as an argument to save the new user
    to the database. The `await` keyword is used to wait for the asynchronous operation of creating
    the user to complete before proceeding further. */
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    // console.log(newUser);
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
