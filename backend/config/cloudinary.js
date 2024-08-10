import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_app_images",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

export async function uploadOnCloudinary(imgUrl) {
  if (!imgUrl) return null;

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imgUrl, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}
