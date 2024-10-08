import jwt from "jsonwebtoken";
import {
  createNewPost,
  deletePostById,
  findPostById,
  findPostWithDetailsById,
  getAllPosts,
  isPostSavedByUser,
  updatePostById,
} from "../models/Post.model.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  console.log(query);

  try {
    const posts = await getAllPosts(query);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await findPostWithDetailsById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;
    let isSaved = false;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          isSaved = await isPostSavedByUser(payload.id, id);
          return res.status(200).json({ ...post, isSaved });
        }
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId;
  console.log(req.body);

  console.log(postData);
  console.log(postDetail);

  try {
    const newPost = await createNewPost(postData, postDetail, tokenUserId);
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const tokenUserId = req.userId;
  try {
    // Find the post first to check if it exists
    const post = await findPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to update the post
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // Update the post
    const updatedPost = await updatePostById(id, updateData);
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    // Find the post by ID
    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    // Check if the post exists and if the user is authorized
    if (!post || post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // Delete the post
    await deletePostById(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
