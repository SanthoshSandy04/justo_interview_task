const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const LoginRateLimiter = require("../middleware/rateLimit");
const { Create, Login } = require("./auth");
const get_time = require("./user");
const validateSchema = require("../schemas/userSchema");
const kickout = require("./kickout");

// Route for creating a new user with validation
router.post("/create", validateSchema, Create);

// Route for login with rate limiting
router.post("/login", LoginRateLimiter, Login);

// Route to get time with authentication
router.get("/get_time", Auth, get_time);

// Route to kick out a user
router.post("/kickout", kickout);

module.exports = router;
