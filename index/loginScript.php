<?php
    include("./database.php");

    $username = filter_var($_POST["username"], FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_SPECIAL_CHARS);

    $sql = "SELECT * FROM users";
    $result = mysqli_query($conn, $sql);

    $userFlag = false;
    $passFlag = false;
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            if ($row["username"] == $username) {
                $userFlag = true;
                if (password_verify($password, $row["password"])) {
                    $passFlag = true;
                }
                break;
            }
        }
    }
    if ($userFlag && $passFlag) {
        print true;
    } elseif (!$passFlag) {
        print false;
    } else {
        print false;
    }
?>