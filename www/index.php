<?php

session_start();

if(isset($_SESSION["user_id"]) and !empty($_SESSION["user_id"])){
    header("Location: /dashboard.php");
}

$title = "Login";
include "template/header.php";

?>
<body style="overflow: hidden;">

    <img class="image-fullsize" src="https://reinhartsenmedia.com/wp-content/uploads/2018/09/hero.jpg" alt="Background Image" style="opacity: 0.8" />

    <div class="centered">
        
        <p class="login-error"><?php if(isset($_GET["error"]) and !empty($_GET["error"])) { echo $_GET["error"];} ?></p>

        <p class="login-title">REINHARTSEN MEDIA</p>

        <form class="login-form" action="/login.php" method="post">

            <input type="text" name="username" placeholder="USERNAME" />
            <input type="password" name="password" placeholder="PASSWORD" />

            <input type="submit" value="LOGIN">
        </form>

    </div>
</body>
</html>