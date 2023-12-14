import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller.js";
import { FileUpload } from "../middleware/multer.middleware.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(FileUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), registerUser)

router.route("/login").post(userLogin)
router.route("/logout").get(VerifyJWT, userLogout);

export { router }