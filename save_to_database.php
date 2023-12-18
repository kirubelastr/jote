<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bet";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(500);
        echo "Connection failed: " . $conn->connect_error;
        exit();
    }

    // Get the data from the AJAX request
    $winningsArray = json_decode($_POST['winningsArray'], true);
    $sessionvalue = filter_input(INPUT_POST, 'sessionvalue', FILTER_SANITIZE_STRING);
    $sessionvalue = substr($sessionvalue, 0, 4).'-'.substr($sessionvalue, 4, 2).'-'.substr($sessionvalue, 6, 2).' '.substr($sessionvalue, 8, 2).':'.substr($sessionvalue, 10, 2).':'.substr($sessionvalue, 12, 2);
    $betAmount = filter_input(INPUT_POST, 'betAmount', FILTER_SANITIZE_STRING);
    $betAmount = $betAmount * 4;    
    // Initialize player winnings and jotes
    $player_wins = array_fill(1, 4, 0);
    $player_jotes = array_fill(1, 4, '0');

    // Calculate total winnings
    $totalWinnings = 0;
    foreach ($winningsArray as $winning) {
        $playerNumber = intval(str_replace('Player ', '', $winning['order']));
        $player_wins[$playerNumber] = $winning['winnings'];
        $player_jotes[$playerNumber] = $winning['jote'];
        $totalWinnings += $winning['winnings'];
    }

    // Calculate house winnings
    $house = $betAmount - $totalWinnings;

    // SQL query to insert the data into the database
    $stmt = $conn->prepare("INSERT INTO game_data (bet_amount, player1_win, player2_win, player3_win, player4_win, player1_jote, player2_jote, player3_jote, player4_jote, house, date_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iddddssssds", $betAmount, $player_wins[1], $player_wins[2], $player_wins[3], $player_wins[4], $player_jotes[1], $player_jotes[2], $player_jotes[3], $player_jotes[4], $house, $sessionvalue);

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        http_response_code(500);
        echo "Error: " . $stmt->error;
        exit();
    }

    $stmt->close();
    $conn->close();
?>
