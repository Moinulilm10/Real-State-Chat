import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const age = 1000 * 60 * 60 * 24; // token expire time

    /* This code snippet is generating a JSON Web Token (JWT) using the `jwt.sign` method provided by
    the `jsonwebtoken` library. */
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    /* This code snippet is setting a cookie named "token" in the response object (`res`) with the
    generated JWT token (`token`). The cookie is configured with the following options:
    - `httpOnly: true`: This option restricts the cookie to be accessed only by the server and not
    by client-side scripts, enhancing security by preventing cross-site scripting attacks.
    - `maxAge: age`: This sets the expiration time of the cookie to `age` milliseconds from the
    current time. */
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
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
};
