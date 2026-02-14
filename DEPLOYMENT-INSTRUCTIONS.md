# Northern Pakistan Tourism - Deployment Instructions

## Important Files for Image Handling

To ensure all images display properly when you deploy your website, please upload ALL of the following files to your web server:

### Required Files:
1. `image-config.json` - Contains image path mappings and fallbacks
2. `image-handler.js` - JavaScript for handling image loading and fallbacks
3. Entire `image/` directory with all subdirectories and files:
   - `image/201/` - Featured destination images
   - `image/My Country - Pakistan/` - Country section image
   - Individual city images (karachi.jpg, lahore.png, etc.)

### Directory Structure:
Your server should maintain this exact structure:
```
your-domain.com/
├── index.html
├── karachi.html
├── lahore.html
├── ... (all city HTML files)
├── image-config.json
├── image-handler.js
├── script.js
├── styles.css
├── admin-data.js
├── ...
└── image/
    ├── 201/
    │   ├── Karakoram Mountains.jpg
    │   ├── Hunza Valley.jpg
    │   └── ... (other destination images)
    ├── My Country - Pakistan/
    │   └── 123.jpg
    ├── karachi.jpg
    ├── lahore.png
    └── ... (all other city images)
```

### For Each HTML Page:
Make sure each HTML file includes the image handler script before the closing `</body>` tag:
```html
<script src="image-handler.js"></script>
```

### Troubleshooting:
- If images still don't appear after deployment, check that the file paths in your HTML match the actual file locations on your server
- Ensure file permissions allow web access to image files
- Verify that filenames match exactly (case-sensitive on some servers)

### Note:
The image handler will attempt to load fallback images from Unsplash if your local images fail to load, ensuring users always see relevant imagery.