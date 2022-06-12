const {client } = require("../../db");
const jwt = require("jsonwebtoken");

class authenticateApi  {
  async handle(req, res, next) {
    let token = req.header("authorization") || "";
    try {
      const decoded = jwt.verify(token, config.jwt.secret_key);
      const user = await client.query('SELECT id,name,mobile FROM users WHERE id=$1', [decoded.id])
      if (!user.rowCount) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user.rows[0];
      next();
    } catch (err) {
      res.status(401).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

module.exports = new authenticateApi();
