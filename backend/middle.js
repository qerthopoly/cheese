const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_KEY = process.env.JWT_SECRET;

module.exports = {
  isLoggedIn: (req, res, next) => {
    // console.log("isLoggedIn happened");

    try {
      const authToken = req.headers.authorization.replace(/Bearer /gm, "");

      const verify = jwt.verify(authToken, JWT_KEY);

      req.myData = verify;

      // console.log("VERIFY happened", verify);

      next();
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: error,
      });
    }
  },
};
