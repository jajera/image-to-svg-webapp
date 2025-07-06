# Deployment Guide - SVG Creator from Image

## 🚀 Quick Start

This guide will help you deploy the SVG Creator from Image web app to GitHub Pages or any static hosting service.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Basic knowledge of Git commands

## Step-by-Step Deployment

### 1. Fork the Repository

1. Go to [https://github.com/jajera/image-to-svg-webapp](https://github.com/jajera/image-to-svg-webapp)
2. Click the "Fork" button in the top-right corner
3. This creates a copy in your GitHub account

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/image-to-svg-webapp.git
cd image-to-svg-webapp
```

### 3. Enable GitHub Pages

1. Go to your forked repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (or click "Pages" in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" (or "master") branch
6. Select "/docs" folder
7. Click "Save"

### 4. Wait for Deployment

- GitHub Pages will automatically build and deploy your site
- This usually takes 2-5 minutes
- You'll see a green checkmark when deployment is complete

### 5. Access Your Site

Your site will be available at:

```plaintext
https://YOUR_USERNAME.github.io/image-to-svg-webapp/
```

## 🛠️ Local Development

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
├── README.md            # Project documentation
├── DEPLOYMENT.md        # This deployment guide
├── package.json         # Project metadata
└── LICENSE              # License file
```

### Running Locally

```bash
# Navigate to the docs folder first
cd docs

# Then use any of these methods:

# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Testing

1. Open the application in your browser
2. Try uploading different image formats (PNG, JPG, etc.)
3. Test the single-click upload (no double prompting)
4. Verify scrollable image containers work properly
5. Test the fast dark mode toggle (far right button)
6. Verify download functionality works
7. Test responsive design on mobile devices
8. Check performance with larger images (up to 1000px recommended)

## 🔧 Customization

### Changing Colors

Edit `styles.css` and modify the CSS custom properties:

```css
:root {
    --accent-color: #007bff;  /* Change this to your preferred color */
    --bg-primary: #ffffff;
    /* ... other colors */
}
```

### Updating App Name

1. Edit `index.html` - change the title
2. Edit `manifest.json` - update name and description
3. Edit `README.md` - update project information

### Performance Tuning

The app has been optimized for performance:

- **Image Size Limit**: Default max 1000px for optimal performance
- **Conversion Speed**: Streamlined single-strategy approach
- **UI Responsiveness**: Fast dark mode switching (0.1-0.2s)

To adjust these settings, modify `app.js`:

```javascript
// Adjust max image size
const MAX_IMAGE_SIZE = 1000; // Change this value

// Adjust transition speeds in styles.css
:root {
    --transition-speed: 0.1s; /* Adjust for UI responsiveness */
}
```

### Adding Features

The main application logic is in `docs/app.js`. Key areas to modify:

- `convertToSVG()` - Main conversion algorithm (simplified for performance)
- `setupEventListeners()` - UI event handlers
- `updateImageContainerSize()` - Smart container sizing logic

## 📱 PWA Features

The app includes Progressive Web App features:

- **Offline Support**: Service Worker caches resources
- **Installable**: Can be installed on mobile devices
- **App-like Experience**: Full-screen mode when installed
- **Performance**: Optimized for fast loading and smooth operation

### PWA Configuration

- `docs/manifest.json` - App metadata and icons
- `docs/sw.js` - Service Worker for caching
- PWA meta tags in `docs/index.html`

## 🔍 Troubleshooting

### Common Issues

1. **Page not loading**
   - Check if GitHub Pages is enabled
   - Verify the branch name is correct
   - Wait a few minutes for deployment

2. **Images not converting**
   - Check browser console for errors
   - Verify image format is supported
   - Ensure image size is reasonable (under 10MB, optimal under 1000px)
   - Try refreshing the page

3. **Double file dialog appearing**
   - This issue has been fixed in recent updates
   - Ensure you're using the latest version
   - Clear browser cache if still experiencing issues

4. **Dark mode not working or slow**
   - Recent updates improved dark mode speed to 0.1-0.2s
   - Check if CSS custom properties are supported
   - Verify JavaScript is loading properly

5. **Browser hanging during conversion**
   - This issue has been resolved with performance optimizations
   - Conversion now uses non-blocking processing
   - Try with smaller images if still experiencing issues

6. **Scrollbars not appearing**
   - Recent updates added smart scrollbars
   - Ensure CSS is loading properly
   - Check browser compatibility

### Debug Mode

Open browser developer tools and check:

- Console for JavaScript errors
- Network tab for failed requests
- Application tab for PWA status
- Performance tab for conversion speed

### Performance Issues

If experiencing slow performance:

1. **Check image size**: Recommend under 1000px for optimal speed
2. **Browser compatibility**: Use Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
3. **Memory usage**: Close other tabs during conversion
4. **Clear cache**: Refresh browser cache if issues persist

## 📊 Performance

### Optimization Features

1. **Streamlined Conversion**: Single-pass algorithm instead of multi-strategy approach
2. **Smart Sizing**: Automatic image resizing for optimal performance
3. **Non-blocking UI**: Conversion doesn't freeze the browser
4. **Memory Efficient**: Removed resource-intensive preprocessing
5. **Fast UI**: Reduced transition times for better responsiveness

### Browser Compatibility

- Chrome 60+ (Recommended)
- Firefox 55+
- Safari 12+
- Edge 79+

### Best Practices

- **Image Size**: Keep under 1000px for best performance
- **File Format**: PNG and JPG work best
- **Browser**: Use latest version for optimal experience
- **Memory**: Close unnecessary tabs during conversion

## 🔄 Updates

### Keeping Your Fork Updated

```bash
# Add the original repository as upstream
git remote add upstream https://github.com/jajera/image-to-svg-webapp.git

# Fetch updates
git fetch upstream

# Merge updates
git merge upstream/main

# Push to your fork
git push origin main
```

### Recent Updates

The app has received significant performance and UI improvements:

- ✅ Fixed double prompting on file upload
- ✅ Added professional scrollbars for image containers
- ✅ Improved dark mode responsiveness
- ✅ Enhanced GitHub button with text
- ✅ Optimized SVG conversion performance
- ✅ Simplified conversion algorithm

## 📞 Support

If you encounter issues:

1. Check the [main repository issues](https://github.com/jajera/image-to-svg-webapp/issues)
2. Create a new issue in your fork
3. Include browser version, image details, and error messages
4. Check the troubleshooting section above

## 🎉 Success

Once deployed, your SVG Creator from Image web app will be:

- ✅ Fully functional with no double prompting
- ✅ Mobile responsive with smart scrollbars
- ✅ PWA ready with offline support
- ✅ Fast dark mode switching
- ✅ Optimized performance (no browser hanging)
- ✅ No server required
- ✅ Privacy-focused (client-side processing)

Enjoy converting images to SVG directly in your browser with improved performance and user experience!

## 🚀 Alternative Deployment Options

### Netlify

1. Fork the repository
2. Connect your GitHub account to Netlify
3. Set publish directory to `docs`
4. Deploy directly from your repository
5. Automatic builds on every commit

### Vercel

1. Import project from GitHub
2. Set output directory to `docs`
3. Deploy with zero configuration
4. Automatic HTTPS and global CDN

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# When prompted, set public directory to 'docs'
firebase deploy
```

### Other Static Hosting Services

For any static hosting service:

1. **Upload Contents**: Upload all files from the `docs/` folder
2. **Set Index File**: Ensure `index.html` is set as the default file
3. **Configure HTTPS**: Most services provide automatic HTTPS
4. **Custom Domain**: Point your domain to the hosting service

**Note**: Always deploy the contents of the `docs/` folder, not the entire repository root.
