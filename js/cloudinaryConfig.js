// Cloudinary configuration for image uploads

// Cloudinary credentials - replace with your own in production
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = 'your-upload-preset';
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Uploads an image to Cloudinary
 * @param {string} dataUrl - The data URL of the image to upload
 * @param {string} folder - The folder to upload the image to
 * @param {string|null} publicId - Optional public ID for the image
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImageToCloudinary = async (dataUrl, folder, publicId = null) => {
  console.log('Starting Cloudinary upload process...');
  
  try {
    // Convert data URL to blob
    const blob = await fetch(dataUrl).then(res => res.blob());
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    if (folder) {
      formData.append('folder', folder);
    }
    
    if (publicId) {
      formData.append('public_id', publicId);
    }
    
    console.log('Sending request to Cloudinary API...');
    
    // Upload to Cloudinary
    const response = await fetch(CLOUDINARY_API_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload failed:', errorData);
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('Cloudinary upload successful:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

/**
 * Gets a transformed version of a Cloudinary image URL
 * @param {string} imageUrl - The original Cloudinary image URL
 * @param {Object} transformations - The transformations to apply
 * @returns {string} - The transformed image URL
 */
export const getTransformedImageUrl = (imageUrl, transformations = {}) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }
  
  // Default transformations
  const defaultTransformations = {
    quality: 'auto',
    fetch_format: 'auto'
  };
  
  // Merge default and custom transformations
  const mergedTransformations = { ...defaultTransformations, ...transformations };
  
  // Build transformation string
  const transformationString = Object.entries(mergedTransformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  // Insert transformation into URL
  const urlParts = imageUrl.split('/upload/');
  return `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
};

export default {
  uploadImageToCloudinary,
  getTransformedImageUrl
};