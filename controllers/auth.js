const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const model = require("../models");

const CreateUser = async (username, password) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword:", hashedPassword);
    await model.User.create({
      username,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("User creation error:", error.message);
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    // Validate input: At least email or mobile_number must be provided
    if (!username || !password) {
      throw new Error("Either username and password are required");
    }

    // Find user by email or mobile_number
    const user = await model.User.findOne({
      where: { username: username },
    });

    if (!user) throw new Error("User not found");
    if (user.is_locked) throw new Error("Account locked");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    // to find user by token
    const tokenUser = await model.Token.findOne({
      where: { user_id: user.id },
    });

    if (!tokenUser) {
      // Store token in the database
      await model.Token.create({ user_id: user.id, token });
    } else {
      // Update token in the database
      await model.Token.update(
        { token, updatedAt: new Date() },
        { where: { user_id: user.id } }
      );
    }

    return { user, token };
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = { CreateUser, login };
