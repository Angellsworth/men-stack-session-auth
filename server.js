// Dependencies
// Import required packages for our Express app
const express = require("express"); // Web framework for handling routes and HTTP requests
const mongoose = require("mongoose"); // ODM (Object-Document Mapping) for interacting with MongoDB
const methodOverride = require("method-override"); // Allows us to use HTTP verbs like PUT & DELETE in forms
const morgan = require("morgan"); // Logs HTTP requests in the terminal for debugging
const dotenv = require("dotenv"); // Loads environment variables from a .env file
const session = require('express-session')
const authController = require("./controllers/auth.js");

// Initialize
const app = express(); // Creates an Express app instance

// Load environment variables from .env file
dotenv.config();

// Define the port where the server will run
// Uses an environment variable if available, otherwise defaults to port 3000
const port = process.env.PORT || "3000"; 

// Connect to MongoDB using the MONGODB_URI from environment variables
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Middleware functions process requests before they reach our routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.SESSION_SECRET
}))


// Fun Fact: Router Code is actually a type of middleware!
// This will automatically forward any HTTP requests that start with "/auth" to the authController.
app.use("/auth", authController);

//Routes
// Landing Page (Root Route)
// This will later include links for users to sign in or sign up
app.get("/", async (req, res) => {
    res.render("index.ejs"); // Serves the landing page using EJS
});

// Starts the Express server and listens on the specified port
app.listen(port, () => {
    console.log(`🚀 Angela, Your Express app is Authenticating on port ${port}!!`);
});