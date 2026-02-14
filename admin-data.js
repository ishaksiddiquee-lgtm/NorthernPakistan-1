// Admin panel data storage and management functions

// Default website settings
let websiteSettings = {
    name: "Northern Pakistan Tourism",
    address: "www.northernpakistan.com",
    location: "Islamabad, Pakistan",
    info: "Discover the majestic beauty of Pakistan's northern regions with our curated travel experiences. Explore the breathtaking landscapes of Hunza, Swat, Murree, and Skardu."
};

// Default destination data
let destinations = {
    swat: {
        name: "Swat Valley",
        tagline: "The Switzerland of Pakistan",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mingora_swat_pakistan.jpg/800px-Mingora_swat_pakistan.jpg",
        places: [
            {
                id: "swat-kalam",
                name: "Kalam",
                description: "Jewel of Upper Swat - Beautiful landscapes and pristine nature",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mingora_swat_pakistan.jpg/800px-Mingora_swat_pakistan.jpg"
                ],
                videos: [],
                winterInfo: "Kalam experiences heavy snowfall from December to March. The valley transforms into a winter wonderland with snow-covered peaks and pine trees.",
                summerInfo: "Summer (May to September) is the peak tourist season in Kalam. The weather is pleasant with temperatures ranging from 15°C to 25°C."
            },
            {
                id: "swat-malam-jabba",
                name: "Malam Jabba",
                description: "Famous ski resort in Swat",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mingora_swat_pakistan.jpg/800px-Mingora_swat_pakistan.jpg"
                ],
                videos: [],
                winterInfo: "Winter season brings snowfall making it perfect for skiing.",
                summerInfo: "Summer offers pleasant weather and beautiful landscapes."
            }
        ]
    },
    hunza: {
        name: "Hunza Valley",
        tagline: "The crown jewel of Gilgit-Baltistan",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Baltit_Fort_Hunza_Valley.jpg/800px-Baltit_Fort_Hunza_Valley.jpg",
        places: [
            {
                id: "hunza-baltit-fort",
                name: "Baltit Fort",
                description: "Ancient royal fort in Hunza",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Baltit_Fort_Hunza_Valley.jpg/800px-Baltit_Fort_Hunza_Valley.jpg"
                ],
                videos: [],
                winterInfo: "Winters in Hunza bring cold temperatures and occasional snowfall.",
                summerInfo: "Summers are the ideal time to visit Baltit Fort with pleasant weather."
            }
        ]
    },
    murree: {
        name: "Murree",
        tagline: "Queen of Hills",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Murree_Pakistan_by_Amer_Daud.jpg/800px-Murree_Pakistan_by_Amer_Daud.jpg",
        places: [
            {
                id: "murree-mall-road",
                name: "Mall Road",
                description: "Main tourist area in Murree",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Murree_Pakistan_by_Amer_Daud.jpg/800px-Murree_Pakistan_by_Amer_Daud.jpg"
                ],
                videos: [],
                winterInfo: "Winters bring snowfall and cold temperatures.",
                summerInfo: "Summers are pleasant and ideal for tourism."
            }
        ]
    },
    skardu: {
        name: "Skardu",
        tagline: "Gateway to K2 and Hidden Valleys",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/K2_8611m.jpg/800px-K2_8611m.jpg",
        places: [
            {
                id: "skardu-deosai",
                name: "Deosai National Park",
                description: "Land of giants",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/K2_8611m.jpg/800px-K2_8611m.jpg"
                ],
                videos: [],
                winterInfo: "Winters are extremely cold with heavy snowfall.",
                summerInfo: "Summers are the only viable time to visit with mild temperatures."
            }
        ]
    },
    lahore: {
        name: "Lahore",
        tagline: "The Heart of Pakistan",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lahore_Badshahi_Mosque_View.jpg/800px-Lahore_Badshahi_Mosque_View.jpg",
        places: [
            {
                id: "lahore-badshahi",
                name: "Badshahi Mosque",
                description: "Mughal masterpiece",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lahore_Badshahi_Mosque_View.jpg/800px-Lahore_Badshahi_Mosque_View.jpg"
                ],
                videos: [],
                winterInfo: "Pleasant winter weather makes it comfortable to explore.",
                summerInfo: "Hot summers but early morning visits are recommended."
            }
        ]
    },
    gilgit: {
        name: "Gilgit",
        tagline: "Heart of Gilgit-Baltistan",
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gilgit_river.jpg/800px-Gilgit_river.jpg",
        places: [
            {
                id: "gilgit-shandur",
                name: "Shandur Top",
                description: "Highest polo ground in the world",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gilgit_river.jpg/800px-Gilgit_river.jpg"
                ],
                videos: [],
                winterInfo: "Extremely cold with heavy snowfall.",
                summerInfo: "Best time to visit with the annual polo festival in July."
            }
        ]
    }
};

