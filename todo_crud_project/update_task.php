<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id']);
$task_name = $conn->real_escape_string($data['task_name']);
$status = $conn->real_escape_string($data['status']);

$sql = "UPDATE tasks 
        SET task_name='$task_name', status='$status'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>