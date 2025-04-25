# 📄 Base64 Image Injector SPA – Documentation

## Overview

The Base64 Image Injector is a minimal, Single Page Application (SPA) built with **React** and **Vite**. It allows users to:
- Select or upload an HTML template.
- Upload an image (converted to a Base64 string).
- Inject the Base64 image into a specified `` tag in the template.
- Preview and download the resulting HTML file.

---

## Installation & Local Development

1. **Clone the repository**
    ```bash
    git clone  base64-image-injector
    cd base64-image-injector
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start development server**
    ```bash
    npm run dev
    ```
    - Visit [http://localhost:5173](http://localhost:5173)

---

## Usage Guide

1. **Select a Template**  
    - Use the sidebar to pick a built-in template (e.g. "Bank Registration Email") or upload a custom HTML file.

2. **Upload Your Image**  
    - Upload an image (JPG, PNG, etc.). It is converted to a Base64 string.

3. **Inject and Preview**  
    - Click **Inject Image**.  
    - The app finds the `` in the template and sets its `src` to the Base64 string.
    - The result is shown as HTML (editable) and a live preview.

4. **Download Result**  
    - Download the modified HTML file or copy the HTML to your clipboard.

---

## Configuration

### Adding Predefined Templates

- **Location:**  
  Place HTML template files in `src/assets/templates/`.

- **Example:**  
  `src/assets/templates/email_image.html.template`  
  (see included sample)

- **Register your template in `TemplateSelector.jsx`:**
    ```js
    import emailImageTemplate from '../assets/templates/email_image.html.template?raw'

    const PREDEFINED_TEMPLATES = {
      email_image: emailImageTemplate,
      // add more here
    }
    ```

- **Add to the dropdown** in the JSX
### Template Requirements

- Your template **must contain** at least one `` tag with `id="to-be-replaced"`
- The app will automatically inject the Base64 string into the `src` attribute.

---

## Styling

- CSS is modular: each component has its own `.css` file.
- Uses modern, clean design and color contrast for usability.
- Global styles are in `index.css` and `App.css`.  
- You can further customize theme variables in `index.css`.

---

## Error Handling

- Alerts and error banners for missing template or image.
- Invalid file types are rejected on upload.
- If the template doesn't contain a valid ``, an error is shown.
- Basic file reader errors are handled.

---

# Example Usage

1. Open the app in your browser.
2. Select **Bank Registration Email** from the template dropdown.
3. Upload a PNG or JPEG image.
4. Click **Inject Image**.
5. Preview the result, then **download** or **copy** the HTML.

---

# Troubleshooting

- **Nothing happens when I inject:**  
  Ensure your template file has ``.
- **Image not showing:**  
  Make sure the image you upload is a supported format and not too large.

