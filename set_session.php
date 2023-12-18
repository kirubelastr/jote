<?php
// Start the session
session_start();

// Set the session variables with a timestamp and bet amount
$_SESSION["spinFast"] = str_replace(array('-', ' ', ':'), '', date('Y-m-d H:i:s', time() + 3*3600)); // Convert to Ethiopian time zone (GMT+3)
$_SESSION["betAmount"] = $_POST["betAmount"]; // Assuming the bet amount is sent via POST

// Return a response indicating the session was set and include the session values
echo json_encode(array("status" => "success", "message" => "Session set successfully", "sessionValue" => $_SESSION["spinFast"], "betAmount" => $_SESSION["betAmount"]));
?>
