<?php

session_start();

include "php/request.php";

$data = array(
    "username" => $_POST["username"],
    "password" => md5($_POST["password"])
);

$account = request("http://localhost:8080/api/user/login", "POST", json_encode($data));

if($account["status"] == null){
    header("Location: /?error=" . urlencode("server error"));
}elseif($account["res"] == null){
    header("Location: /?error=" . urlencode("wrong username or password"));
}else {
    $_SESSION["user_id"] = $account["res"]->_id;
    header("Location: /dashboard.php");
}