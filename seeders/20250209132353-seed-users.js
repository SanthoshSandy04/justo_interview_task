"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: "15fc3e78-d5b9-4655-8299-9d95fc309adc",
        username: "santhosh@mailinator.com",
        password: await bcrypt.hash("password123", 10),
        is_locked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
