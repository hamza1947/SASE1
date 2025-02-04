import mongoose from "mongoose";
import "dotenv/config";
import UserModel from "../models/user.model.js";
import RoleModel from "../models/role.model.js";
import PostModel from "../models/post.model.js";

const DB_URL = process.env.DB_URL;

const db = {
  mongoose,
  url: DB_URL,
  user: UserModel,
  role: RoleModel,
  post: PostModel,
  ROLES: ["user", "admin", "moderator"],
};

export default db;
