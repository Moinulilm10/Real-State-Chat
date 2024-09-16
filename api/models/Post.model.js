import prisma from "../lib/prisma.js";

/**
 * Retrieves posts from the database based on the provided query filters.
 * @param {object} filters - The query filters for city, type, property, bedroom, and price range.
 * @returns {Promise<object[]>} - A promise that resolves to an array of posts.
 */
export const getAllPosts = async (query) => {
  const { city, type, property, bedroom, minPrice, maxPrice } = query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || undefined,
          lte: parseInt(maxPrice) || undefined,
        },
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get posts");
  }
};

/**
 * The `createNewPost` function adds a new post to the database.
 * @param {object} postData - Contains the main post information.
 * @param {object} postDetail - Contains additional post details.
 * @param {string} tokenUserId - The ID of the user creating the post.
 * @returns {Promise<object>} - The newly created post.
 */
export const createNewPost = async (postData, postDetail, tokenUserId) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        postDetail: {
          create: postDetail,
        },
      },
    });
    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

/**
 * Deletes a post by its ID.
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<void>}
 */
export const deletePostById = async (id) => {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post");
  }
};

/**
 * Finds a post by its ID, with optional details and user information.
 * @param {string} id - The ID of the post to find.
 * @param {boolean} withDetails - Whether to include post details and user information.
 * @returns {Promise<object>} - The found post, or `null` if not found.
 */
export const findPostById = async (id, withDetails = false) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: withDetails
        ? {
            postDetail: true,
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          }
        : undefined,
    });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find post");
  }
};

/**
 * Finds whether a post is saved by a specific user.
 * @param {string} userId - The ID of the user.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<object>} - The saved post record if found, or `null`.
 */
export const findSavedPost = async (userId, postId) => {
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return savedPost;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to check saved post");
  }
};

/**
 * Updates a post by its ID with the given data.
 * @param {string} id - The ID of the post to update.
 * @param {object} updateData - The data to update the post with.
 * @returns {Promise<object>} - The updated post.
 */
export const updatePostById = async (id, updateData) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
    });
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update post");
  }
};

/**
 * Finds a post by its ID, with details and user information.
 * @param {string} id - The ID of the post to find.
 * @returns {Promise<object|null>} - The found post or `null` if not found.
 */
export const findPostWithDetailsById = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve post");
  }
};

/**
 * Checks if the post is saved by a specific user.
 * @param {string} userId - The ID of the user.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<boolean>} - True if the post is saved, false otherwise.
 */
export const isPostSavedByUser = async (userId, postId) => {
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return !!savedPost; // Returns true if saved, false otherwise
  } catch (error) {
    console.log(error);
    throw new Error("Failed to check saved status");
  }
};
