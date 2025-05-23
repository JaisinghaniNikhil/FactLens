<?php
session_start();

// Debug logs
error_log("save_history.php called");

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Log session user_id
$userId = $_SESSION['user_id'] ?? null;
error_log("Session user_id: " . ($userId ?? 'NOT SET'));

if (!$userId) {
    echo json_encode(["error" => "User not logged in."]);
    exit;
}

// Get input JSON
$inputJSON = file_get_contents("php://input");
error_log("Raw input JSON: " . $inputJSON);

$input = json_decode($inputJSON, true);
error_log("Decoded input: " . print_r($input, true));

$query = $input['query'] ?? '';
$verdict = $input['verdict'] ?? '';

if (!$query || !$verdict) {
    echo json_encode(["error" => "Missing query or verdict."]);
    error_log("Missing query or verdict");
    exit;
}

// Include DB connection
require_once 'db.php';

if (!$conn) {
    error_log("Database connection failed");
    echo json_encode(["error" => "Database connection failed."]);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("INSERT INTO history (user_id, query, verdict, date) VALUES (?, ?, ?, NOW())");
if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    echo json_encode(["error" => "Prepare statement failed."]);
    exit;
}

$stmt->bind_param("iss", $userId, $query, $verdict);

if ($stmt->execute()) {
    echo json_encode(["message" => "History saved."]);
    error_log("History saved successfully for user_id: $userId");
} else {
    error_log("Execute failed: " . $stmt->error);
    echo json_encode(["error" => "Failed to save history."]);
}

$stmt->close();
$conn->close();
?>
