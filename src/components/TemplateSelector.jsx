import { useState } from 'react'
import emailImageTemplate from '../assets/templates/email_image.html.template?raw'
import emailSpeakerTemplate from '../assets/templates/email_speakers_interactive.html.template?raw'
import './TemplateSelector.css'

const PREDEFINED_TEMPLATES = {
  email_image: emailImageTemplate,
  email_speakers: emailSpeakerTemplate,
}

function TemplateSelector({ onTemplateSelect }) {
  const [selectedPreset, setSelectedPreset] = useState('')
  const [customTemplate, setCustomTemplate] = useState('')

  const handlePresetChange = (e) => {
    const templateKey = e.target.value
    setSelectedPreset(templateKey)
    if (templateKey) {
      onTemplateSelect(PREDEFINED_TEMPLATES[templateKey])
      setCustomTemplate('')
    } else {
      onTemplateSelect(null)
    }
  }

  const handleCustomFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedPreset('')
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target.result
      setCustomTemplate(content)
      onTemplateSelect(content)
    }
    reader.onerror = () => {
      alert('Error reading template file')
    }
    reader.readAsText(file)
  }

  return (
    <div className="template-selector">
      <h2>Select Template</h2>
      <div className="preset-templates">
        <label>Predefined Templates:</label>
        <select value={selectedPreset} onChange={handlePresetChange}>
          <option value="">-- Select a template --</option>
          <option value="email_image">Bank Registration Email</option>
          <option value="email_speakers">Speaker List Email</option>
        </select>
      </div>
      <div className="custom-template">
        <label>Or Upload Your Own:</label>
        <input 
          type="file" 
          accept=".html,.htm"
          onChange={handleCustomFileUpload}
        />
      </div>
      {(selectedPreset || customTemplate) && (
        <div className="template-preview">
          <h3>Template Preview:</h3>
          <pre>{selectedPreset ? PREDEFINED_TEMPLATES[selectedPreset] : customTemplate}</pre>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
