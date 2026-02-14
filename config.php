<?php
// config.php - Configuration file for the admin panel

// Define the website root directory
define('ROOT_DIR', dirname(__FILE__));

// Define upload directory
define('UPLOAD_DIR', ROOT_DIR . '/uploads/');

// Create upload directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}

// Allowed file types
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']);

// Maximum file size (5MB)
define('MAX_FILE_SIZE', 5 * 1024 * 1024);

// Function to validate file type
function isValidImageType($fileType) {
    return in_array($fileType, ALLOWED_IMAGE_TYPES);
}

// Function to validate file size
function isValidFileSize($fileSize) {
    return $fileSize <= MAX_FILE_SIZE;
}

// Function to sanitize filename
function sanitizeFilename($filename) {
    // Remove any characters that aren't letters, numbers, dots, or hyphens
    return preg_replace('/[^a-zA-Z0-9._-]/', '_', $filename);
}

// Function to get file extension from MIME type
function getExtensionFromMimeType($mimeType) {
    $extensions = [
        'image/jpeg' => 'jpg',
        'image/jpg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif'
    ];
    
    return $extensions[$mimeType] ?? 'jpg'; // Default to jpg if unknown
}
?>