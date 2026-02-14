// Image fallback handler for Northern Pakistan Tourism website
document.addEventListener('DOMContentLoaded', function() {
    // Load image configuration
    fetch('image-config.json')
        .then(response => response.json())
        .then(config => {
            window.imageConfig = config;
            
            // Set up image error handlers
            setupImageFallbacks();
        })
        .catch(error => {
            console.warn('Image configuration not found, using default fallbacks:', error);
            // Use default fallbacks if config file is not available
            setupImageFallbacks();
        });
});

function setupImageFallbacks() {
    // Handle all images on the page
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function(e) {
            const originalSrc = this.src;
            console.log(`Image failed to load: ${originalSrc}`);
            
            // Try to find a fallback based on the image path
            const fallbackSrc = getFallbackImage(originalSrc);
            if (fallbackSrc && fallbackSrc !== originalSrc) {
                this.src = fallbackSrc;
                console.log(`Loaded fallback image: ${fallbackSrc}`);
            }
        });
    });
}

function getFallbackImage(originalSrc) {
    // If we have the image config loaded, use it to find appropriate fallbacks
    if (window.imageConfig) {
        // Check featured destinations
        for (const dest of window.imageConfig.imagePaths.featuredDestinations) {
            if (originalSrc.includes(dest.path)) {
                return dest.fallback;
            }
        }
        
        // Check country section
        if (originalSrc.includes(window.imageConfig.imagePaths.countrySection.mainImage.path)) {
            return window.imageConfig.imagePaths.countrySection.mainImage.fallback;
        }
    }
    
    // Generic fallbacks based on keywords in the image path
    if (originalSrc.includes('Karakoram') || originalSrc.includes('mountain') || originalSrc.includes('peak')) {
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    } else if (originalSrc.includes('valley') || originalSrc.includes('Hunza')) {
        return 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    } else if (originalSrc.includes('mosque') || originalSrc.includes('Badshahi')) {
        return 'https://images.unsplash.com/photo-1563752689422-827e0d1bc9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    } else if (originalSrc.includes('fort') || originalSrc.includes('Lahore')) {
        return 'https://images.unsplash.com/photo-1563752689422-827e0d1bc9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    } else if (originalSrc.includes('city') || originalSrc.includes('karachi') || originalSrc.includes('lahore')) {
        return 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    } else if (originalSrc.includes('country') || originalSrc.includes('landscape') || originalSrc.includes('pakistan')) {
        return 'https://images.unsplash.com/photo-1546182862-81c7-79d5fa3c5c83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
    }
    
    // General fallback
    return 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
}

// Function to preload images to improve loading performance
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload commonly used fallback images
const commonFallbacks = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1563752689422-827e0d1bc9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1546182862-81c7-79d5fa3c5c83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
];

preloadImages(commonFallbacks);