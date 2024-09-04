import jwt from "jsonwebtoken";

/* This code snippet is generating a JSON Web Token (JWT) using the `jwt.sign` method provided by
    the `jsonwebtoken` library. */
export const generateNewToken = (user, isAdmin) =>
  jwt.sign(
    {
      id: user.id,
      isAdmin: isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRE_TIME }
  );
