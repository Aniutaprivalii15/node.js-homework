const express = require('express')

const router = express.Router()

const controller = require("../../controllers/contacts");

const { validator,isValidId, authentication } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", authentication, controller.listContacts);

router.get("/:id", authentication, isValidId, controller.getContactById);

router.post("/", authentication, validator(schemas.objectStructure), controller.addContact);

router.delete("/:id", authentication, isValidId, isValidId, controller.removeContact);

router.put("/:id", authentication, isValidId, validator(schemas.objectStructure), controller.updateContact);

router.patch("/:id/favourite", authentication, isValidId, validator(schemas.updateFavouriteSchema), controller.updateFavourite);

module.exports = router
