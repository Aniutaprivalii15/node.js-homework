const multer = require("multer");

const path = require("path");

const temporaryDir = path.join(__dirname, "../", "temporary");

const multerConfig = multer.diskStorage({
  destination: temporaryDir,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;