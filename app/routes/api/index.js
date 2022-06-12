const express = require("express");
const router = express.Router();

const authenticateApi =require("app/http/middleware/authenticateApi");
const errorHandler =require("app/http/middleware/errorHandler");


const {register , user , login , update  , remove } = require("app/http/controllers/userController");


const registerValidator = require("app/http/validators/registerValidator");
const loginValidator = require("app/http/validators/loginValidator");


router.post("/auth/register", registerValidator.handle(),  register);
router.post("/auth/login", loginValidator.handle(),  login);
router.get("/user/:userId", authenticateApi.handle , user);
router.put("/user/update", authenticateApi.handle , registerValidator.handle(), update);
router.delete("/user/remove/:userId",  remove);


router.all("*", errorHandler.error404);
module.exports = router;
