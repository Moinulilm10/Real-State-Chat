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

/**
 * Deletes a saved post by its ID.
 * @param {string} savedPostId - The ID of the saved post to delete.
 * @returns {Promise<void>}
 */
export const deleteSavedPost = async (savedPostId) => {
  try {
    await prisma.savedPost.delete({
      where: {
        id: savedPostId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete saved post");
  }
};

/**
 * Creates a new saved post.
 * @param {string} userId - The ID of the user saving the post.
 * @param {string} postId - The ID of the post to be saved.
 * @returns {Promise<object>} - The newly created saved post.
 */
export const createSavedPost = async (userId, postId) => {
  try {
    const newSavedPost = await prisma.savedPost.create({
      data: {
        userId,
        postId,
      },
    });
    return newSavedPost;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create saved post");
  }
};

/**
 * Delete a saved post by its ID
 */
export const deleteSavedPostById = async (id) => {
  try {
    return await prisma.savedPost.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error in deleteSavedPostById:", error);
    throw new Error("Failed to delete saved post");
  }
};

/**
 * Retrieves all posts created by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object[]>} - The list of posts created by the user.
 */
export const getUserPosts = async (userId) => {
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
    });
    return userPosts;
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    throw new Error("Failed to get user posts");
  }
};

/**
 * Retrieves all saved posts for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object[]>} - The list of posts saved by the user.
 */
export const getSavedPostsByUser = async (userId) => {
  try {
    const savedPosts = await prisma.savedPost.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });
    return savedPosts.map((item) => item.post);
  } catch (error) {
    console.error("Error in getSavedPostsByUser:", error);
    throw new Error("Failed to get saved posts");
  }
};

/**
 * Count the number of unseen chats for a specific user.
 *
 * @param {string} tokenUserId - The ID of the authenticated user.
 * @returns {Promise<number>} The number of unseen chats.
 */
export const countUnseenChats = async (tokenUserId) => {
  return await prisma.chat.count({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
      NOT: {
        seenBy: {
          hasSome: [tokenUserId],
        },
      },
    },
  });
};
