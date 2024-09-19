import prisma from "../lib/prisma.js";

/**
 * Find a chat by ID and check if the user is a participant of the chat.
 *
 * @param {string} chatId - The ID of the chat to find.
 * @param {string} tokenUserId - The ID of the user attempting to access the chat.
 * @returns {Promise<Object|null>} The chat object if found and user is a participant, otherwise null.
 */
export const findChatByIdAndUser = async (chatId, tokenUserId) => {
  return await prisma.chat.findUnique({
    where: {
      id: chatId,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });
};

/**
 * Create a new message in a chat.
 *
 * @param {string} text - The content of the message.
 * @param {string} chatId - The ID of the chat where the message will be added.
 * @param {string} tokenUserId - The ID of the user sending the message.
 * @returns {Promise<Object>} The created message object.
 */
export const createMessage = async (text, chatId, tokenUserId) => {
  return await prisma.message.create({
    data: {
      text,
      chatId,
      userId: tokenUserId,
    },
  });
};

/**
 * Update the chat's last message and mark it as seen by the user.
 *
 * @param {string} chatId - The ID of the chat to update.
 * @param {string} tokenUserId - The ID of the user who has seen the message.
 * @param {string} text - The content of the last message in the chat.
 * @returns {Promise<Object>} The updated chat object.
 */
export const updateChatLastMessage = async (chatId, tokenUserId, text) => {
  return await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      seenBy: [tokenUserId],
      lastMessage: text,
    },
  });
};
