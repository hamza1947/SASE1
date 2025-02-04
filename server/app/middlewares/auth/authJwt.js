import jwt from "jsonwebtoken";
import db from "../../models/index.js";

// Destructure the User and Role models from the database object
const { user: UserModel, role: RoleModel } = db;

/**
 * Middleware functions for JWT-based authentication and role-based access control.
 */
export const authJwt = {
  /**
   * verifyToken - Verifies the JWT token provided in the Authorization header.
   *
   * @param {Object} req - The request object containing the Authorization header.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   *
   * Steps:
   * 1. Extracts the token from the Authorization header.
   * 2. Validates the token using the secret key.
   * 3. Attaches the decoded user information (userId and role) to the request object.
   * 4. Calls the next middleware if the token is valid; otherwise, returns an error.
   */
  verifyToken: (req, res, next) => {
    try {
      // Extract the token from the Authorization header (e.g., "Bearer <token>")
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        // 403: Forbidden - No token provided
        return res.status(403).json({ message: "No token provided!" });
      }

      // Verify the token asynchronously using the secret key
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          // 401: Unauthorized - Invalid or expired token
          return res.status(401).json({ message: "Unauthorized!" });
        }

        // Attach the user ID and role from the token to the request object
        req.userId = decoded.userInfo.sub; // User ID
        req.role = decoded.userInfo.role; // User role
        console.log("Sub id:", req.userId);

        // Proceed to the next middleware
        next();
      });
    } catch (error) {
      // Handle any unexpected errors during token verification
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  /**
   * isAdmin - Ensures that the authenticated user has the 'admin' role.
   *
   * @param {Object} req - The request object containing the userId attached by verifyToken.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   *
   * Steps:
   * 1. Fetches the user from the database using the userId.
   * 2. Retrieves the user's role and checks if it matches 'admin'.
   * 3. Calls the next middleware if the user is an admin; otherwise, returns an error.
   */
  isAdmin: async (req, res, next) => {
    try {
      // Find the user by their ID
      const user = await UserModel.findById(req.userId).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("isAdmin:", user);

      // Find the role associated with the user
      const roleUser = await RoleModel.findOne({ _id: user.role }).exec();
      if (!roleUser) {
        return res.status(404).json({ error: "Role not found" });
      }
      console.log("Role:", roleUser);

      // Check if the user's role is 'admin'
      if (roleUser.name === "admin") {
        next(); // Proceed to the next middleware
      } else {
        return res
          .status(403)
          .json({ error: "You are not authorized to access this resource" });
      }
    } catch (error) {
      // Handle any errors during the process
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * isModerator - Ensures that the authenticated user has the 'moderator' role.
   *
   * @param {Object} req - The request object containing the userId attached by verifyToken.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   *
   * Steps:
   * 1. Fetches the user from the database using the userId.
   * 2. Retrieves the user's role and checks if it matches 'moderator'.
   * 3. Calls the next middleware if the user is a moderator; otherwise, returns an error.
   */
  isModerator: async (req, res, next) => {
    try {
      // Find the user by their ID
      const user = await UserModel.findById(req.userId).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("isModerator:", user);

      // Find the role associated with the user
      const roleUser = await RoleModel.findOne({ _id: user.role }).exec();
      if (!roleUser) {
        return res.status(404).json({ error: "Role not found" });
      }
      console.log("Role:", roleUser);

      // Check if the user's role is 'moderator'
      if (roleUser.name === "moderator") {
        next(); // Proceed to the next middleware
      } else {
        return res
          .status(403)
          .json({ error: "You are not authorized to access this resource" });
      }
    } catch (error) {
      // Handle any errors during the process
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * isAdminOrIsModerator - Ensures that the authenticated user has either the 'admin' or 'moderator' role.
   *
   * @param {Object} req - The request object containing the userId attached by verifyToken.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   *
   * Steps:
   * 1. Fetches the user from the database using the userId.
   * 2. Retrieves the user's role and checks if it matches 'admin' or 'moderator'.
   * 3. Calls the next middleware if the user has one of the allowed roles; otherwise, returns an error.
   */
  isAdminOrIsModerator: async (req, res, next) => {
    try {
      // Find the user by their ID
      const user = await UserModel.findById(req.userId).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the role associated with the user
      const roleUser = await RoleModel.findOne({ _id: user.role }).exec();
      if (!roleUser) {
        return res.status(404).json({ error: "Role not found" });
      }
      console.log("Role:", roleUser);

      // Check if the user's role is either 'admin' or 'moderator'
      if (roleUser.name === "admin" || roleUser.name === "moderator") {
        next(); // Proceed to the next middleware
      } else {
        return res
          .status(403)
          .json({ error: "You are not authorized to access this resource" });
      }
    } catch (error) {
      // Handle any errors during the process
      return res.status(500).json({ error: error.message });
    }
  },
};
