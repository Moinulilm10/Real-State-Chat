import {
  createChat,
  getAllChatsByUser,
  getChatByIdAndUser,
  markChatAsRead,
} from "../models/Chat.model.js";

/**
 * Controller to get all chats for a specific user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} The function returns a JSON response with the user's chats or an error.
 */
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await getAllChatsByUser(tokenUserId);
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error while fetching chats:", error);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

/**
 * Controller to get a specific chat by its ID if the user is a participant.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} The function returns a JSON response with the chat or an error.
 */
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;

  try {
    const chat = await getChatByIdAndUser(chatId, tokenUserId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Mark the chat as read
    await markChatAsRead(chatId, tokenUserId);

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error while fetching chat:", error);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};
/**
 * Controller to create a new chat between two users.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} The function returns a JSON response with the new chat or an error.
 */
export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;

  try {
    const newChat = await createChat(tokenUserId, receiverId);
    res.status(200).json(newChat);
  } catch (error) {
    console.error("Error while adding chat:", error);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

/**
 * Controller to mark a chat as read.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} The function returns a JSON response with the updated chat or an error.
 */
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;

  try {
    const chat = await markChatAsRead(chatId, tokenUserId);
    res.status(200).json(chat);
  } catch (error) {
    console.error("Error while marking chat as read:", error);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
