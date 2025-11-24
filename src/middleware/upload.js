const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("fileee", file);

    const fillPath = path.join("public/" + file.fieldname);
    console.log("fillPath", fillPath);

    fs.mkdir(fillPath, (recursive = true), (err) => {
      if (err) {
        console.log("Not Folder");
      }
    });

    cb(null, fillPath);

    // cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
