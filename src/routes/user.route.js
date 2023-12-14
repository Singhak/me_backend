import { Router } from "express";
import { registerUser, userLogin } from "../controllers/user.controller.js";
import { FileUpload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/register").post(FileUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), registerUser)

router.route("/login").post(userLogin)

export { router }