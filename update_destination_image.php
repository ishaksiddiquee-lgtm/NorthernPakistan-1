<?php
// update_destination_image.php
// This script handles updating destination images on the website

require_once 'config.php';

// Get the posted data
$destination = $_POST['destination'] ?? '';
$image_data = $_POST['image_data'] ?? '';

if (empty($destination) || empty($image_data)) {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
    exit;
}

// Decode the image data (it's a base64 encoded image)
if (strpos($image_data, 'data:image/') === 0) {
    // Extract the image type and data
    $parts = explode(';', $image_data);
    $type = str_replace('data:image/', '', $parts[0]);
    $data = str_replace('base64,', '', $parts[1]);
    
    // Convert to binary
    $binary_data = base64_decode($data);
    
    // Validate image
    $image_info = getimagesizefromstring($binary_data);
    if ($image_info === false) {
        echo json_encode(['success' => false, 'message' => 'Invalid image data']);
        exit;
    }
    
    // Validate file size
    if (!isValidFileSize(strlen($binary_data))) {
        echo json_encode(['success' => false, 'message' => 'File size exceeds limit']);
        exit;
    }
    
    // Define allowed types
    $allowed_types = ['jpeg', 'jpg', 'png', 'gif'];
    if (!in_array(strtolower($type), $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid image type']);
        exit;
    }
    
    // Create destination directory if it doesn't exist
    $dest_dir = UPLOAD_DIR . $destination . '/';
    if (!file_exists($dest_dir)) {
        mkdir($dest_dir, 0777, true);
    }
    
    // Generate unique filename
    $filename = uniqid() . '.' . $type;
    $filepath = $dest_dir . $filename;
    
    // Save the image
    if (file_put_contents($filepath, $binary_data)) {
        // Update the index.html file with the new image
        $index_file = 'index.html';
        if (file_exists($index_file)) {
            $index_content = file_get_contents($index_file);
            
            // Update the specific destination image in the HTML
            switch ($destination) {
                case 'swat':
                    $index_content = preg_replace(
                        '/(swat\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
                case 'hunza':
                    $index_content = preg_replace(
                        '/(hunza\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
                case 'murree':
                    $index_content = preg_replace(
                        '/(murree\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
                case 'skardu':
                    $index_content = preg_replace(
                        '/(skardu\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
                case 'lahore':
                    $index_content = preg_replace(
                        '/(lahore\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
                case 'gilgit':
                    $index_content = preg_replace(
                        '/(gilgit\.html"[^>]*>[\s\n\r]*<img[^>]*src=")[^"]*(")/', 
                        '$1' . $filepath . '$2', 
                        $index_content
                    );
                    break;
            }
            
            // Save the updated index.html file
            file_put_contents($index_file, $index_content);
        }
        
        echo json_encode([
            'success' => true, 
            'message' => 'Image updated successfully', 
            'url' => $filepath
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save image']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid image data format']);
}
?>