import bcrypt from "bcryptjs";
import ms from "ms";
import { generateNewToken } from "../lib/auth.js";
import { createUser, findUserByUsername } from "../models/Users.model.js";

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
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const isAdmin = false;

    const token = generateNewToken(user, isAdmin);

    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     isAdmin: true,
    //   },
    //   process.env.JWT_SECRET_KEY,
    //   { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    // );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: ms(process.env.TOKEN_EXPIRE_TIME),
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};
export const logout = (req, res) => {
  // db operations
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
