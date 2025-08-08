// Complete image utility functions for frontend
const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://order-management-4pdd.onrender.com";

/**
 * Get the full image URL from a relative path
 * @param {string} imagePath - The image path (e.g., "uploads/filename.jpg")
 * @returns {string} - Full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/images/placeholder.jpg"; // Fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Handle various path formats and normalize to relative path
  let normalizedPath = imagePath;

  // Remove leading slash if present
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }

  // Ensure it starts with uploads/
  if (!normalizedPath.startsWith('uploads/')) {
    // Extract filename if path contains uploads somewhere
    if (normalizedPath.includes('uploads/')) {
      const uploadIndex = normalizedPath.lastIndexOf('uploads/');
      normalizedPath = normalizedPath.substring(uploadIndex);
    } else {
      // Assume it's just a filename
      normalizedPath = `uploads/${normalizedPath}`;
    }
  }

  // Return full URL
  return `${BACKEND_BASE_URL}/${normalizedPath}`;
};

/**
 * Create optimized image URL with lazy loading support
 * @param {string} imagePath - The image path
 * @param {object} options - Image optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imagePath, options = {}) => {
  const { width, height, quality = 80 } = options;
  const baseUrl = getImageUrl(imagePath);
  
  // For now, return base URL. Can be extended with image optimization service
  return baseUrl;
};

/**
 * Validate if image path is valid
 * @param {string} imagePath - The image path to validate
 * @returns {boolean} - Whether the path is valid
 */
export const isValidImagePath = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return false;
  }
  
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasValidExtension = validExtensions.some(ext => 
    imagePath.toLowerCase().includes(ext)
  );
  
  return hasValidExtension;
};

/**
 * Get fallback image for broken/missing images
 * @param {string} category - Product category for category-specific fallback
 * @returns {string} - Fallback image URL
 */
export const getFallbackImage = (category = 'default') => {
  const fallbackImages = {
    food: '/images/food-placeholder.jpg',
    electronics: '/images/electronics-placeholder.jpg',
    clothing: '/images/clothing-placeholder.jpg',
    default: '/images/placeholder.jpg'
  };
  
  return fallbackImages[category.toLowerCase()] || fallbackImages.default;
};