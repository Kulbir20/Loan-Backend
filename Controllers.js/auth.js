const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "30d" });
};
