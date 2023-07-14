const { controlWrapper } = require("../../helpers");

const register = require("./register");

const login = require("./login");

const getCurrent = require("./current");

const logout = require("./logout");

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  getCurrent: controlWrapper(getCurrent),
  logout: controlWrapper(logout),
};