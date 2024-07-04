const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//authorization
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // console.log(decoded);
    req.teacher = decoded;
    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};
