<?php

function request($url, $method, $data = null, $header = "Content-type: application/json\r\n"){
    $options = array(
        "http" => array(
            "header" => $header,
            "method" => $method,
            "ignore-errors" => true
        )
    );

    if($data !== null){
        $options["http"]["content"] = $data;
    }

    $ctx = stream_context_create($options);
    $res = file_get_contents($url, false, $ctx);

    return array("res" => json_decode($res), "status" => $http_response_header);
}