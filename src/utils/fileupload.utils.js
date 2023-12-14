import { v2 as cloudinary } from 'cloudinary';
import * as fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_API_SECRET
});

const CloudianryUploadFile = async (fileLocalPath) => {
    try {
        let response = await cloudinary.uploader.upload(fileLocalPath, { resource_type: 'auto', folder: "tvb" });
        fs.unlinkSync(fileLocalPath);
        return response.url
    } catch (error) {
        console.log('Error while uploading file in cloudlinary: ', error)
        fs.unlinkSync(fileLocalPath);
        return null
    }
}

export { CloudianryUploadFile };