import jwt from "jsonwebtoken";

/* This code snippet is generating a JSON Web Token (JWT) using the `jwt.sign` method provided by
    the `jsonwebtoken` library. */
export const generateNewToken = (user) =>
  jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRE_TIME }
  );
