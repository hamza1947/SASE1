import db from "../../models/index.js";

// Destructure the User model and predefined ROLES array from the database object
const { user: UserModel, ROLES } = db;

/**
 * Middleware functions to validate user sign-up data.
 */
export const verifySignUp = {
  /**
   * checkDuplicateEmail - Ensures that the email provided in the request body is not already in use.
   *
   * @param {Object} req - The request object containing user data in the body.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   */
  checkDuplicateEmail: async (req, res, next) => {
    try {
      // Check if a user with the provided email already exists in the database
      const existsUser = await UserModel.findOne({
        email: req.body.email,
      }).exec();

      // If a user with the same email exists, return a conflict error
      if (existsUser) {
        return res.status(409).json({
          message: "Failed! Email is already in use!",
          email: existsUser.email,
        });
      }

      // If no duplicate email is found, proceed to the next middleware
      next();
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({
        message: "Error checking email!",
        error: error.message,
      });
    }
  },

  /**
   * checkRolesExisted - Validates that the role provided in the request body exists in the predefined ROLES array.
   *
   * @param {Object} req - The request object containing user data in the body.
   * @param {Object} res - The response object used to send back the result.
   * @param {Function} next - The next middleware function in the stack.
   */
  checkRolesExisted: (req, res, next) => {
    // If a role is provided in the request body
    if (req.body.role) {
      // Check if the provided role exists in the predefined ROLES array
      if (!ROLES.includes(req.body.role)) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.role} does not exist!`,
        });
      }
    }

    // If the role is valid or not provided, proceed to the next middleware
    next();
  },
};
