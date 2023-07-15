const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: temporaryUpload, originalname } = req.file;
  console.log(temporaryUpload);
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, originalname);

  await fs.rename(temporaryUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  Jimp.read(temporaryUpload, (error, img) => {
    if (error) throw error;
    img.resize(250, 250).write(resultUpload);
  });

  res.json({ avatarURL });
};

module.exports = updateAvatar;