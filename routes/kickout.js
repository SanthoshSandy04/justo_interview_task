const kickout = require("../controllers/kickout");

/**
 * * @swagger
 * /kickout:
 *   post:
 *     summary: Kick out a user
 *     description: Kick out a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Bad request 
 */
const kickoutUser = async (req, res) => {
  try {
    const { username } = req.body;
    await kickout(username);
    res.status(200).json({ message: "User kicked out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = kickoutUser;
