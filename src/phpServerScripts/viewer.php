

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">

<head>

<style type="text/css">

iframe {
    border:none;
}

</style>

</head>

<body>

<?php 

$burl = $_GET['burl'];

if ($burl != null && $burl != '') {
	$v = 'http://docs.google.com/gview?url=' . $burl . '&embedded=true';
	//$v = 'https://view.officeapps.live.com/op/view.aspx?src=' . $burl;	
	echo '<iframe id="docViewer" src="' . $v . '" style="width: 100%; height:820px; padding-left:0px; padding-right:0px;"></iframe>';
}

?>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script src="easyXDM.min.js"></script>
<script src="viewer.js"></script>

</body>
</html>