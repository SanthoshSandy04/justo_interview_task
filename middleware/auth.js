const jwt = require("jsonwebtoken");
const models = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const validToken = await models.Token.findOne({
      where: { user_id: decoded.id },
    });

    if (!validToken) return res.status(401).json({ message: "Invalid Token" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticate;
