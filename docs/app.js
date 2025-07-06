// SVG Creator from Image - Main Application
class SVGCreator {
    constructor() {
        this.currentImage = null;
        this.svgResult = null;
        this.isProcessing = false;

        this.initializeElements();
        this.setupEventListeners();
        this.initializeTheme();
    }

    initializeElements() {
        // Main sections
        this.uploadSection = document.getElementById('upload-section');
        this.processingSection = document.getElementById('processing-section');
        this.resultsSection = document.getElementById('results-section');
        this.errorSection = document.getElementById('error-section');

        // Upload elements
        this.uploadArea = document.getElementById('upload-area');
        this.fileInput = document.getElementById('file-input');

        // Results elements
        this.svgContainer = document.getElementById('svg-container');
        this.originalImage = document.getElementById('original-image');
        this.svgCodeContent = document.getElementById('svg-code-content');

        // Buttons
        this.downloadBtn = document.getElementById('download-btn');
        this.newImageBtn = document.getElementById('new-image-btn');
        this.copyCodeBtn = document.getElementById('copy-code-btn');
        this.themeToggle = document.getElementById('theme-toggle');
        this.uploadBtn = document.getElementById('upload-btn');

        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
    }

    setupEventListeners() {
        // File input
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
                this.uploadArea.addEventListener('click', (e) => {
            // Only trigger file input if clicking on the upload area itself, not child elements
            if (e.target === this.uploadArea || e.target.closest('.upload-content')) {
                this.fileInput.click();
            }
        });

        // Buttons
        this.downloadBtn.addEventListener('click', () => this.downloadSVG());
        this.newImageBtn.addEventListener('click', () => this.resetApp());
        this.copyCodeBtn.addEventListener('click', () => this.copySVGCode());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.uploadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to upload area
            this.fileInput.click();
        });

        // Tab switching
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Clipboard paste support
        document.addEventListener('paste', (e) => this.handlePaste(e));
    }

    initializeTheme() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme(systemPrefersDark ? 'dark' : 'light');
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update theme toggle icon
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(event) {
        event.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(event) {
        event.preventDefault();
        this.uploadArea.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    async processFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file.');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('File size must be less than 10MB.');
            return;
        }

        try {
            this.showProcessing('Loading image...');
            this.currentImage = await this.loadImage(file);

            this.showProcessing('Converting to SVG...');
            const svg = await this.convertToSVG(this.currentImage);

            this.showResults(svg);
        } catch (error) {
            console.error('Error processing file:', error);
            this.showError('Failed to process image. Please try again.');
        }
    }

    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }

    async convertToSVG(image) {
        // Create canvas for image processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Optimized size for better performance
        const maxSize = 1000; // Reduced for better performance
        let { width, height } = image;

        if (width > maxSize || height > maxSize) {
            const ratio = Math.min(maxSize / width, maxSize / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas with standard settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, 0, 0, width, height);

        // Get image data for processing
        const imageData = ctx.getImageData(0, 0, width, height);

        // Convert to SVG using optimized algorithm
        return await this.imageDataToSVG(imageData, width, height);
    }



        async imageDataToSVG(imageData, width, height) {
        try {
            // Single optimized strategy for best performance and quality
            const options = {
                // High quality settings optimized for performance
                ltres: 0.15,        // Good line precision without being excessive
                qtres: 0.15,        // Good curve precision
                pathomit: 3,        // Balanced detail retention
                colorsampling: 0,   // Exact colors
                numberofcolors: 32, // Good color range without overprocessing
                mincolorratio: 0.005, // Keep meaningful details
                colorquantcycles: 4, // Balanced color separation

                // SVG rendering options
                scale: 1,
                roundcoords: 2,     // Clean coordinates
                viewbox: 1,
                desc: 0,
                lcpr: 0,
                qcpr: 0,
                strokewidth: 0,

                // Optimized for speed and quality
                blurradius: 0,      // No preprocessing blur for sharpness
                blurdelta: 0,
                rightangleenhance: true,
                linefilter: false
            };

            // Non-blocking conversion using setTimeout to prevent hanging
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        // Convert using ImageTracer.js
                        const svgString = ImageTracer.imagedataToSVG(imageData, options);

                        // Parse the SVG string to return an SVG element
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
                        const svgElement = svgDoc.documentElement;

                        // Lightweight post-processing
                        this.optimizeSVG(svgElement, width, height);

                        resolve(svgElement);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });

        } catch (error) {
            console.error('ImageTracer failed:', error);
            // Fallback to basic algorithm
            return this.createAdvancedDiagramSVG(imageData, width, height);
        }
    }



    // New method to optimize the generated SVG
    optimizeSVG(svgElement, width, height) {
        // Set proper dimensions and viewbox
        svgElement.setAttribute('width', width);
        svgElement.setAttribute('height', height);
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Remove unnecessary attributes
        svgElement.removeAttribute('desc');

        // Optimize paths by removing redundant points and merging similar colors
        const paths = svgElement.querySelectorAll('path');
        const colorGroups = new Map();

        paths.forEach(path => {
            const fill = path.getAttribute('fill');
            const stroke = path.getAttribute('stroke');

            // Group paths by color
            const colorKey = `${fill}-${stroke}`;
            if (!colorGroups.has(colorKey)) {
                colorGroups.set(colorKey, []);
            }
            colorGroups.get(colorKey).push(path);

            // Clean up path attributes
            path.removeAttribute('stroke');
            path.removeAttribute('stroke-width');
            path.removeAttribute('opacity');
        });

        // Merge similar colors (within tolerance)
        this.mergeSimilarColors(colorGroups, svgElement);
    }

    // Method to merge similar colors
    mergeSimilarColors(colorGroups, svgElement) {
        const colorTolerance = 20; // RGB tolerance for color similarity
        const mergedGroups = new Map();

        for (const [colorKey, paths] of colorGroups) {
            const [fill] = colorKey.split('-');
            const rgb = this.parseRGBColor(fill);

            if (!rgb) continue;

            // Find similar color group
            let merged = false;
            for (const [mergedKey, mergedPaths] of mergedGroups) {
                const mergedRGB = this.parseRGBColor(mergedKey);
                if (mergedRGB && this.colorDistanceRGB(rgb, mergedRGB) < colorTolerance) {
                    // Merge with existing group
                    mergedPaths.push(...paths);
                    merged = true;
                    break;
                }
            }

            if (!merged) {
                // Create new group
                mergedGroups.set(fill, [...paths]);
            }
        }

        // Apply merged colors
        for (const [color, paths] of mergedGroups) {
            paths.forEach(path => {
                path.setAttribute('fill', color);
            });
        }
    }

    // Parse RGB color string
    parseRGBColor(colorStr) {
        const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return null;
    }

    // Calculate color distance between RGB objects
    colorDistanceRGB(color1, color2) {
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2)
        );
    }

    createFallbackSVG(imageData, width, height) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('xmlns', svgNS);

        // Simple fallback - create a basic representation
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', 'white');
        svg.appendChild(rect);

        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', width / 2);
        text.setAttribute('y', height / 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '16');
        text.setAttribute('fill', 'black');
        text.textContent = 'Conversion failed - try a different image';
        svg.appendChild(text);

        return svg;
    }

    createAdvancedDiagramSVG(imageData, width, height) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        const data = imageData.data;

        // Set proper SVG dimensions and viewBox
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('xmlns', svgNS);

        // Step 1: Detect background color
        const backgroundColor = this.detectBackgroundColor(data, width, height);

        // Step 2: Create color map with better quantization
        const colorMap = this.createAdvancedColorMap(data, width, height, backgroundColor);

        // Step 3: Process each color group
        colorMap.forEach((group, color) => {
            if (group.pixels.length < 5) return; // Skip tiny groups

            // Step 4: Create optimized shapes for each color
            const shapes = this.createOptimizedShapes(group.pixels, width, height, color);
            shapes.forEach(shape => svg.appendChild(shape));
        });

        return svg;
    }

    detectBackgroundColor(data, width, height) {
        const colorCount = new Map();
        const sampleSize = Math.min(1000, width * height);
        const step = Math.floor((width * height) / sampleSize);

        for (let i = 0; i < data.length; i += step * 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a > 200) { // Only consider opaque pixels
                const color = `${r},${g},${b}`;
                colorCount.set(color, (colorCount.get(color) || 0) + 1);
            }
        }

        // Find most common color (likely background)
        let maxCount = 0;
        let bgColor = '255,255,255'; // Default white

        for (const [color, count] of colorCount) {
            if (count > maxCount) {
                maxCount = count;
                bgColor = color;
            }
        }

        return bgColor;
    }

    createAdvancedColorMap(data, width, height, backgroundColor) {
        const colorMap = new Map();
        const tolerance = 15; // Reduced tolerance for better color separation

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                if (a > 200) { // Only process opaque pixels
                    const currentColor = `${r},${g},${b}`;

                    // Skip background color
                    if (this.colorDistanceString(currentColor, backgroundColor) < 30) {
                        continue;
                    }

                    // Quantize color
                    const quantizedColor = this.quantizeColorAdvanced(r, g, b, tolerance);
                    const colorKey = `${quantizedColor.r},${quantizedColor.g},${quantizedColor.b}`;

                    if (!colorMap.has(colorKey)) {
                        colorMap.set(colorKey, {
                            color: `rgb(${quantizedColor.r}, ${quantizedColor.g}, ${quantizedColor.b})`,
                            pixels: []
                        });
                    }

                    colorMap.get(colorKey).pixels.push([x, y]);
                }
            }
        }

        return colorMap;
    }

    colorDistanceString(color1, color2) {
        const [r1, g1, b1] = color1.split(',').map(Number);
        const [r2, g2, b2] = color2.split(',').map(Number);
        return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
    }

    quantizeColorAdvanced(r, g, b, tolerance) {
        // Better quantization that preserves important colors
        const quantize = (value, step) => {
            return Math.round(value / step) * step;
        };

        return {
            r: Math.min(255, Math.max(0, quantize(r, tolerance))),
            g: Math.min(255, Math.max(0, quantize(g, tolerance))),
            b: Math.min(255, Math.max(0, quantize(b, tolerance)))
        };
    }

    createOptimizedShapes(pixels, width, height, color) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const shapes = [];

        // Group pixels into connected components
        const components = this.findConnectedComponents(pixels, width, height);

        components.forEach(component => {
            if (component.length < 3) return;

            // Try to detect rectangles first (common in diagrams)
            const rect = this.detectRectangle(component);
            if (rect && rect.coverage > 0.7) {
                const rectElement = document.createElementNS(svgNS, 'rect');
                rectElement.setAttribute('x', rect.x);
                rectElement.setAttribute('y', rect.y);
                rectElement.setAttribute('width', rect.width);
                rectElement.setAttribute('height', rect.height);
                rectElement.setAttribute('fill', color);
                shapes.push(rectElement);
            } else {
                // Create optimized path for complex shapes
                const path = this.createOptimizedPath(component);
                if (path) {
                    const pathElement = document.createElementNS(svgNS, 'path');
                    pathElement.setAttribute('d', path);
                    pathElement.setAttribute('fill', color);
                    pathElement.setAttribute('stroke', 'none');
                    shapes.push(pathElement);
                }
            }
        });

        return shapes;
    }

    findConnectedComponents(pixels, width, height) {
        const pixelSet = new Set(pixels.map(p => `${p[0]},${p[1]}`));
        const visited = new Set();
        const components = [];

        for (const pixel of pixels) {
            const key = `${pixel[0]},${pixel[1]}`;
            if (!visited.has(key)) {
                const component = [];
                this.dfsComponent(pixel[0], pixel[1], pixelSet, visited, component);
                if (component.length > 0) {
                    components.push(component);
                }
            }
        }

        return components;
    }

    dfsComponent(x, y, pixelSet, visited, component) {
        const key = `${x},${y}`;
        if (visited.has(key) || !pixelSet.has(key)) return;

        visited.add(key);
        component.push([x, y]);

        // Check 8-connected neighbors
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dx, dy] of directions) {
            this.dfsComponent(x + dx, y + dy, pixelSet, visited, component);
        }
    }

    detectRectangle(component) {
        if (component.length < 4) return null;

        const xs = component.map(p => p[0]);
        const ys = component.map(p => p[1]);

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const expectedPixels = width * height;
        const actualPixels = component.length;
        const coverage = actualPixels / expectedPixels;

        return {
            x: minX,
            y: minY,
            width: width,
            height: height,
            coverage: coverage
        };
    }

    createOptimizedPath(component) {
        if (component.length === 0) return null;

        // Sort points to create a better path
        const hull = this.convexHull(component);
        if (hull.length < 3) return null;

        let path = `M ${hull[0][0]} ${hull[0][1]}`;
        for (let i = 1; i < hull.length; i++) {
            path += ` L ${hull[i][0]} ${hull[i][1]}`;
        }
        path += ' Z';

        return path;
    }

    convexHull(points) {
        // Simple convex hull algorithm (Graham scan)
        if (points.length < 3) return points;

        // Find the bottom-most point
        let start = points[0];
        for (const point of points) {
            if (point[1] < start[1] || (point[1] === start[1] && point[0] < start[0])) {
                start = point;
            }
        }

        // Sort points by polar angle with respect to start point
        const sorted = points.filter(p => p !== start).sort((a, b) => {
            const angleA = Math.atan2(a[1] - start[1], a[0] - start[0]);
            const angleB = Math.atan2(b[1] - start[1], b[0] - start[0]);
            return angleA - angleB;
        });

        const hull = [start];
        for (const point of sorted) {
            while (hull.length > 1 && this.ccw(hull[hull.length-2], hull[hull.length-1], point) <= 0) {
                hull.pop();
            }
            hull.push(point);
        }

        return hull;
    }

    ccw(A, B, C) {
        return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0]);
    }

        // Old methods removed - using new advanced algorithm

        // Old helper methods removed - using new advanced algorithm

    showProcessing(message = 'Converting to SVG...') {
        this.isProcessing = true;
        this.uploadSection.style.display = 'none';
        this.processingSection.style.display = 'block';
        this.resultsSection.style.display = 'none';
        this.errorSection.style.display = 'none';

        // Update processing message
        const processingH3 = this.processingSection.querySelector('h3');
        if (processingH3) {
            processingH3.textContent = message;
        }
    }

    showResults(svg) {
        this.isProcessing = false;
        this.svgResult = svg;

        // Display original image
        this.originalImage.src = this.currentImage.src;
        this.updateImageContainerSize(this.originalImage, this.originalImage.parentElement.parentElement);

        // Display SVG
        this.svgContainer.innerHTML = '';
        this.svgContainer.appendChild(svg.cloneNode(true));
        this.updateImageContainerSize(svg, this.svgContainer);

        // Display SVG code
        const svgString = new XMLSerializer().serializeToString(svg);
        this.svgCodeContent.querySelector('code').textContent = svgString;

        // Show results
        this.uploadSection.style.display = 'none';
        this.processingSection.style.display = 'none';
        this.resultsSection.style.display = 'block';
        this.errorSection.style.display = 'none';

        // Switch to SVG preview tab
        this.switchTab('svg-preview');
    }

    // Helper method to handle image sizing and centering
    updateImageContainerSize(element, container) {
        // Wait for element to load if it's an image
        const updateContainer = () => {
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width - 32; // Account for padding
            const containerHeight = containerRect.height - 32;

            let elementWidth, elementHeight;

            if (element.tagName === 'IMG') {
                elementWidth = element.naturalWidth || element.width;
                elementHeight = element.naturalHeight || element.height;
            } else if (element.tagName === 'svg') {
                const viewBox = element.getAttribute('viewBox');
                if (viewBox) {
                    const [, , width, height] = viewBox.split(' ').map(Number);
                    elementWidth = width;
                    elementHeight = height;
                } else {
                    elementWidth = parseInt(element.getAttribute('width')) || 300;
                    elementHeight = parseInt(element.getAttribute('height')) || 200;
                }
            }

            // If content is smaller than container, center it
            if (elementWidth <= containerWidth && elementHeight <= containerHeight) {
                container.classList.add('centered');
            } else {
                container.classList.remove('centered');
            }
        };

        if (element.tagName === 'IMG') {
            if (element.complete) {
                updateContainer();
            } else {
                element.onload = updateContainer;
            }
        } else {
            // For SVG, update immediately
            setTimeout(updateContainer, 0);
        }
    }

    showError(message) {
        this.isProcessing = false;
        document.getElementById('error-message').textContent = message;

        this.uploadSection.style.display = 'none';
        this.processingSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.errorSection.style.display = 'block';
    }

    resetApp() {
        this.currentImage = null;
        this.svgResult = null;
        this.isProcessing = false;

        // Reset file input
        this.fileInput.value = '';

        // Show upload section
        this.uploadSection.style.display = 'block';
        this.processingSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.errorSection.style.display = 'none';

        // Clear containers
        this.svgContainer.innerHTML = '';
        this.originalImage.src = '';
        this.svgCodeContent.querySelector('code').textContent = '';
    }

    downloadSVG() {
        if (!this.svgResult) return;

        const svgString = new XMLSerializer().serializeToString(this.svgResult);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-image.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async copySVGCode() {
        if (!this.svgResult) return;

        const svgString = new XMLSerializer().serializeToString(this.svgResult);

        try {
            await navigator.clipboard.writeText(svgString);
            this.showCopySuccess();
        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(svgString);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (error) {
            console.error('Fallback copy failed:', error);
        }

        document.body.removeChild(textArea);
    }

    showCopySuccess() {
        const originalText = this.copyCodeBtn.innerHTML;
        this.copyCodeBtn.innerHTML = '<span class="copy-icon">✅</span>Copied!';
        this.copyCodeBtn.style.backgroundColor = 'var(--success-color)';

        setTimeout(() => {
            this.copyCodeBtn.innerHTML = originalText;
            this.copyCodeBtn.style.backgroundColor = '';
        }, 2000);
    }

    switchTab(tabName) {
        // Update tab buttons
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab panes
        this.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabName);
        });
    }

    handleKeyboard(event) {
        // Keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'o':
                    event.preventDefault();
                    this.fileInput.click();
                    break;
                case 's':
                    if (this.svgResult) {
                        event.preventDefault();
                        this.downloadSVG();
                    }
                    break;
                case 'n':
                    event.preventDefault();
                    this.resetApp();
                    break;
            }
        }

        // Tab switching with arrow keys
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-btn.active');
            const tabs = Array.from(this.tabButtons);
            const currentIndex = tabs.indexOf(activeTab);

            let newIndex;
            if (event.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }

            this.switchTab(tabs[newIndex].dataset.tab);
        }
    }

    handlePaste(event) {
        if (event.clipboardData && event.clipboardData.items) {
            for (let i = 0; i < event.clipboardData.items.length; i++) {
                const item = event.clipboardData.items[i];
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    if (file) {
                        this.processFile(file);
                        event.preventDefault();
                        return;
                    }
                }
            }
        }
        // Optionally, show a message if no image is found
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.svgCreator = new SVGCreator();
});

// Global function for error reset (called from HTML)
function resetApp() {
    if (window.svgCreator) {
        window.svgCreator.resetApp();
    }
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
