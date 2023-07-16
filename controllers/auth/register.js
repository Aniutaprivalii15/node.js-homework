const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError } = require("../../helpers");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, });

  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target =" _blank">Confirm your email</a>`,
  };
  await sendEmail(mail);
  
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;