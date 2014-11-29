<?php
	$name = 'access';
	$url = 'images/aws.json' . $b;

	header("Content-Description: File Transfer"); 
	header("Content-Type: application/json"); 
	header("Content-Disposition: attachment; filename=\"$name\"");
	
	readfile ($url); 
?>