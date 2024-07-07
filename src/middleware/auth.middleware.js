import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrorHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";

const VerifyJWT = asyncHandler(async (req, res, next) => {
    let accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    let decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!accessToken) throw new ApiError('401', "Unautorized Access");

    let user = await User.findById({ _id: decodedToken._id }).select("-password");

    if (!user || user.jwtTimestamp != decodedToken.jwtTimestamp) throw new ApiError(401, "Invalid Access Token");
    // if refresh token not exist, it means we logout the user and user is using old accesstoken
    if (!user?.refreshToken) throw new ApiError(401, "Invalid Access Token");
    req.user = user;
    next();
})

export { VerifyJWT }