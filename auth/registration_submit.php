<?php

require('./db.php');
session_start();
initTables();

if (!isset($_POST['username'], $_POST['email'], $_POST['firstname'], $_POST['password'])) {
    $_SESSION['error'] = 'Invalid signup submission.';
    header('Location: ./login_error.php');
    exit();
}

$db = getDB();

$username = $_POST['username'];
$stmt = $db->prepare('SELECT username FROM User WHERE username = ? LIMIT 1');
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $_SESSION['error'] = 'Signup error: Username already exists.';
    $stmt->close();
    $db->close();
    header('Location: ./login_error.php');
    exit();
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $stmtEmail = $db->prepare('SELECT email FROM User WHERE email = ? LIMIT 1');
    $stmtEmail->bind_param('s', $email);
    $stmtEmail->execute();
    $resEmail = $stmtEmail->get_result();
    if ($resEmail && $resEmail->num_rows > 0) {
        $_SESSION['error'] = 'Signup error: Email already registered.';
        $stmtEmail->close();
        $db->close();
        header('Location: ./login_error.php');
        exit();
    }
    $stmtEmail->close();
}

$stmt->close();
$db->close();
createUser();
header('Location: ./login.php');
exit();

?>
