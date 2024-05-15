import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./public/uploads`;

    if (req.params?.id) {
      path = path + `/${req.params.id}`;
    }

    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export const uploadFileMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      const error = new Error("Error: Images only! (jpeg, jpg, png, webp)");
      return cb(error);
    }
    cb(null, true);
  },
});
