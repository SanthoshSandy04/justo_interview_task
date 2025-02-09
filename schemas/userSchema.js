const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv(); // Create an instance of Ajv
addFormats(ajv); // Add formats support

const userSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string", minLength: 5 },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(userSchema);

function validateSchema(req, res, next) {
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({ error: validate.errors });
  }
  next();
}

module.exports = validateSchema;
