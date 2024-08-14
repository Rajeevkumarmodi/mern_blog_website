import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadOnCloudinary(imgUrl) {
  if (!imgUrl) return null;

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imgUrl, {
      folder: "blog_app_images",
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

// delete image

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    // Extract the public ID from the URL

    const publicId = imageUrl.split("/").pop().split(".")[0];
    const promise = await cloudinary.uploader.destroy(
      `blog_app_images/${publicId}`
    );

    return promise;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};
