// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define a new schema for the "User" model
const userSchema = new mongoose.Schema({
    // "username" field - stores the user's name
    username: {
        type: String, // The data type must be a string
        required: true, // Ensures that a username is required (NOT NULL)
    },
    
    // "password" field - stores the user's password (hashed in production)
    password: {
        type: String, // The password must be a string
        required: true, // Ensures that a password is required (NOT NULL)
        // In a real-world scenario, passwords should be hashed before storing them in the database
    }
});

// Create a Mongoose model named "User" using the defined schema
// This model represents the "users" collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;