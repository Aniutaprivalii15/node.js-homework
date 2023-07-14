const express = require("express");

const { validator, authentication } = require("../../middlewares");
const { schemas } = require("../../models/user");
const control = require("../../controllers/auth");
const router = express.Router();

router.post("/register", validator(schemas.registerSchema), control.register);

router.post("/login", validator(schemas.loginSchema), control.login);

router.get("/current", authentication, control.getCurrent);

router.post("/logout", authentication, control.logout);

module.exports = router;