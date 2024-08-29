import prisma from "../lib/prisma.js";

export const createUser = async (userData) => {
  const { username, email, password } = userData;

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};
