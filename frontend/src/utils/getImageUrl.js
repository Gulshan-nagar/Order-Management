// Updated getImageUrl utility for consistent image handling
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? "http://localhost:5000" : "https://order-management-4pdd.onrender.com");

export const getImageUrl = (imgPath) => {
  if (!imgPath) return "";
  
  // If it's already a full URL, return as is
  if (imgPath.startsWith('http')) {
    return imgPath;
  }
  
  // Normalize path to ensure consistent format
  let normalizedPath = imgPath;
  
  // Remove leading slash if present
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Ensure it starts with uploads/
  if (!normalizedPath.startsWith('uploads/')) {
    if (normalizedPath.includes('uploads/')) {
      // Extract from uploads/ onward
      const uploadIndex = normalizedPath.lastIndexOf('uploads/');
      normalizedPath = normalizedPath.substring(uploadIndex);
    } else {
      // Assume it's just a filename
      normalizedPath = `uploads/${normalizedPath}`;
    }
  }
  
  return `${BASE_URL}/${normalizedPath}`;
};