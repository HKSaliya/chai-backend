import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnClodinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on clodinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("FIle has been uploaded on cloudinary", response.url)
        // fs.unlinkSync(localFilePath) // remove the locally saved file as the upload operation got failed
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved file as the upload operation got failed
        return null;
    }
}

export { uploadOnClodinary }