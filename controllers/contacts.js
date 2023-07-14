const contacts = require("../models/contacts");

const { HttpError, controlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await contacts.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: 5,
  });
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contacts.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.findByIdAndDelete(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact is deleted" });
};

module.exports = {
  listContacts: controlWrapper(listContacts),
  getContactById: controlWrapper(getContactById),
  addContact: controlWrapper(addContact),
  updateContact: controlWrapper(updateContact),
  updateFavourite: controlWrapper(updateFavourite),
  removeContact: controlWrapper(removeContact),
};