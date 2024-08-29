import prisma from "../lib/prisma.js";

/**
 * The function `createUser` asynchronously creates a new user in a database using provided user data.
 * @param userData - The `userData` parameter is an object containing the following properties:
 * @returns The `createUser` function returns the newly created user object if the creation is
 * successful. If there is an error during the creation process, it will log the error and throw a new
 * Error with the message "Failed to create user".
 */
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
