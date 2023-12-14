import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    console.log("fileFilter :", file);
    cb(null, true);
}

export const FileUpload = multer({ storage: storage, fileFilter })