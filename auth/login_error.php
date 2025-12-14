<?php

session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Fifteen Puzzle - Login Error</title>
    <link rel="stylesheet" href="auth.css">
</head>

<body>
    <div class="dashboard">
        <h2 class="welcome-note">Login Error</h2>
        
        <p>
            <?= isset($_SESSION['error']) ? htmlspecialchars($_SESSION['error']) : "An unknown error occurred."; ?>
        </p>

        <button id="logout"><a href="./session_destroy.php">Return to Login</a></button>
    </div>
</body>

</html>
