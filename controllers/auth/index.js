const { controlWrapper } = require("../../helpers");

const register = require("./register");

const login = require("./login");

const getCurrent = require("./current");

const logout = require("./logout");

const updateAvatar = require("./avatar");

const verifyEmail = require("./verifyEmail");

const resendEmail = require("./resendEmail");

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  getCurrent: controlWrapper(getCurrent),
  logout: controlWrapper(logout),
  updateAvatar: controlWrapper(updateAvatar),
  verifyEmail: controlWrapper(verifyEmail),
  resendEmail: controlWrapper(resendEmail),
};