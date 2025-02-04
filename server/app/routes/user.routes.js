import express from "express";

// Import the authController for handling authentication-related logic
import { authController } from "../controllers/auth.controller.js";

// Import the verifySignUp middleware to validate sign-up data
import { verifySignUp } from "../middlewares/auth/verifySignUp.js";

// Create an Express router instance
const router = express.Router();

/**
 * POST /sign-up - Handles user registration.
 *
 * Middleware:
 * 1. verifySignUp.checkDuplicateEmail - Ensures the email is not already in use.
 * 2. verifySignUp.checkRolesExisted - Validates that the provided role exists in the predefined roles list.
 *
 * Controller:
 * authController.signUp - Processes the user registration logic, including creating the user and generating a token.
 */
router.post(
  "/sign-up",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], // Apply validation middlewares
  authController.signUp // Handle the actual sign-up process
);

/**
 * POST /sign-in - Handles user login.
 *
 * Controller:
 * authController.signIn - Authenticates the user by verifying credentials and generating a token upon successful login.
 */
router.post("/sign-in", authController.signIn);

// Export the router to be used in the main application
export default router;
