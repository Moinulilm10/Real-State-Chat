import prisma from "../lib/prisma.js";

/**
 * Fetch all chats for a specific user.
 *
 * @param {string} tokenUserId - The ID of the authenticated user.
 * @returns {Promise<Array<Object>>} List of chats the user is part of.
 */
export const getAllChatsByUser = async (tokenUserId) => {
  return await prisma.chat.findMany({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });
};

/**
 * Fetch a user by their ID.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} The user object with selected fields (id, username, avatar).
 */
export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
};

/**
 * Fetch a single chat by ID if the user is a participant.
 *
 * @param {string} chatId - The ID of the chat.
 * @param {string} tokenUserId - The ID of the authenticated user.
 * @returns {Promise<Object|null>} The chat object if found, otherwise null.
 */
export const getChatByIdAndUser = async (chatId, tokenUserId) => {
  return await prisma.chat.findUnique({
    where: {
      id: chatId,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};

/**
 * Create a new chat between two users.
 *
 * @param {string} tokenUserId - The ID of the authenticated user.
 * @param {string} receiverId - The ID of the user to create a chat with.
 * @returns {Promise<Object>} The newly created chat object.
 */
export const createChat = async (tokenUserId, receiverId) => {
  return await prisma.chat.create({
    data: {
      userIDs: [tokenUserId, receiverId],
    },
  });
};

/**
 * Mark a chat as read by the user.
 *
 * @param {string} chatId - The ID of the chat.
 * @param {string} tokenUserId - The ID of the authenticated user.
 * @returns {Promise<Object>} The updated chat object.
 */
export const markChatAsRead = async (chatId, tokenUserId) => {
  return await prisma.chat.update({
    where: {
      id: chatId,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    data: {
      seenBy: {
        push: [tokenUserId],
      },
    },
  });
};
