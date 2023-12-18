<?php
// Start the session
session_start();

// Check if the session variables are set and return the status
if (isset($_SESSION["spinFast"], $_SESSION["betAmount"])) {
    // Check if the previous session is stored and is the same as the current session
    if (isset($_SESSION["prevSession"]) && $_SESSION["prevSession"] == $_SESSION["spinFast"]) {
        // If the session is the same as the previous one, don't send to the AJAX
        echo json_encode(array("session" => false));
    } else {
        // If the session is different from the previous one, send to the AJAX
        echo json_encode(array("session" => true, "value" => $_SESSION["spinFast"], "betAmount" => $_SESSION["betAmount"]));
        // Store the current session as the previous session for the next check
        $_SESSION["prevSession"] = $_SESSION["spinFast"];
    }
} else {
    // If the session variables are not set, return a JSON response with the session status
    echo json_encode(array("session" => false));
}
?>