// Save data to localStorage
function saveData() {
    localStorage.setItem('websiteSettings', JSON.stringify(websiteSettings));
    localStorage.setItem('destinations', JSON.stringify(destinations));
}

// Load data from localStorage
function loadData() {
    const savedSettings = localStorage.getItem('websiteSettings');
    const savedDestinations = localStorage.getItem('destinations');
    
    if (savedSettings) {
        websiteSettings = JSON.parse(savedSettings);
    }
    
    if (savedDestinations) {
        destinations = JSON.parse(savedDestinations);
    }
}

// Initialize data when script loads
loadData();

// Functions to update website settings
function updateWebsiteName(name) {
    websiteSettings.name = name;
    saveData();
    updateWebsiteDisplay();
}

function updateWebsiteAddress(address) {
    websiteSettings.address = address;
    saveData();
    updateWebsiteDisplay();
}

function updateLocation(location) {
    websiteSettings.location = location;
    saveData();
    updateWebsiteDisplay();
}

function updateWebsiteInfo(info) {
    websiteSettings.info = info;
    saveData();
    updateWebsiteDisplay();
}

// Function to update website display in real-time
function updateWebsiteDisplay() {
    // Update the main website if it's open in another tab/window
    try {
        // This would update the main website in real-time
        // In a real implementation, you would use a more robust solution
        // like server-side updates or WebSocket connections
        
        // For now, we'll just log the update
        console.log("Website settings updated:", websiteSettings);
    } catch (e) {
        console.log("Could not update website display");
    }
}

// Functions to manage destinations
function updateDestinationMainImage(destinationKey, imageUrl) {
    if (destinations[destinationKey]) {
        destinations[destinationKey].mainImage = imageUrl;
        saveData();
        updateDestinationDisplay(destinationKey);
    }
}

function addPlaceToDestination(destinationKey, placeData) {
    if (destinations[destinationKey]) {
        // Generate a unique ID for the new place
        const placeId = `${destinationKey}-${placeData.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        const newPlace = {
            id: placeId,
            name: placeData.name,
            description: placeData.description,
            images: placeData.images || [],
            videos: placeData.videos || [],
            winterInfo: placeData.winterInfo || "",
            summerInfo: placeData.summerInfo || ""
        };
        
        destinations[destinationKey].places.push(newPlace);
        saveData();
        updateDestinationDisplay(destinationKey);
        return newPlace;
    }
    return null;
}

function updatePlace(destinationKey, placeId, placeData) {
    if (destinations[destinationKey]) {
        const placeIndex = destinations[destinationKey].places.findIndex(place => place.id === placeId);
        if (placeIndex !== -1) {
            destinations[destinationKey].places[placeIndex] = {
                ...destinations[destinationKey].places[placeIndex],
                ...placeData
            };
            saveData();
            updateDestinationDisplay(destinationKey);
            return destinations[destinationKey].places[placeIndex];
        }
    }
    return null;
}

function deletePlace(destinationKey, placeId) {
    if (destinations[destinationKey]) {
        destinations[destinationKey].places = destinations[destinationKey].places.filter(place => place.id !== placeId);
        saveData();
        updateDestinationDisplay(destinationKey);
        return true;
    }
    return false;
}

// Function to update destination display in real-time
function updateDestinationDisplay(destinationKey) {
    // Update the main website if it's open in another tab/window
    try {
        // This would update the destination on the main website in real-time
        // In a real implementation, you would use a more robust solution
        // like server-side updates or WebSocket connections
        
        // For now, we'll just log the update
        console.log(`${destinationKey} destination updated:`, destinations[destinationKey]);
    } catch (e) {
        console.log(`Could not update ${destinationKey} display`);
    }
}

// Function to get all destinations
function getAllDestinations() {
    return destinations;
}

// Function to get a specific destination
function getDestination(destinationKey) {
    return destinations[destinationKey];
}

// Function to get all places in a destination
function getPlacesInDestination(destinationKey) {
    if (destinations[destinationKey]) {
        return destinations[destinationKey].places;
    }
    return [];
}

// Function to get a specific place
function getPlace(destinationKey, placeId) {
    if (destinations[destinationKey]) {
        return destinations[destinationKey].places.find(place => place.id === placeId);
    }
    return null;
}

// Export functions for use in admin panel
window.adminFunctions = {
    updateWebsiteName,
    updateWebsiteAddress,
    updateLocation,
    updateWebsiteInfo,
    updateDestinationMainImage,
    addPlaceToDestination,
    updatePlace,
    deletePlace,
    getAllDestinations,
    getDestination,
    getPlacesInDestination,
    getPlace
};