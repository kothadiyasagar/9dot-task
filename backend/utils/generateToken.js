const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "secret_key", { expiresIn: "1h" });
};

module.exports = generateToken;
