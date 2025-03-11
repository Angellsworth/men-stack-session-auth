// USER MODEL

// This file defines the structure of the "User" collection in MongoDB.
// It ensures that every user has a unique username and a password (which should be hashed before storage).

// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// DEFINE USER SCHEMA 
// A schema defines the structure of the document (data) stored in MongoDB.
// The `User` schema specifies the required fields and their constraints.
const userSchema = new mongoose.Schema({
    
    //  USERNAME FIELD 
    username: {
        type: String,   // The username must be a string
        required: true, // Ensures that a username is required (NOT NULL)
        unique: true    // Ensures that usernames are unique (no duplicates in the database)
    },
    
    //  PASSWORD FIELD 
    password: {
        type: String,   // The password must be a string
        required: true, // Ensures that a password is required (NOT NULL)
        // ⚠️ Passwords should NEVER be stored in plain text!
        // Always hash passwords before saving them to the database.
    }
});

// CREATE USER MODEL 
// Mongoose converts this schema into a collection called "users" in MongoDB.
// The `User` model allows us to interact with the database using JavaScript.
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL 
// This allows us to use the `User` model in other files (e.g., auth controllers).
module.exports = User;