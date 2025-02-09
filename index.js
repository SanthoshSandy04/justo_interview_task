const express = require("express");
const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { syncDatabase } = require("./models");
const logger = require("./middleware/logger");
const router = require("./routes");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API", // Your API title
    version: "1.0.0", // Your API version
    description: "API documentation for my Express app with Sequelize",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`, // Your API base URL
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your API routes files
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Body Parser Middleware
app.use(express.json());
// Logger Middleware
app.use(logger);

// Routes Initialization
app.use("/api/v1", router);

// Test DB connection
syncDatabase()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error: " + err));

// App listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
