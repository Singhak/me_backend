import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { whichRequiredFieldsEmpty, isUserExist, isValidEmail, isUsernameExist, isEmailExist } from "../validations/user.validation.js";
import { ApiError } from "../utils/apiErrorHandler.utils.js"
import { CloudianryUploadFile } from "../utils/fileupload.utils.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponseHandler.utils.js"
import jwt from "jsonwebtoken"


const cookiesOptions = {
    httpOnly: true,
    secure: true
}

async function generateTokens(userId) {
    try {
        const user = await User.findById({ _id: userId }).exec();
        let accessToken = user.generateAccessToken();
        let refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log("generateTokens: Error while generating JWT Tokens: ", error);
        throw new ApiError('500', "Somting went wrong while generating tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // extract user detail from req
    const { username, fullName, email, password } = req.body;
    console.log({ username, fullName, email, password });

    // Check required field availibility
    let whichFieldIsEmpty = whichRequiredFieldsEmpty({ username, fullName, email, password });
    if (whichFieldIsEmpty) {
        throw new ApiError(400, whichFieldIsEmpty);
    }

    if (!isValidEmail(email)) {
        throw new ApiError(400, 'Email is not valid');
    }

    // check user already exist or not
    let existingUser = await isUserExist(username, email);
    // console.log(existingUser);
    if (existingUser) {
        throw new ApiError(409, 'User already exist.')
    }

    // check for user uploaded images
    const { avatar = [], coverImage = [] } = req.files;
    // console.log(avatar, coverImage);

    if (!avatar.length) throw new ApiError(400, 'Avatar image is required');

    // upload image at cloudinary
    let avatarPath = avatar.length && await CloudianryUploadFile(avatar[0].path);
    let coverImgPath = coverImage.length && await CloudianryUploadFile(coverImage[0].path);

    if (!avatarPath) throw new ApiError(500, 'Unable to upload image');

    // prepare object to create user
    const user = { username, fullName, email, avatar: avatarPath, coverImage: coverImgPath };
    let createdUser = await User.create({ ...user, password });
    // console.log({ createdUser });
    if (!createdUser) {
        throw new ApiError(500, 'Somthing went wrong while creating user');
    }

    res.status(200).json(new ApiResponse(200, user, 'User sucessfully created'))
})

const userLogin = asyncHandler(async (req, res) => {
    // console.log(req)
    // extract user detail from req
    let { username, email, password } = req.body;
    // username email password
    if (!(username || email)) {
        throw new ApiError(400, "username or email is required to login")
    }
    if (!password) throw new ApiError(400, "Password is required");

    let userExist = await isUserExist(username, email);
    // console.log(userExist);
    if (!userExist) {
        throw new ApiError(404, "User does not exist with given username/email");
    }
    if (!await userExist.isPasswordSame(password)) {
        throw new ApiError(401, "User Authentication failed");
    }

    const { accessToken, refreshToken } = await generateTokens(userExist._id);
    console.log({ accessToken, refreshToken });
    let userDetailsToSend = await User.findById({ _id: userExist.id }).select("-password -refreshToken -__v");

    res.status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200, { user: userDetailsToSend, accessToken, refreshToken }, 'User LogedIn sucessfully'))

})

const userLogout = asyncHandler(async (req, res) => {
    let user = req.user;
    await User.findByIdAndUpdate({ _id: user._id }, { refreshToken: null }).exec();
    res.status(200)
        .cookie('accessToken', "", cookiesOptions)
        .cookie('refreshToken', "", cookiesOptions)
        .json(new ApiResponse(200, {}, "User logedout sucessfully"));
})

const refreshUserAccessToken = asyncHandler(async (req, res) => {
    let incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incommingRefreshToken) throw new ApiError(401, 'Invalid refresh token');
    let { _id } = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    let user = await User.findById(_id).exec();
    if (!user) throw new ApiError(401, 'Invalid refresh token');
    if (incommingRefreshToken !== user.refreshToken) throw new ApiError(401, 'Invalid refresh token');

    let { accessToken, refreshToken } = await generateTokens(user._id);
    res.status(200)
        .cookie("accessToken", accessToken, cookiesOptions).cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken }, 'Access Token refresh succesfully'))
})

const updateLoginPassword = asyncHandler(async (req, res) => {
    let { oldPassword, newPassword } = req.body;
    let user = req.user;

    if (!user) throw new ApiError(401, 'User is not login');

    if (!(oldPassword && newPassword)) {
        throw new ApiError(400, "Old and New password are required");
    }
    let isPasswordSame = await user.isPasswordSame(oldPassword);
    if (!isPasswordSame) throw new ApiError(401, 'Old password is not valid');

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json(new ApiResponse(200, {}, "User Password updated sucessfully"));
})

const updateAvatarImage = asyncHandler(async (req, res) => {
    let { user, file } = req;
    if (!user) throw new ApiError(401, "User is not login");
    if (!file) throw new ApiError(400, "Avatar image is required");
    let avatarLocalPath = file.path;
    let avatarPath = await CloudianryUploadFile(avatarLocalPath);
    if (!avatarPath) throw new ApiError(500, "Unable to upload avatar image");
    user.avatar = avatarPath;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(new ApiResponse(200, user, "Avatar Image updated sucessfullly."));
})

const updateCoverImage = asyncHandler(async (req, res) => {
    let { user, file } = req;
    if (!user) throw new ApiError(401, "User is not login");
    if (!file) throw new ApiError(400, "Cover image is required");
    let coverImageLocalPath = file.path
    let coverImagePath = await CloudianryUploadFile(coverImageLocalPath);
    if (!coverImagePath) throw new ApiError(500, "Unable to upload cover image");
    user.coverImage = coverImagePath;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(new ApiResponse(200, user, "Cover Image updated sucessfullly."));
})

const updateUserDetails = asyncHandler(async (req, res) => {
    let { fullName, email, username } = req.body;
    let user = req.user;
    if (!fullName && (!email && !username)) throw new ApiError(400, "Data is not provided to update");

    if (fullName) user.fullName = fullName;

    if (email && email !== user.email) {
        if (await isEmailExist(email)) {
            throw new ApiError('400', "Email already exist");
        }
        user.email = email;
    }
    if (username && (username !== user.username)) {
        if (await isUsernameExist(username)) {
            throw new ApiError('400', "Username already exist");
        }
        user.username = username;
    }

    await user.save({ validateBeforeSave: false });
    res.status(200).json(new ApiResponse(200, user, "User detail updated sucessfully"));
})

export { registerUser, userLogin, userLogout, refreshUserAccessToken, updateLoginPassword, updateCoverImage, updateAvatarImage, updateUserDetails }