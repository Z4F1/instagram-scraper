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
    }elseif($user["res"]->role == "admin") {
        //GET ALL ACCOUNTS
        $accounts = request("http://localhost:8080/api/accounts", "GET");
    }elseif($user["res"]->role == "member"){
        //GET ACCOUNTS FOR THIS ACCOUNT
    }else {
        die(json_encode("error"));
    }
}else {
    die(json_encode("error"));
}
?>
<div class="container-center">
    <div class="accounts">
        <?php
        if(is_array($accounts["res"])){
            foreach($accounts["res"] as $account){

                usort($account->shortTermStats, function($a, $b) {
                    return strtotime($b->date) - strtotime($a->date);
                });

                $date = date("H:i:s", strtotime($account->updatedAt));

                ?>
                <a href="account.php?id=<?php echo $account->_id; ?>" class="account" id="<?php echo $account->_id; ?>">
                    <img src="<?php echo $account->profilePicUrl; ?>" alt="Profile Picture" />
                    <div class="container-center">
                        <h2><?php echo $account->name; ?></h2>
                        <p>
                            <?php echo $account->shortTermStats[0]->followers; ?> followers,
                            
                            <?php echo $account->shortTermStats[0]->following; ?> following
                        </p>
                        <p class="muted">Last updated at: <?php echo $date;  ?></p>
                    </div>
                </a>
                <?php
            }
        }
        ?>
    </div>
</div> 