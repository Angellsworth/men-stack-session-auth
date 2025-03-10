// -----------------------
// 🔹 DEPENDENCIES 🔹
// -----------------------
// Import required packages for our Express app
const express = require("express"); // Web framework for handling routes and HTTP requests
const mongoose = require("mongoose"); // ODM (Object-Document Mapping) for interacting with MongoDB
const methodOverride = require("method-override"); // Allows us to use HTTP verbs like PUT & DELETE in forms
const morgan = require("morgan"); // Logs HTTP requests in the terminal for debugging
const dotenv = require("dotenv"); // Loads environment variables from a .env file

// Import Authentication Controller
const authController = require("./controllers/auth.js");

// -----------------------
// 🔹 INITIALIZE EXPRESS APP 🔹
// -----------------------
const app = express(); // Creates an Express app instance

// -----------------------
// 🔹 CONFIGURE SETTINGS 🔹
// -----------------------
// Load environment variables from .env file
dotenv.config();

// Define the port where the server will run
// Uses an environment variable if available, otherwise defaults to port 3000
const port = process.env.PORT || "3000"; 

// -----------------------
// 🔹 CONNECT TO MONGODB 🔹
// -----------------------
// Connect to MongoDB using the MONGODB_URI from environment variables
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// -----------------------
// 🔹 MIDDLEWARE 🔹
// -----------------------
// Middleware functions process requests before they reach our routes

// Parses JSON data from incoming requests (important for handling API requests)
app.use(express.json());

// Parses form data from POST requests (used for login/signup forms)
app.use(express.urlencoded({ extended: false }));

// Allows us to use `_method` in form submissions to simulate PUT & DELETE requests
app.use(methodOverride("_method"));

// Logs HTTP requests to the console for debugging
app.use(morgan("dev"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// -----------------------
// 🔹 MOUNT AUTH CONTROLLER 🔹
// -----------------------
// Fun Fact: Router Code is actually a type of middleware!
// This will automatically forward any HTTP requests that start with "/auth" to the authController.
app.use("/auth", authController);

// -----------------------
// 🔹 ROUTES 🔹
// -----------------------
// Landing Page (Root Route)
// This will later include links for users to sign in or sign up
app.get("/", async (req, res) => {
    res.render("index.ejs"); // Serves the landing page using EJS
});

// -----------------------
// 🔹 START THE SERVER 🔹
// -----------------------
// Starts the Express server and listens on the specified port
app.listen(port, () => {
    console.log(`🚀 Angela, Your Express app is Authenticating on port ${port}!!`);
});