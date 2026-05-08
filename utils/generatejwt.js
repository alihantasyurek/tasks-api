const jwt = require("jsonwebtoken");

module.exports = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 604800 });
};
