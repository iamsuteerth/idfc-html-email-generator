import { useState } from 'react'
import './App.css'
import TemplateSelector from './components/TemplateSelector'
import ImageUploader from './components/ImageUploader'
import ResultPreview from './components/ResultPreview'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [base64Image, setBase64Image] = useState('')
  const [resultHTML, setResultHTML] = useState('')
  const [error, setError] = useState('')

  const processTemplate = () => {
    try {
      if (!selectedTemplate || !base64Image) throw new Error('Please select both a template and an image')
      const parser = new DOMParser()
      const doc = parser.parseFromString(selectedTemplate, 'text/html')
      const imgTags = doc.querySelectorAll('img#to-be-replaced, img[src=""], img:not([src])')
      if (imgTags.length === 0) throw new Error('No suitable <img> tag found in the template')
      imgTags[0].setAttribute('src', base64Image)
      const serializer = new XMLSerializer()
      setResultHTML(serializer.serializeToString(doc))
      setError('')
    } catch (err) {
      setError(err.message)
      setResultHTML('')
    }
  }

  return (
    <div className="app-bg">
      <div className="app-main">
        <aside className="app-sidebar">
          <TemplateSelector onTemplateSelect={setSelectedTemplate} />
        </aside>
        <main className="app-content">
          <h1>Base64 Image Injector</h1>
          <ImageUploader onImageEncoded={setBase64Image} />
          <button 
            className="process-btn" 
            onClick={processTemplate}
            disabled={!selectedTemplate || !base64Image}
          >
            Inject Image
          </button>
          {error && <div className="error-message">{error}</div>}
          {resultHTML && <ResultPreview html={resultHTML} />}
        </main>
      </div>
    </div>
  )
}
export default App
