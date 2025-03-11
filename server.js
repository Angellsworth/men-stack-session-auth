//Server.js
//  Import required packages for our Express app
const express = require("express"); // Web framework for handling routes and HTTP requests
const mongoose = require("mongoose"); // ODM (Object-Document Mapping) for interacting with MongoDB
const methodOverride = require("method-override"); // Allows us to use HTTP verbs like PUT & DELETE in forms
const morgan = require("morgan"); // Logs HTTP requests in the terminal for debugging
const dotenv = require("dotenv"); // Loads environment variables from a .env file
const session = require("express-session"); // Middleware for handling user sessions
const authController = require("./controllers/auth.js");
const fruitsController = require('./controllers/fruits')

// Initialize
const app = express(); // Creates an Express app instance

// Load environment variables from .env file
dotenv.config();

// Define the port where the server will run
const port = process.env.PORT || "3001"; 

// Connect to MongoDB using the MONGODB_URI from environment variables
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.set("view engine", "ejs"); // ✅ Tells Express to use EJS for rendering views
app.set("views", __dirname + "/views"); // ✅ Ensures views are correctly located

// Mount Middleware functions process requests before they reach our routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.SESSION_SECRET || "defaultSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } //  Ensures session works even without HTTPS
}));
//custom middleware
app.use((req, res, next) => {
    if(req.session.message) {
    //res.locals makes infomation available to templates
    //res is the response object
    //the res object is part of our communication with the client
        res.locals.message = req.session.message
        //now we clear out or nullify req.session.message
        req.session.message = null
    }
    //now we can pass along the request to our routes
    next(); //"calls" the next middleware function or route handler
    //NOTE: route handlers are a type of middleware
})

//  Log every request to "/auth/*" to debug route registration
app.use("/auth", (req, res, next) => {
    console.log(`🔍 Request received at: ${req.url}`);
    next();
}, authController); // This correctly forwards requests to authController
app.use('/fruits', fruitsController)
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

//the 'Catch All' route should always be listed last
app.get("*", function (req, res) {
    res.render("error.ejs", { msg: "Page not found!" });
  });
  

// Starts the Express server and listens on the specified port
app.listen(port, () => {
    console.log(`Angela, BE YOU! BE AUTHENTIC! on port ${port}!!`);
});