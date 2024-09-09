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

/**
 * Retrieves a user from the database by username.
 * @param {string} username - The username to search for.
 * @returns {Promise<object>} The user object if found, or throws an error if not found or on query failure.
 */

export const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find user by username");
  }
};

/**
 * Retrieves all users from the database.
 * @returns {Array<Object>} - List of all users.
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw new Error("Failed to retrieve users");
  }
};

/**
 * Retrieves a single user by ID from the database.
 * @param {string} id - The user ID.
 * @returns {Object} - The user object.
 */
export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw new Error("Failed to retrieve user by ID");
  }
};

/**
 * Updates a user in the database.
 * @param {string} id - The user ID.
 * @param {Object} updateData - Fields to be updated.
 * @returns {Object} - The updated user object.
 */
export const userUpdate = async (id, updateData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw new Error("Failed to update user");
  }
};

/**
 * Deletes a user from the database.
 * @param {string} id - The user ID.
 * @returns {Object} - The result of the deletion.
 */
export const userDelete = async (id) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return { message: "User deleted" };
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw new Error("Failed to delete user");
  }
};
