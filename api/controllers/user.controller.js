import bcrypt from "bcryptjs";
import { findSavedPost } from "../models/Post.model.js";
import {
  countUnseenChats,
  createSavedPost,
  deleteSavedPostById,
  getAllUsers,
  getSavedPostsByUser,
  getUserById,
  getUserPosts,
  userDelete,
  userUpdate,
} from "../models/Users.model.js";

/**
 * Get all users
 * Sends a JSON response with all users.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

/**
 * Get a specific user by ID
 * Retrieves a user based on the provided ID.
 */
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

/**
 * Update user details
 * Updates the user information based on the provided ID and request body.
 * Only authorized users can update their own profiles.
 */
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Update user with new information
    const updatedUser = await userUpdate(id, {
      ...inputs,
      ...(avatar && { avatar }),
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

/**
 * Delete a user
 * Deletes the user account based on the provided ID.
 * Only authorized users can delete their own profiles.
 */
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  // Ensure the user is authorized to delete the profile
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    const result = await userDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

/**
 * Save or unsave a post for a user
 * Toggles the saving of a post based on whether it is already saved.
 */
export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    // Check if the post is already saved by the user
    const savedPost = await findSavedPost(tokenUserId, postId);

    if (savedPost) {
      // If post is already saved, remove it from saved posts
      await deleteSavedPostById(savedPost.id);
      return res.status(200).json({ message: "Post removed from saved list" });
    } else {
      // If post is not saved, save it
      await createSavedPost(tokenUserId, postId);
      return res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.error("Error in savePost:", err);
    return res.status(500).json({ message: "Failed to save or remove post" });
  }
};

/**
 * Get all posts and saved posts for the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Get posts created by the user
    const userPosts = await getUserPosts(tokenUserId);

    // Get posts saved by the user
    const savedPosts = await getSavedPostsByUser(tokenUserId);

    // Send response with user posts and saved posts
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

/**
 * Get the number of unseen chats for the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} Returns a JSON response with the count of unseen chats.
 */
export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const number = await countUnseenChats(tokenUserId);
    res.status(200).json(number);
  } catch (err) {
    console.error("Error while fetching notification count:", err);
    res.status(500).json({ message: "Failed to get notification count!" });
  }
};
