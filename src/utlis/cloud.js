// https://console.cloudinary.com/app/c-d4dbdba171d32a8a739e48f982e7ed/home/dashboard

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const updateCloudinary = async (filepath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: folderName,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateCloudinary,
  deleteCloudinary,
};
