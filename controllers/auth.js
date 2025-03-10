// AUTH CONTROLLER
// Import Express to create a Router object
const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); // Follows the lesson
const bcrypt = require("bcrypt");

// ROUTES

// GET /auth/sign-up
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs"); // Matches lesson
});

// POST /sign-up Route
router.post("/sign-up", async (req, res) => {
    // Check if username already exists (Matches lesson)
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken."); // Follows lesson
    }

    // Check if password and confirmPassword match (Matches lesson)
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    }

    // Create encrypted version of password ('hash' and 'salted')
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // Fix: `await` must be inside the async function
    const user = await User.create(req.body);

    // Fix: Ensure response is sent correctly
    res.send(`Thanks for signing up ${user.username}`);
});
//GET Sign-In
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})
//POST sign-in - when login form is submitted
router.post('/sign-in', async (req,res) => {
    const userInDatabase = await User.findOne({ 
        username: req.body.username
    })
    if(!userInDatabase) {
        return res.send('Login Failed. Please try again!')
    }
    const validPassword = bcrypt.compareSync(
        req.body.password, userInDatabase.password
        )
        if(!validPassword) {
            return res.send('Login Failed. Please try again!')
        }
        //at this point, we made it past verification
})

// EXPORT ROUTER 
module.exports = router;