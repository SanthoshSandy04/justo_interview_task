const model = require("../models");

const kickout = async (username) => {
  try {
    const id = await model.User.findOne({
      where: { username: username },
      attributes: ["id"],
    });
    const user = JSON.parse(JSON.stringify(id));

    await model.Token.destroy({
      where: { user_id: user?.id },
    });
  } catch (error) {
    console.error("Error deleting token:", error.message);
    throw new Error(error.message);
  }
};

module.exports = kickout;
