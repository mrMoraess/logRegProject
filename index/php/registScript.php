<?php
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

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = filter_input(INPUT_POST,"username", FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_input(INPUT_POST,"email", FILTER_SANITIZE_SPECIAL_CHARS);
        $password = filter_input(INPUT_POST,"password", FILTER_SANITIZE_SPECIAL_CHARS);
        $repeatPass = filter_input(INPUT_POST,"repeat-pass", FILTER_SANITIZE_SPECIAL_CHARS);

        if ($password == $repeatPass && !checkUsername($username, $conn)) {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            mysqli_query($conn, "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hash')");
            echo "<h1> Success </h1>";
        }
        elseif ($password != $repeatPass) {
            echo "Check your password.";
        }
        elseif (checkUsername($username, $conn)) {
            echo "Username already exists.";
        }
    }
?>