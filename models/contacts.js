const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const objectStructure = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favourite: Joi.boolean(),
});

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
});
const schemas = { objectStructure, updateFavouriteSchema };

module.exports = {
  Contact,
  schemas,
};