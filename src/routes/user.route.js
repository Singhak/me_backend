import { Router } from "express";
import { registerUser, userLogin, userLogout, refreshUserAccessToken, updateLoginPassword, updateAvatarImage, updateCoverImage, updateUserDetails } from "../controllers/user.controller.js";
import { FileUpload } from "../middleware/multer.middleware.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(FileUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), registerUser)

router.route("/login").post(userLogin)
router.route("/logout").get(VerifyJWT, userLogout);
router.route("/refresh-user-token").post(refreshUserAccessToken);
router.route("/update-password").post(VerifyJWT, updateLoginPassword);
router.route("/update-details").post(VerifyJWT, updateUserDetails);
router.route("/update-cover-image").post(VerifyJWT, FileUpload.single('coverImage'), updateCoverImage);
router.route("/update-avatar-image").post(VerifyJWT, FileUpload.single('avatar'), updateAvatarImage);

export { router }