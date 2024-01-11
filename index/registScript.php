<?php
    include("./database.php");

    $username = filter_var($_POST["username"], FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_SPECIAL_CHARS);
    $repeatPass = filter_var($_POST["repeat-pass"], FILTER_SANITIZE_SPECIAL_CHARS);

    echo $username;
    
    function checkUsername ($username, $conect) {
        $data = mysqli_query($conect, "SELECT * FROM users");

        $flag = false;
        if (mysqli_num_rows($data) > 0) {
            while ($row = mysqli_fetch_array($data)) {
                if ($row["username"] == $username) {
                    $flag = true;
                }
            }
        }

        return $flag;
    }

    if (checkUsername($username, $conn)) {
        print false;
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        mysqli_query($conn, "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hash')");

        print true;
    }
?>