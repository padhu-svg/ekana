import { useState } from 'react';
import { Upload, X, Link as LinkIcon } from 'lucide-react';

const ImageUpload = ({ value, onChange, label = "Image" }) => {
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'upload'
  const [imageUrl, setImageUrl] = useState(value || '');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    onChange(url);
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setImageUrl(dataUrl);
        onChange({ file, preview: dataUrl }); // Pass both file and preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const clearImage = () => {
    setImageUrl('');
    setSelectedFile(null);
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {/* Method Toggle */}
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            uploadMethod === 'url' 
              ? 'bg-green-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <LinkIcon className="h-4 w-4" />
          <span>Image URL</span>
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('upload')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            uploadMethod === 'upload' 
              ? 'bg-green-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* URL Input */}
      {uploadMethod === 'url' && (
        <div className="mb-4">
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      )}

      {/* File Upload */}
      {uploadMethod === 'upload' && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
          <label className="inline-block bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-800 transition-colors">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          {selectedFile && (
            <p className="text-sm text-green-600 mt-2">File selected: {selectedFile.name}</p>
          )}
        </div>
      )}

      {/* Image Preview */}
      {imageUrl && (
        <div className="mt-4 relative">
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-32 w-48 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;