<?php
// upload.php - Handle file uploads for the admin panel

// Set the directory where files will be stored
$uploadDir = 'uploads/';
$allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif'];
$allowedVideoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Check if a file was uploaded
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $destination = $_POST['destination'] ?? '';
    $type = $_POST['type'] ?? ''; // 'image' or 'video'
    
    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'File upload error']);
        exit;
    }
    
    // Get file extension
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Validate file type based on expected type
    $isValidType = false;
    if ($type === 'image' && in_array($fileExtension, $allowedImageTypes)) {
        $isValidType = true;
    } elseif ($type === 'video' && in_array($fileExtension, $allowedVideoTypes)) {
        $isValidType = true;
    }
    
    if (!$isValidType) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type']);
        exit;
    }
    
    // Create destination directory if needed
    $destinationDir = $uploadDir . $destination . '/';
    if (!file_exists($destinationDir)) {
        mkdir($destinationDir, 0777, true);
    }
    
    // Generate unique filename
    $fileName = uniqid() . '.' . $fileExtension;
    $filePath = $destinationDir . $fileName;
    
    // Move uploaded file to destination
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo json_encode([
            'success' => true, 
            'message' => 'File uploaded successfully',
            'url' => $filePath
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
}
?>