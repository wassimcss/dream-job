const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var uploadcv = multer({
  storage: storage,
   fileFilter: function (req, file, cb) {
     if (
       file.mimetype == "application/pdf" 
      
     ) {
       cb(null, true);
     } else {
       console.log("only pdf are supported");
       cb(null, false);
     }
   },
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = uploadcv;
