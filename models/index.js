const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./user");
const TokenModel = require("./token");

// Initialize models with Sequelize instance
const User = UserModel(sequelize, DataTypes);
const Token = TokenModel(sequelize, DataTypes);

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, User, Token, syncDatabase };
