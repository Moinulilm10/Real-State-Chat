import {
  createMessage,
  findChatByIdAndUser,
  updateChatLastMessage,
} from "../models/Message.model.js";

/**
 * Controller function to add a new message to a chat.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - URL parameters.
 * @param {string} req.params.chatId - The ID of the chat to add the message to.
 * @param {Object} req.body - The body of the HTTP request.
 * @param {string} req.body.text - The content of the message.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} The function returns a JSON response containing the created message or an error.
 */
export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    // Check if the chat exists and user is part of the chat
    const chat = await findChatByIdAndUser(chatId, tokenUserId);
    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // Create a new message
    const message = await createMessage(text, chatId, tokenUserId);

    // Update the chat with the latest message and mark it as seen by the user
    await updateChatLastMessage(chatId, tokenUserId, text);

    // Return the created message
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add message" });
  }
};
