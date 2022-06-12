const { body } = require("express-validator");

class loginValidator {
  handle() {
    return [
        body("mobile")
        .isNumeric()
        .isLength({max: 11 , min: 11}),

        body("password")
        .isLength({ min : 8 }),
    ];
  }
}

module.exports = new loginValidator();
