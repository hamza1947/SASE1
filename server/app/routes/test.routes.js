import express from "express";

// Import controller functions for handling user-related routes
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  allUsers,
} from "../controllers/user.controller.js";

// Import middleware for JWT-based authentication and role-based access control
import { authJwt } from "../middlewares/auth/authJwt.js";

// Create an Express router instance
const router = express.Router();

/**
 * GET /all-access - Public route accessible to everyone.
 *
 * Controller:
 * allAccess - Sends a generic message indicating that the content is publicly accessible.
 */
router.get("/all-access", allAccess);

/**
 * GET /access-user - Route accessible to authenticated users.
 *
 * Controller:
 * userBoard - Sends a generic message indicating that the content is accessible to authenticated users.
 */
router.get("/access-user", userBoard);

/**
 * GET /access-admin - Route accessible only to users with the 'admin' role.
 *
 * Middleware:
 * 1. authJwt.verifyToken - Verifies the JWT token and attaches user information to the request object.
 * 2. authJwt.isAdmin - Ensures that the authenticated user has the 'admin' role.
 *
 * Controller:
 * adminBoard - Sends a generic message indicating that the content is accessible only to administrators.
 */
router.get(
  "/access-admin",
  [authJwt.verifyToken, authJwt.isAdmin], // Apply JWT verification and admin role check
  adminBoard
);

/**
 * GET /access-moderator - Route accessible only to users with the 'moderator' role.
 *
 * Middleware:
 * 1. authJwt.verifyToken - Verifies the JWT token and attaches user information to the request object.
 * 2. authJwt.isModerator - Ensures that the authenticated user has the 'moderator' role.
 *
 * Controller:
 * moderatorBoard - Sends a generic message indicating that the content is accessible only to moderators.
 */
router.get(
  "/access-moderator",
  [authJwt.verifyToken, authJwt.isModerator], // Apply JWT verification and moderator role check
  moderatorBoard
);

/**
 * GET /all-users/:id - Route to retrieve all users except the authenticated user.
 *
 * Middleware:
 * 1. authJwt.verifyToken - Verifies the JWT token and attaches user information to the request object.
 * 2. authJwt.isAdminOrIsModerator - Ensures that the authenticated user has either the 'admin' or 'moderator' role.
 *
 * Controller:
 * allUsers - Retrieves all users except the authenticated user and sends the list as a JSON response.
 */
router.get(
  "/all-users/:id",
  [authJwt.verifyToken, authJwt.isAdminOrIsModerator], // Apply JWT verification and admin/moderator role check
  allUsers
);

// Export the router to be used in the main application
export default router;
