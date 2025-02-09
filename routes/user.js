const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /get_time:
 *   get:
 *     summary: Get server time
 *     description: Returns the server time if the token is valid.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The JWT token for authorization.
 *         schema:
 *           type: string
 *           example: Bearer <JWT>
 *     responses:
 *       200:
 *         description: Successfully fetched server time.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serverTime:
 *                   type: string
 *                   example: "2025-02-09T12:34:56.789Z"
 *       401:
 *         description: Unauthorized - Invalid token or missing headers.
 *       500:
 *         description: Internal Server Error
 */
const get_time = async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Return server time if token is valid
      res.json({ serverTime: new Date().toISOString() });
    });
  } catch (error) {
    console.error("Error in get_time API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = get_time;
