import express from "express";
import logger from "morgan"; // Middleware for logging HTTP requests
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import db from "./app/models/index.js"; // Import database models and connection logic
import userRouter from "./app/routes/user.routes.js"; // Import user-related routes
import testRouter from "./app/routes/test.routes.js"; // Import test-related routes
import postRouter from "./app/routes/post.routes.js"; // Import post-related routes

// Create an Express application instance
const app = express();

/**
 * Middleware Configuration
 */
// Parse incoming JSON payloads
app.use(express.json());
// Parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));
// Log HTTP requests to the console in "dev" format
app.use(logger("dev"));

/**
 * CORS Configuration
 * Allows requests from specific origins (e.g., frontend applications).
 */
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Whitelisted origins
};
app.use(cors(corsOptions));

/**
 * Database Connection
 * Connects to the MongoDB database and initializes roles if none exist.
 */
const { mongoose, url } = db; // Destructure Mongoose instance and database URL
const { role: Role } = db; // Destructure the Role model
mongoose
  .connect(url) // Attempt to connect to the database
  .then(async () => {
    console.log("Connected to the database");
    await initial(); // Initialize roles after successful connection
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
    process.exit(); // Exit the process if the database connection fails
  });

/**
 * Routes
 */
// Test route to verify server functionality
app.get("/test", (req, res) => {
  res.send({ data: "test from server!!!!" });
});

// User authentication routes
app.use("/api/user/auth", userRouter);

// Test-related routes
app.use("/api/user/test", testRouter);

// Post-related routes
app.use("/api/posts", postRouter);

/**
 * Server Configuration
 * Starts the server on the specified port.
 */
const PORT = process.env.PORT || 8000; // Use the environment-defined port or default to 8000
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

/**
 * Initial Setup
 * Ensures that the required roles are present in the database.
 * If no roles exist, it creates default roles: 'user', 'admin', and 'moderator'.
 */
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount(); // Check the number of roles in the database
    if (count === 0) {
      // If no roles exist, create default roles
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
        new Role({ name: "moderator" }).save(),
      ]);
      console.log("Added initial roles to collection");
    }
  } catch (error) {
    // Handle any errors during the initial setup
    console.log("Error during initial setup:", error);
  }
}
