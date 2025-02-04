import UserModel from "../models/user.model.js";

/**
 * allAccess - Handles access to public content.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * This function sends a generic message indicating that the content is publicly accessible.
 */
export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

/**
 * userBoard - Handles access to content restricted to authenticated users.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * This function sends a generic message indicating that the content is accessible to authenticated users.
 */
export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

/**
 * adminBoard - Handles access to content restricted to users with the 'admin' role.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * This function sends a generic message indicating that the content is accessible only to administrators.
 */
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

/**
 * moderatorBoard - Handles access to content restricted to users with the 'moderator' role.
 *
 * @param {Object} req - The request object (not used in this function).
 * @param {Object} res - The response object used to send back the result.
 *
 * This function sends a generic message indicating that the content is accessible only to moderators.
 */
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

/**
 * allUsers - Retrieves all users except the currently authenticated user.
 *
 * @param {Object} req - The request object containing the authenticated user's ID in the params.
 * @param {Object} res - The response object used to send back the result.
 *
 * Steps:
 * 1. Extracts the authenticated user's ID from the request parameters.
 * 2. Queries the database to find all users except the authenticated user.
 * 3. Populates the role field with the role name (excluding the role ID).
 * 4. Sends a JSON response with the list of users or an appropriate error message.
 */
export const allUsers = async (req, res) => {
  const { id } = req.params; // Extract the authenticated user's ID from the request parameters

  try {
    const authenticatedUserId = id;

    // Query the database for all users except the authenticated user
    const users = await UserModel.find({ _id: { $ne: authenticatedUserId } }) // Exclude the authenticated user
      .populate("role", "name -_id") // Populate the role field with the role name (exclude the role ID)
      .exec();

    // If no users are found, return a 404 response
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found.",
      });
    }

    // Send a success response with the list of users
    res.status(200).json({
      message: "Users retrieved successfully.",
      totalItems: users.length, // Total number of users retrieved
      users, // List of users
    });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      message: "Some error occurred while retrieving users",
      error: error.message,
    });
  }
};
