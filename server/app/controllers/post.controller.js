import db from "../models/index.js";

// Destructure the Post model from the database object
const { post: PostModel } = db;

/**
 * createPost - Handles the creation of a new post.
 *
 * @param {Object} req - The request object containing the post data in the body.
 * @param {Object} res - The response object used to send back the result.
 *
 * Steps:
 * 1. Creates a new post using the data provided in the request body.
 * 2. Saves the post to the database.
 * 3. Sends a success response with the created post or an error message if the operation fails.
 */
export const createPost = (req, res) => {
  // Create a new post instance using the request body data
  const newPost = new PostModel({ ...req.body });

  // Save the new post to the database
  newPost
    .save()
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "Failed! Post not created!" });
      }
      // Send a success response with the created post
      res.status(201).json({
        status: 201,
        message: "Post created successfully!",
        post,
      });
    })
    .catch((error) => {
      // Handle any errors during the save operation
      res.status(500).json({
        status: 500,
        message: "Failed to create post!",
        error,
      });
    });
};

/**
 * getPosts - Retrieves all posts from the database.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * Steps:
 * 1. Queries the database to retrieve all posts.
 * 2. Sends a success response with the list of posts or an error message if no posts are found.
 */
export const getPosts = (req, res) => {
  // Query the database for all posts
  PostModel.find()
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(400).json({ message: "Failed! Posts not found!" });
      }
      // Send a success response with the retrieved posts
      res.status(200).json({
        status: 200,
        message: "Get Posts successfully!",
        totalPosts: posts.length, // Total number of posts retrieved
        posts,
      });
    })
    .catch((error) => {
      // Handle any errors during the query operation
      res.status(500).json({
        status: 500,
        message: "Failed to get posts!",
        error,
      });
    });
};

/**
 * deleteMany - Deletes all posts from the database.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * Steps:
 * 1. Deletes all posts from the database.
 * 2. Sends a success response indicating that the posts were deleted or an error message if the operation fails.
 */
export const deleteMany = (req, res) => {
  // Delete all posts from the database
  PostModel.deleteMany()
    .then((posts) => {
      if (!posts) {
        return res.status(400).json({ message: "Failed! Posts not deleted!" });
      }
      // Send a success response indicating that the posts were deleted
      res.status(200).json({
        status: 200,
        message: "Posts deleted successfully!",
        posts,
      });
    })
    .catch((error) => {
      // Handle any errors during the delete operation
      res.status(500).json({
        status: 500,
        message: "Failed to delete posts!",
        error,
      });
    });
};
