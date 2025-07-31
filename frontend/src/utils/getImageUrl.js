import { BASE_URL } from "./apiPaths";

// utils/getImageUrl.js
export const getImageUrl = (imgPath) => {
  if (!imgPath) return "";

  const fixed = imgPath.startsWith("/uploads/")
    ? imgPath
    : `/uploads/${imgPath}`;

  return `${BASE_URL}${fixed}`;
};
