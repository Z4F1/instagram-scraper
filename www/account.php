<?php 

$title = "Dashboard";
include "template/header.php";

?>
<body onload="getAccount()">
    <div class="container-center">
        <div id="account"></div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        const accountFrame = document.getElementById("account");

        async function getAccount(){
            let urlParams = new URLSearchParams(window.location.search)
            let id = urlParams.get("id")

            const data = await axios("/php/spesific_account.php?id=" + id)
            if(data.data == "error"){
                window.location.href = "/"
            }
            accountFrame.innerHTML = data.data
        }
        
        setInterval(getAccount, 10000)
        
    </script>
</body>
</html>