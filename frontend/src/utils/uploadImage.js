import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append the image file to the form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Indicate that this is a file upload
        },
      }
    );
    return response.data; // Return the response data (e.g., the uploaded image URL)
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

export default uploadImage;
