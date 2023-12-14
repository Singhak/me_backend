import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrorHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";

const VerifyJWT = asyncHandler(async (req, res, next) => {
    try {
        let accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ");
        let decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if (!accessToken) throw new ApiError('401', "Unautorized Access");

        let user = await User.findById({ _id: decodedToken._id }).select("-password -refreshToken");
        if (!user) throw new ApiError(401, "Invalid Access Token");
        req.user = user;
        next();
    } catch (error) {
        console.log("VerifyJWT: Error: ", error);
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})

export { VerifyJWT }