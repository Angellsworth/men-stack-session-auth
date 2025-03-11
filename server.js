//Server.js
// Dependencies
// Import required packages for our Express app
const express = require("express"); // Web framework for handling routes and HTTP requests
const mongoose = require("mongoose"); // ODM (Object-Document Mapping) for interacting with MongoDB
const methodOverride = require("method-override"); // Allows us to use HTTP verbs like PUT & DELETE in forms
const morgan = require("morgan"); // Logs HTTP requests in the terminal for debugging
const dotenv = require("dotenv"); // Loads environment variables from a .env file
const session = require("express-session"); // Middleware for handling user sessions
const authController = require("./controllers/auth.js");

// Initialize
const app = express(); // Creates an Express app instance

// Load environment variables from .env file
dotenv.config();

// Define the port where the server will run
const port = process.env.PORT || "3000"; 

// Connect to MongoDB using the MONGODB_URI from environment variables
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.set("view engine", "ejs"); // ✅ Tells Express to use EJS for rendering views
app.set("views", __dirname + "/views"); // ✅ Ensures views are correctly located

// Middleware functions process requests before they reach our routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.SESSION_SECRET || "defaultSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // ✅ Ensures session works even without HTTPS
}));

//  Log every request to "/auth/*" to debug route registration
app.use("/auth", (req, res, next) => {
    console.log(`🔍 Request received at: ${req.url}`);
    next();
}, authController); // ✅ This correctly forwards requests to authController

//  Homepage Route - Shows logged-in user (if any)
app.get("/", (req, res) => {
    res.render("index", { user: req.session.user || null });
});

//protected routes - user must be logged in for access
app.get('/vip-lounge', (req, res) => {
    if(req.session.user) {
        res.send('Welcome to the VIP Lounge')
    } else {
        res.send('Sorry, you must be logged in for that')
    }
})

// Starts the Express server and listens on the specified port
app.listen(port, () => {
    console.log(`🚀 Angela, Your Express app is Authenticating on port ${port}!!`);
});