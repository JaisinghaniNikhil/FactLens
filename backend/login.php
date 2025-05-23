<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include("db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["error" => "Email or Password not provided"]);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$password = $data['password'];

$query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    if (isset($user['password']) && password_verify($password, $user['password'])) {
        // ✅ Store name & email in session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user'] = [
            'name' => $user['name'],
            'email' => $user['email']
        ];

        echo json_encode(["message" => "Login Succesful", "name" => $user['name']]);
    } else {
        echo json_encode(["error" => "Invalid Password"]);
    }
} else {
    echo json_encode(["error" => "User Not Found"]);
}

$conn->close();
?>
