<?php

include "php/request.php";

$account = request("http://localhost:8080/api/user", "POST");

var_dump($account);