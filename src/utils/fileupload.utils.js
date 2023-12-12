import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_API_SECRET
});

const uploadFile = async (file) => {
    try {
        return await cloudinary.uploader.upload(file, { format: 'auto' });
    } catch (error) {
        console.log('Error while uploading file in cloudlinary: ', error)
    }
}

export { uploadFile }; git