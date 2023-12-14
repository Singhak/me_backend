import { User } from "../models/user.model.js"


const whichRequiredFieldsEmpty = function ({ username, fullName, email, password }) {
    let errorMsg = '';
    if (!username?.trim()) { errorMsg = `${errorMsg} username,` };
    if (!fullName?.trim()) { errorMsg = `${errorMsg} fullName,` };
    if (!email?.trim()) { errorMsg = `${errorMsg} email,` };
    if (!password?.trim()) { errorMsg = `${errorMsg} password,` };
    return errorMsg ? `${errorMsg.slice(0, -1)} is/are required fields` : errorMsg;
}

const isValidEmail = function (email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isUserExist = async function (username, email) {
    return await User.findOne({ $or: [{ username }, { email }] }).exec();
}

export { whichRequiredFieldsEmpty, isValidEmail, isUserExist }