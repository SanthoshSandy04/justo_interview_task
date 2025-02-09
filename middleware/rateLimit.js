const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX,
  message: "Too many login attempts. Please try again later.",
});

module.exports = loginRateLimiter;
