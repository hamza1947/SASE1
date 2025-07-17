import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Destructure the User and Role models from the database object
const { user: UserModel, role: RoleModel } = db;

// Exporting an object containing authentication-related controller functions
export const authController = {
  /**
   * signUp - Handles user registration.
   *
   * @param {Object} req - The request object containing user data in the body.
   * @param {Object} res - The response object used to send back the result.
   */
  signUp: async (req, res) => {
    // Destructure required fields from the request body
    const { firstName, lastName, email, password, role } = req.body;
    // console.log("SignUp action called with:", {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   role,
    // });
    try {
      // For debugging purposes
      // Validation: Ensure all required fields are provided
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Please provide all fields!",
        });
      }

      let roleId;

      // If no role is specified, assign the default role 'user'
      if (!role) {
        const getDefaultRole = await RoleModel.findOne({ name: "user" }).exec();
        if (!getDefaultRole) {
          return res
            .status(404)
            .json({ message: "Failed! Getting role by default!" });
        }
        roleId = getDefaultRole.id;
      } else {
        // Find the selected role in the database
        const roleSelected = await RoleModel.findOne({ name: role }).exec();
        if (!roleSelected) {
          return res
            .status(404)
            .json({ message: `Failed! Role ${role} does not exist!` });
        }
        roleId = roleSelected.id;
      }

      // Create a new user with hashed password and assigned role ID
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 8), // Hash the password using bcrypt
        role: roleId, // Assign the role ID to the user
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      if (!savedUser) {
        return res.status(400).json({ message: "Failed! User not created!" });
      }

      // Generate an access token for the newly created user
      const accessToken = generateToken({
        userInfo: {
          sub: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
        },
      });

      // Send a success response with the user details and access token
      res.status(201).json({
        status: 201,
        message: "User created successfully.",
        user: savedUser, // For development purposes
        role: savedUser.role, // For development purposes
        accessToken,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * signIn - Handles user login.
   *
   * @param {Object} req - The request object containing user credentials in the body.
   * @param {Object} res - The response object used to send back the result.
   */
  signIn: async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    try {
      // Validation: Ensure email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Please provide all fields!",
        });
      }

      // Find the user by email and populate the role information
      const user = await UserModel.findOne({ email })
        .populate("role", "name -_id")
        .exec();

      // If no user is found, return an error
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "Email or password is invalid!",
        });
      }

      // Check if the provided password matches the stored hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          message: "Email or password is invalid!", // "Unauthorized!"
        });
      }

      // Generate an access token for the authenticated user
      const accessToken = generateToken({
        userInfo: {
          sub: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });

      // Format the role for authorization purposes
      const authorities = `ROLE_${user.role.name.toUpperCase()}`;

      // Send a success response with the user details, role, and access token
      res.status(200).json({
        status: 200,
        message: "User authenticated successfully!",
        user,
        role: authorities,
        accessToken,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({
        status: 500,
        message: "Error logging user!",
        error: error.message,
      });
    }
  },
};

/**
 * generateToken - Generates a JWT token for the given payload.
 *
 * @param {Object} payload - The data to be included in the token.
 * @returns {String} - The generated JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
