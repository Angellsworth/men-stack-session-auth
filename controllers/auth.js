// -----------------------
// 🔹 AUTH CONTROLLER 🔹
// -----------------------
// Import Express to create a Router object
const express = require("express");
const router = express.Router();

// -----------------------
// 🔹 ROUTES 🔹
// -----------------------
// The router object is similar to the `app` object in `server.js`.
// However, it only has routing functionality and is used to define authentication-related routes.

// GET /auth/sign-up
// Renders the signup form (this will later handle user registration)
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs"); // Serves the sign-up page from the views/auth folder
});

// -----------------------
// 🔹 EXPORT ROUTER 🔹
// -----------------------
module.exports = router;

// -----------------------
// 🔹 TODO: Add More Authentication Routes 🔹
// -----------------------
// ✅ Handle user signup with `POST /auth/sign-up`
// ✅ Add login route: `GET /auth/login` & `POST /auth/login`
// ✅ Implement logout functionality: `GET /auth/logout`
// ✅ Protect routes using session-based authentication