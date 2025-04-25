import { useRef } from 'react'
import './ResultPreview.css'

function ResultPreview({ html }) {
  const textareaRef = useRef(null)

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = 'template-with-base64.html'
    document.body.appendChild(a)
    a.click()
    
    // Cleanup
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand('copy')
    }
  }

  return (
    <div className="result-preview">
      <h2>Result HTML</h2>
      
      <div className="buttons">
        <button onClick={handleDownload}>Download HTML</button>
        <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      </div>
      
      <textarea 
        ref={textareaRef}
        readOnly 
        value={html}
        rows={10}
      />
      
      <div className="preview-render">
        <h3>Rendered Preview:</h3>
        <iframe 
          srcDoc={html}
          title="Preview" 
          width="100%" 
          height="300px"
        />
      </div>
    </div>
  )
}

export default ResultPreview
