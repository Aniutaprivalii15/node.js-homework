const { controlWrapper } = require("../../helpers");

const register = require("./register");

const login = require("./login");

const getCurrent = require("./current");

const logout = require("./logout");

const updateAvatar = require("./avatar");

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  getCurrent: controlWrapper(getCurrent),
  logout: controlWrapper(logout),
  updateAvatar: controlWrapper(updateAvatar),
};