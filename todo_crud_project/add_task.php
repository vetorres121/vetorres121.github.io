<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$task_name = $conn->real_escape_string($data['task_name']);

$sql = "INSERT INTO tasks (task_name) VALUES ('$task_name')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>