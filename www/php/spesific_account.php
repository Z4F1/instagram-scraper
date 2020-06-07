<?php

session_start();
date_default_timezone_set("Europe/Amsterdam");

include "request.php";

if(isset($_SESSION["user_id"]) and !empty($_SESSION["user_id"])){
    $user = request("http://localhost:8080/api/user/" . $_SESSION["user_id"], "GET");

    if($user["status"] == null){
        echo "<h2>No connection :(</h2>";
    }elseif($user["res"] == null){
        die(json_encode("error"));
    }else {
        $id = $_GET["id"];
        $accountData = request("http://localhost:8080/api/accounts/$id", "GET");
    }
}else {
    die(json_encode("error"));
}

echo json_encode($accountData["res"]);