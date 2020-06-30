const multer = require("multer");

exports.postUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      req.dest = "post";
      cb(null, path.join(__dirname, `../uploads/${req.dest}`));
    },
    filename: (req, file, cb) => {
      const fileType = file.mimetype.split("/")[1];
      const generatedName =
        new Date().toISOString().replace(/:/g, "-") + file.originalname.trim();
      const { originalname } = file;
      const savedName = generatedName.replace(originalname, "." + fileType);
      cb(null, savedName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
