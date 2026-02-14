<?php
// update_website_settings.php
// This script handles updating general website settings

require_once 'config.php';

// Get the posted data
$setting_type = $_POST['setting_type'] ?? '';
$value = $_POST['value'] ?? '';

if (empty($setting_type) || empty($value)) {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
    exit;
}

// Update the index.html file with the new setting
$index_file = 'index.html';
if (!file_exists($index_file)) {
    echo json_encode(['success' => false, 'message' => 'Index file does not exist']);
    exit;
}

$index_content = file_get_contents($index_file);

switch ($setting_type) {
    case 'name':
        // Update website name in the title and header
        $index_content = preg_replace('/(<title>)[^<]*(<\/title>)/', '$1' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . ' - Northern Pakistan Tourism$2', $index_content);
        $index_content = preg_replace('/(<h2>)[^<]*(<\/h2>)/', '$1' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '$2', $index_content, 1); // First h2
        break;
    case 'address':
        // Update website address in contact info
        $index_content = preg_replace('/(<li><i class="fas fa-envelope"><\/i> )[^<]*(<\/li>)/', '$1' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '$2', $index_content);
        break;
    case 'location':
        // Update location in contact info
        $index_content = preg_replace('/(<li><i class="fas fa-map-marker-alt"><\/i> )[^<]*(<\/li>)/', '$1' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '$2', $index_content);
        break;
    case 'info':
        // Update website info in about section
        $index_content = preg_replace('/(<p class="section-subtitle">)[^<]*(<\/p>)/', '$1' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '$2', $index_content, 1); // First subtitle
        break;
}

// Save the updated index.html file
if (file_put_contents($index_file, $index_content)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Setting updated successfully'
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update setting']);
}
?>