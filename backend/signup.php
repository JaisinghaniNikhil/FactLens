<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

// Read raw POST body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$checkQuery = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($checkQuery);

if ($result->num_rows > 0) {
    echo json_encode(["error" => "User already exists"]);
} else {
    $insertQuery = "INSERT INTO users(name, email, password) VALUES('$name', '$email', '$password')";
    if ($conn->query($insertQuery)) {
        echo json_encode(["message" => "User Registered Succesfully"]);
    } else {
        echo json_encode(["error" => "Registration Failed: " . $conn->error]);
    }
}

$conn->close();
?>
