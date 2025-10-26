export const uploadImageToSupabase = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('https://e-ka-na-backend.vercel.app/api/v1/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.imageUrl;
    }
    throw new Error('Upload failed');
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};