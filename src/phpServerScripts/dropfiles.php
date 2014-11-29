<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET,POST,PUT,HEAD,DELETE,OPTIONS');
	header('Access-Control-Allow-Headers: content-Type,x-requested-with');

	$app = $_GET['app'];
	$dm = $_GET['dm'];
	$spId = $_GET['spId'];
	$spName = $_GET['spName'];
	$poNum = $_GET['poNum'];
	$user = $_GET['user'];
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">

<head>

<link href="css/basic.css" rel="stylesheet" type="text/css" />
<link href="css/dropzone.css" rel="stylesheet" type="text/css" />

<style type="text/css">

iframe {
    border:none;
}

</style>

</head>

<body>

<div id="mydropzone">
<form class="dropzone" id="myAwesomeDropzone" name="displayImage" enctype="multipart/form-data" action="<?php echo 'upload.php?app=' . $app . '&dm=' . $dm . '&spId=' . $spId . '&spName=' . $spName . '&poNum=' . $poNum . '&user=' . $user; ?>" method="POST">
</form>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.timer.min.js"></script>
<script src="dropzone.min.js"></script>
<script src="dropfiles.js"></script>

</body>

</html>