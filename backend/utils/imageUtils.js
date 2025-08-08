const path = require('path');
const fs = require('fs');

/**
 * Normalize image path to consistent format (uploads/filename.ext)
 * @param {string} imagePath - Input image path
 * @returns {string} - Normalized path
 */
const normalizeImagePath = (imagePath) => {
  if (!imagePath) return '';

  let normalized = imagePath;

  // Remove any domain/base URL
  if (normalized.includes('://')) {
    const urlParts = normalized.split('/');
    const uploadsIndex = urlParts.findIndex(part => part === 'uploads');
    if (uploadsIndex !== -1) {
      normalized = urlParts.slice(uploadsIndex).join('/');
    }
  }

  // Remove leading slash
  if (normalized.startsWith('/')) {
    normalized = normalized.substring(1);
  }

  // Ensure it starts with uploads/
  if (!normalized.startsWith('uploads/')) {
    if (normalized.includes('uploads/')) {
      const uploadIndex = normalized.lastIndexOf('uploads/');
      normalized = normalized.substring(uploadIndex);
    } else {
      // If no uploads/ found, assume it's just a filename
      normalized = `uploads/${normalized}`;
    }
  }

  return normalized;
};

/**
 * Get full file path for storing uploaded images
 * @param {string} filename - The filename
 * @returns {string} - Full file path
 */
const getUploadPath = (filename) => {
  return path.join(__dirname, '../uploads', filename);
};

/**
 * Check if image file exists
 * @param {string} imagePath - Relative image path
 * @returns {boolean} - Whether file exists
 */
const imageExists = (imagePath) => {
  if (!imagePath) return false;
  
  const normalizedPath = normalizeImagePath(imagePath);
  const filename = normalizedPath.replace('uploads/', '');
  const fullPath = getUploadPath(filename);
  
  return fs.existsSync(fullPath);
};

/**
 * Get image URL for client consumption
 * @param {string} imagePath - Relative image path
 * @param {string} baseUrl - Base URL of the server
 * @returns {string} - Full image URL
 */
const getImageUrl = (imagePath, baseUrl) => {
  if (!imagePath) return '';
  
  const normalizedPath = normalizeImagePath(imagePath);
  return `${baseUrl}/${normalizedPath}`;
};

/**
 * Validate uploaded file
 * @param {object} file - Multer file object
 * @returns {object} - Validation result
 */
const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }

  return { valid: true };
};

module.exports = {
  normalizeImagePath,
  getUploadPath,
  imageExists,
  getImageUrl,
  validateImageFile
};