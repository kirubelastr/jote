<?php
$conn = mysqli_connect("localhost", "root", "", "bet");
$search = isset($_GET['search']) ? $_GET['search'] : '';
$query = "SELECT * FROM game_data";
if ($search) {
    $query .= " WHERE date_time LIKE '%" . mysqli_real_escape_string($conn, $search) . "%'";
}
$query .= " ORDER BY date_time DESC LIMIT 10";
$rows = mysqli_query($conn, $query);
?>
<table class="table1">
  <tr>
    <td>#</td>
    <td>bet amount</td>
    <td>player 1 win</td>
    <td>player 2 win</td>
    <td>player 3 win</td>
    <td>player 4 win</td>
    <td>time</td>
  </tr>
  <?php $i = 1; ?>
  <?php foreach($rows as $row) : ?>
    <tr>
      <td><?php echo $i++; ?></td>
      <td><?php echo $row["bet_amount"]; ?></td>
      <td><?php echo $row["player1_win"]; ?></td>
      <td><?php echo $row["player2_win"]; ?></td>
      <td><?php echo $row["player3_win"]; ?></td>
      <td><?php echo $row["player4_win"]; ?></td>
      <td><?php echo $row["date_time"]; ?></td>
    </tr>
  <?php endforeach; ?>
</table>
