<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id']);

$sql = "DELETE FROM tasks WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>