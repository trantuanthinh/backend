import multer, { diskStorage } from "multer";
import { promisify } from "util";
const maxSize = 2 * 1024 * 1024;

let storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploadsDecor");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadDecorFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadDecorMiddleware = promisify(uploadDecorFile);
export default uploadDecorMiddleware;
