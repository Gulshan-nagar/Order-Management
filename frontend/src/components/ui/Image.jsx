import React, { useState, useEffect } from 'react';
import { getImageUrl, getFallbackImage, isValidImagePath } from '../../utils/imageUtils';

/**
 * Enhanced Image component with error handling and lazy loading
 */
const Image = ({ 
  src, 
  alt, 
  category = 'default',
  className = '',
  width,
  height,
  lazy = true,
  ...props 
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src && isValidImagePath(src)) {
      setImageUrl(getImageUrl(src));
      setHasError(false);
    } else {
      setImageUrl(getFallbackImage(category));
      setHasError(true);
    }
    setIsLoading(true);
  }, [src, category]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${imageUrl}`);
    setIsLoading(false);
    setHasError(true);
    // Set fallback image
    setImageUrl(getFallbackImage(category));
  };

  const imageProps = {
    src: imageUrl,
    alt: alt || 'Product image',
    className: `${className} ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`,
    onLoad: handleLoad,
    onError: handleError,
    ...props
  };

  if (width) imageProps.width = width;
  if (height) imageProps.height = height;
  if (lazy) imageProps.loading = 'lazy';

  return (
    <div className="relative inline-block">
      <img {...imageProps} />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {hasError && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          No Image
        </div>
      )}
    </div>
  );
};

export default Image;