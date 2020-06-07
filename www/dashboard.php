<?php 

$title = "Dashboard";
include "template/header.php";

?>
<body onload="getAccounts()">
    <div class="toolbar container-center">
        <a href="/addaccount.php">Add account</a>
        <a href="/adduser.php">Add user login</a>
        <a href="/changesettings.php">Change settings</a>
    </div>
    <div class="container-center">
        <h1>Instagrams controlpanel</h1>
        <div id="accounts" class="container-center"></div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        const accountsFrame = document.getElementById("accounts");

        async function getAccounts(){
            const data = await axios("/php/accounts.php")
            if(data.data == "error"){
                window.location.href = "/"
            }
            accountsFrame.innerHTML = data.data
        }
        
        setInterval(getAccounts, 10000)
        
    </script>
</body>
</html>