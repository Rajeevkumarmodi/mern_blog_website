import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./blogImage");
  },
  filename: (req, file, callBack) => {
    const fileName = Date.now() + "-" + file.originalname;
    callBack(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
