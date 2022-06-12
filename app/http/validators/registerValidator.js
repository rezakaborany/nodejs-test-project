const { body } = require("express-validator");

class registerValidator {
  handle() {
    return [
      body("name")
        .isLength({ min: 1 }),

        body("age")
        .isInt({ min: 1 , max:80 })
        .withMessage("age can not be greater than 80"),

        body("mobile")
        .isNumeric()
        .isLength({max: 11 , min: 11}),

        body("password")
        .matches(new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])"))
        .isLength({ min : 8 }),

        body('rePassword').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('rePassword does not match password');
          }
          return true;
        })
    ];
  }
}

module.exports = new registerValidator();
