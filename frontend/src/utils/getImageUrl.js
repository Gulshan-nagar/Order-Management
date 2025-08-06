export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getImageUrl = (imgPath) => {
  console.log("🔗 getImageUrl: Input path:", imgPath);
  
  if (!imgPath) {
    console.log("❌ getImageUrl: No image path provided");
    return "";
  }

  let cleanPath = imgPath;
  
  // Handle absolute paths from backend uploads directory
  if (imgPath.includes('/opt/render/project/src/backend/uploads/')) {
    const filename = imgPath.split('/').pop();
    cleanPath = `/uploads/${filename}`;
    console.log("🔧 getImageUrl: Fixed absolute path, filename:", filename, "cleanPath:", cleanPath);
  }
  // Handle paths that already contain /uploads/
  else if (imgPath.includes("/uploads/")) {
    const uploadIndex = imgPath.lastIndexOf("/uploads/");
    cleanPath = imgPath.substring(uploadIndex);
    console.log("🔧 getImageUrl: Extracted path from /uploads/, cleanPath:", cleanPath);
  }
  // Handle relative paths that start with uploads/ (MOST COMMON CASE)
  else if (imgPath.startsWith("uploads/")) {
    cleanPath = `/${imgPath}`;
    console.log("🔧 getImageUrl: Added leading slash to relative path, cleanPath:", cleanPath);
  }
  // Handle paths that start with / but don't have uploads
  else if (imgPath.startsWith("/") && !imgPath.includes("uploads")) {
    cleanPath = `/uploads${imgPath}`;
    console.log("🔧 getImageUrl: Added uploads prefix to absolute path, cleanPath:", cleanPath);
  }
  // Handle bare filenames
  else if (!imgPath.startsWith("/")) {
    cleanPath = `/uploads/${imgPath}`;
    console.log("🔧 getImageUrl: Added uploads prefix to filename, cleanPath:", cleanPath);
  }
  // Keep as is if it already looks correct
  else {
    cleanPath = imgPath;
    console.log("🔧 getImageUrl: Path kept as is, cleanPath:", cleanPath);
  }

  const finalUrl = `${BASE_URL}${cleanPath}`;
  console.log("✅ getImageUrl: Final URL:", finalUrl);
  return finalUrl;
};

