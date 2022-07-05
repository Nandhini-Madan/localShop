const jwt = require("jsonwebtoken"); 
let constant = require('../utils/constants');

module.exports = {
    handleError,
    isValid,
    makeJwt,
}

function handleError(err, res) {
    res.status(500).json({ message: err.message });
}

function isValid(user) {
    return Boolean(user.email && user.password && typeof user.password === "string");
  }

  function makeJwt(user) {
    const payload = {
        userId: user.userId,
        name: user.name,
        role: user.role,
    };

    const secret = constant.jwtSecret;

    const options = {
        expiresIn: "24h",
    };

    return jwt.sign(payload, secret, options);
}