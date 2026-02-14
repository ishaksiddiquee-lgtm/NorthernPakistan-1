<?php
// update_place_info.php
// This script handles updating place information

require_once 'config.php';

// Get the posted data
$destination = $_POST['destination'] ?? '';
$place_id = $_POST['place_id'] ?? '';
$field = $_POST['field'] ?? '';
$value = $_POST['value'] ?? '';

if (empty($destination) || empty($place_id) || empty($field) || !isset($value)) {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
    exit;
}

// Determine which destination page to update
$dest_page = $destination . '.html';
if (!file_exists($dest_page)) {
    echo json_encode(['success' => false, 'message' => 'Destination page does not exist']);
    exit;
}

// Read the destination page content
$page_content = file_get_contents($dest_page);

// Update the specific field in the page
switch ($field) {
    case 'name':
        // Update place name in the modal title
        $pattern = '/(id="' . preg_quote($place_id, '/') . '-modal"[^>]*>[\s\n\r]*<div[^>]*class="modal-content"[^>]*>[\s\n\r]*<span[^>]*>&times;<\/span>[\s\n\r]*<h2>)[^<]*(' . preg_quote('</h2>') . ')/';
        $page_content = preg_replace($pattern, '${1}' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '${2}', $page_content);
        break;
    case 'description':
        // Update place description in the modal body
        $pattern = '/(<div class="location-details">[\s\n\r]*<h3>About [^<]*<\/h3>[\s\n\r]*<p>)[^<]*(' . preg_quote('</p>') . ')/';
        $page_content = preg_replace($pattern, '${1}' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '${2}', $page_content);
        break;
    case 'winter_info':
        // Update winter information
        $pattern = '/(<div class="season">[\s\n\r]*<h4><i class="fas fa-snowflake"><\/i> Winter Experience<\/h4>[\s\n\r]*<p>)[^<]*(' . preg_quote('</p>') . ')/';
        $page_content = preg_replace($pattern, '${1}' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '${2}', $page_content);
        break;
    case 'summer_info':
        // Update summer information
        $pattern = '/(<div class="season">[\s\n\r]*<h4><i class="fas fa-sun"><\/i> Summer Experience<\/h4>[\s\n\r]*<p>)[^<]*(' . preg_quote('</p>') . ')/';
        $page_content = preg_replace($pattern, '${1}' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '${2}', $page_content);
        break;
}

// Save the updated destination page
if (file_put_contents($dest_page, $page_content)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Place information updated successfully'
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update place information']);
}
?>