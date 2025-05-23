<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in."]);
    exit;
}

$userId = $_SESSION['user_id'];

require_once 'db.php';
if (!$conn) {
    echo json_encode(["error" => "Database connection failed."]);
    exit;
}

$stmt = $conn->prepare("SELECT query, verdict, date FROM history WHERE user_id = ? ORDER BY date DESC");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$history = [];
while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode(["history" => $history]);

$stmt->close();
$conn->close();
?>
