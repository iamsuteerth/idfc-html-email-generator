import { useState } from 'react'
import './ImageUploader.css'

function ImageUploader({ onImageEncoded }) {
  const [previewUrl, setPreviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    
    if (!file) {
      return
    }
    
    if (!file.type.match('image.*')) {
      setError('Please select an image file')
      return
    }
    
    setError('')
    setIsLoading(true)
    
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const base64String = event.target.result
      setPreviewUrl(base64String)
      onImageEncoded(base64String)
      setIsLoading(false)
    }
    
    reader.onerror = () => {
      setError('Error reading the image file')
      setIsLoading(false)
    }
    
    reader.readAsDataURL(file)
  }

  return (
    <div className="image-uploader">
      <h2>Upload Image</h2>
      
      <input 
        type="file" 
        accept="image/*"
        onChange={handleImageUpload}
      />
      
      {error && <div className="error">{error}</div>}
      
      {isLoading && <div className="loading">Loading...</div>}
      
      {previewUrl && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={previewUrl} alt="Preview" />
          <div className="base64-preview">
            <h4>Base64 String (truncated):</h4>
            <div className="base64-text">{previewUrl.substring(0, 50)}...</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
