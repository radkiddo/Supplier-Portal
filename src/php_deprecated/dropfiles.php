<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,HEAD,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: content-Type,x-requested-with');

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">

<head>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/dropzone.min.js"></script>

<style type="text/css">

iframe {
    border:none;
}

</style>

<link href="css/basic.css" rel="stylesheet" type="text/css" />
<link href="css/dropzone.css" rel="stylesheet" type="text/css" />

</head>

<body>


<div id="dropzone">
<form action="upload.php" class="dropzone" id="demo-upload">
</form>
</div>

</body>
</html>