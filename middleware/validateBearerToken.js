const API_TOKEN = require("../config").API_TOKEN;

function validateBearerToken(req, res, next) {
  const bearerToken = req.get("Authorization");

  if (!bearerToken || bearerToken.split(" ")[1] !== API_TOKEN) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
}

module.exports = validateBearerToken;
