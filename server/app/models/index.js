import mongoose from "mongoose";
import "dotenv/config";

import UserModel from "../models/user.model.js";
import RoleModel from "../models/role.model.js";
import PostModel from "../models/post.model.js";

/**
 * MongoDB connection URL from environment variables
 * @constant {string}
 */
const DB_URL = process.env.DB_URL;

/**
 * Database configuration object
 * @namespace
 * @property {Object} mongoose - Mongoose instance
 * @property {string} url - MongoDB connection URL
 * @property {Object} user - User model
 * @property {Object} role - Role model
 * @property {Object} post - Post model
 * @property {Array<string>} ROLES - Available user roles in the system
 */
const db = {
  mongoose,
  url: DB_URL,
  user: UserModel,
  role: RoleModel,
  post: PostModel,
  ROLES: ["user", "admin", "moderator"],
};

export default db;
