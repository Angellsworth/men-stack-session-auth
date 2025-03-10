// -----------------------
// 🔹 DEPENDENCIES 🔹
// -----------------------
// Import required packages for our Express app
const express = require('express'); // Web framework for handling routes and HTTP requests
const mongoose = require('mongoose'); // ODM (Object-Document Mapping) for interacting with MongoDB
const methodOverride = require('method-override'); // Allows us to use HTTP verbs like PUT & DELETE in forms
const morgan = require('morgan'); // Logs HTTP requests in the terminal for debugging
const dotenv = require('dotenv'); // Loads environment variables from a .env file

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
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Event listener to confirm connection to the database
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // Logs the database name upon connection
});

// -----------------------
// 🔹 MIDDLEWARE 🔹
// -----------------------
// Middleware functions process requests before they reach our routes

// Parses form data from POST requests (used for login/signup forms)
app.use(express.urlencoded({ extended: false })); 

// Allows us to use `_method` in form submissions to simulate PUT & DELETE requests
app.use(methodOverride("_method"));

// Logs HTTP requests to the console for debugging
app.use(morgan('dev'));

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
    console.log(`Angela, Your Express app is Authenticating on port ${port}!!`); 
});



// ⸻

// 🔹 What This Code Does (Authentication Context)
// 	1.	Sets Up Dependencies – Express, Mongoose, Morgan, and dotenv for authentication setup.
// 	2.	Connects to MongoDB – Essential for user data storage (e.g., storing credentials).
// 	3.	Uses Middleware – Parses form data, logs requests, and enables method override (important for handling user updates/deletes).
// 	4.	Creates a Landing Page Route – This will eventually link to login/signup pages for authentication.
// 	5.	Starts the Server – The app runs and listens for incoming requests.

// ⸻

// 🔹 What’s Next in Authentication?
// 	•	Create a User Model (userSchema) ✅ (You’ve already done this!)
// 	•	Add Signup & Login Forms (to handle user registration and authentication)
// 	•	Implement Authentication Logic (Hash passwords, compare login credentials)
// 	•	Protect Routes (Ensure only logged-in users can access certain pages)

// Let me know how you’d like to proceed! 🚀