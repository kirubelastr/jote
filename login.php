<?php
// login.php
session_start();

ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('display_errors', '0');

header("Content-Security-Policy: default-src 'self';");
header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);

    // Replace these values with your actual database credentials
    $servername = "localhost";
    $db_username = "root";
    $db_password = "";
    $database = "bet";

    // Create a connection
    $conn = new mysqli($servername, $db_username, $db_password, $database);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT username, password_hash FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($db_username, $db_password_hash);
    $stmt->fetch();
    $stmt->close();

    // Verify the password using password_verify
    if ($db_username && password_verify($password, $db_password_hash)) {
        // Regenerate session ID to prevent session fixation
        session_regenerate_id(true);

        $_SESSION["username"] = $username;
        echo 'success';
    } else {
        http_response_code(401);  // Unauthorized
        echo 'Invalid credentials';
    }

    // Close the database connection
    $conn->close();
}
?>
