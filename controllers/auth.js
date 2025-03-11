// AUTH CONTROLLER
const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); 
const bcrypt = require("bcrypt");

// GET /auth/sign-up
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// POST /sign-up Route
router.post("/sign-up", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    }

    // ✅ Hash password securely
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // ✅ Store user safely
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
    });

    res.send(`Thanks for signing up ${user.username}`);
});

// GET /auth/sign-in
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// POST /auth/sign-in - when login form is submitted
router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        return res.send("Login Failed. Please try again!");
    }

    const validPassword = await bcrypt.compare(req.body.password, userInDatabase.password);
    if (!validPassword) {
        return res.send("Login Failed. Please try again!");
    }

    // ✅ Save session before redirecting
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
    };

    req.session.save(() => {
        res.redirect("/");
    });

    console.log(`✅ User ${userInDatabase.username} logged in successfully!`);
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();//destroying the session "ends" login session
    res.redirect('/');//return to homepage
})

// EXPORT ROUTER
module.exports = router;