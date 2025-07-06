# SVG Creator from Image

Convert images to SVG directly in your browser. Upload, drag-and-drop, or paste an image to generate an optimized SVG without using any server. Fully client-side and deployable via GitHub Pages.

## ✨ Features

- **🖼️ Image Upload**: Drag & drop, click to browse, or paste images (no double prompting)
- **🎨 SVG Conversion**: Convert PNG, JPG, JPEG, GIF, WebP to SVG with optimized performance
- **👀 Live Preview**: View SVG result with zoom, pan, and smart scrollbars
- **💾 Download**: Save SVG files directly to your device
- **📋 Copy Code**: Copy SVG markup to clipboard
- **🌙 Dark Mode**: Fast-switching dark mode with manual toggle (far right position)
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **⚡ PWA Ready**: Install as a web app for offline use
- **🔒 Privacy**: All processing happens in your browser - no data sent to servers
- **🎯 Smart UI**: Professional scrollable containers with custom styling
- **⚡ Performance**: Optimized conversion system prevents browser hanging

## 🚀 Live Demo

Visit the live application: [SVG Creator from Image](https://jajera.github.io/image-to-svg-webapp/)

## 🛠️ Usage

1. **Upload Image**: Drag and drop an image file or click "Choose File"
2. **Wait for Processing**: The app will convert your image to SVG efficiently
3. **Preview Results**: View the SVG in three tabs:
   - **SVG Preview**: See the converted SVG with smart scrolling
   - **Original**: Compare with the original image
   - **SVG Code**: View and copy the SVG markup
4. **Download**: Click "Download SVG" to save the file
5. **Start Over**: Click "New Image" to convert another image

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + O`: Open file dialog
- `Ctrl/Cmd + V`: Paste image from clipboard
- `Ctrl/Cmd + S`: Download SVG (when available)
- `Ctrl/Cmd + N`: Start with new image
- `←/→ Arrow Keys`: Switch between preview tabs

## 🎯 Supported Formats

- **Input**: PNG, JPG, JPEG, GIF, WebP
- **Output**: SVG (Scalable Vector Graphics)
- **Max File Size**: 10MB
- **Optimal Size**: Images under 1000px for best performance

## 🏗️ Technical Details

### Architecture

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Custom Properties for theming
- **Image Processing**: HTML5 Canvas API with optimized algorithms
- **SVG Generation**: Streamlined ImageTracer-based vectorization
- **PWA**: Service Worker for offline functionality

### Recent Performance Improvements

- **Simplified Conversion**: Single optimized strategy instead of complex multi-pass system
- **Non-blocking Processing**: Prevents browser hanging during conversion
- **Smart Image Sizing**: Automatic resizing for optimal performance
- **Fast UI**: Reduced transition times (0.1-0.2s) for responsive dark mode
- **Memory Efficient**: Removed resource-intensive preprocessing

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance

- Client-side processing (no server required)
- Optimized image resizing (max 1000px)
- Asynchronous processing with progress indicators
- Memory-efficient canvas operations
- Non-blocking UI updates

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/docs`
3. **Your app will be available at**: `https://yourusername.github.io/image-to-svg-webapp/`

### Manual Deployment

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jajera/image-to-svg-webapp.git
   cd image-to-svg-webapp
   ```

2. **Deploy the docs folder**:
   - Upload the contents of the `docs/` folder to your web server
   - Or point your hosting service to the `docs/` directory

3. **Serve locally** (for testing):

   ```bash
   # Using Python 3 (from docs folder)
   cd docs
   python -m http.server 8000

   # Using Node.js (from docs folder)
   cd docs
   npx serve .

   # Using PHP (from docs folder)
   cd docs
   php -S localhost:8000
   ```

4. **Upload to any static hosting service**:
   - Netlify: Deploy the `docs/` folder
   - Vercel: Deploy the `docs/` folder
   - Firebase Hosting: Deploy the `docs/` folder
   - AWS S3 + CloudFront: Upload contents of `docs/` folder

## 🔧 Development

### Project Structure

```plaintext
image-to-svg-webapp/
├── docs/                # Static web page files (deploy this folder)
│   ├── index.html       # Main HTML file
│   ├── styles.css       # CSS styles with dark mode
│   ├── app.js           # Main JavaScript application
│   ├── sw.js            # Service Worker for PWA
│   ├── manifest.json    # Web App Manifest
│   └── imagetracer.js   # SVG conversion library
├── README.md            # This file
├── DEPLOYMENT.md        # Deployment guide
├── package.json         # Project metadata
└── LICENSE              # License file
```

### Local Development

1. Clone the repository
2. Navigate to the `docs/` folder
3. Open `index.html` in a web browser
4. Or serve with a local server for PWA features

### Customization

- **Colors**: Modify CSS custom properties in `styles.css`
- **File Size Limits**: Update the validation in `app.js`
- **SVG Algorithm**: Enhance the `convertToSVG()` function
- **PWA Settings**: Update `manifest.json` and `sw.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

- Follow existing code style
- Test on multiple browsers
- Ensure responsive design works
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for client-side image processing
- Uses HTML5 Canvas for image manipulation
- PWA features for enhanced user experience
- ImageTracer library for efficient SVG conversion

## 🔮 Recent Updates & Future Enhancements

### ✅ Recently Completed

- [x] Fixed double prompting issue on file upload
- [x] Added professional scrollbars for image containers
- [x] Improved dark mode responsiveness (0.1-0.2s transitions)
- [x] Enhanced GitHub button with text and repositioning
- [x] Optimized SVG conversion performance
- [x] Simplified conversion algorithm for better browser compatibility

### 🔄 Future Enhancements

- [ ] Batch processing of multiple images
- [ ] Advanced SVG optimization options
- [ ] Support for more input formats
- [ ] Custom SVG export settings
- [ ] Integration with design tools
- [ ] Real-time parameter adjustment

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/jajera/image-to-svg-webapp/issues) page
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

---

## **Made with ❤️ for the web community**
