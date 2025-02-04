import express from "express";

// Create an Express router instance
const router = express.Router();

// Import controller functions for handling post-related operations
import {
  createPost,
  getPosts,
  deleteMany,
} from "../controllers/post.controller.js";

/**
 * POST / - Creates a new post.
 *
 * Controller:
 * createPost - Handles the creation of a new post using the data provided in the request body.
 */
router.post("/", createPost);

/**
 * GET / - Retrieves all posts.
 *
 * Controller:
 * getPosts - Queries the database to retrieve all posts and sends them as a JSON response.
 */
router.get("/", getPosts);

/**
 * DELETE / - Deletes all posts.
 *
 * Controller:
 * deleteMany - Deletes all posts from the database and sends a success or error response.
 */
router.delete("/", deleteMany);

// Export the router to be used in the main application
export default router;
