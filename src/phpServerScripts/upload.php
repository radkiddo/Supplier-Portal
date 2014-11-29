<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,HEAD,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: cache-control,content-Type,x-requested-with');

$ds = '/'; 
$storeFolder = 'images_receive';

/// @@@ ///
// sendToFtp --> Just for DreamHost - Might need to be removed for other servers...
/// @@@ ///
function sendToFtp($targetFile, $appendix, $replace)
{
	$finalPath = '/images_receive/';
	
	$ftp_server = "russell.dreamhost.com";
    $ftp_user_name = "supplierportaluser";
    $ftp_user_pass = "e7low5!!";
	
	if ($_FILES['file']['name'] != '') {
		$finalFile = $finalPath . $appendix . $_FILES['file']['name'];
	}
	else {
		$finalFile = $finalPath . $appendix . '.xml';
	}
    
    $conn_id = ftp_connect($ftp_server);
    $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);  
    
    if ((!$conn_id) || (!$login_result)) {
    }
    else {
    	if ($replace) {
    		$targetFile = replaceExtension($targetFile);
    		$finalFile = replaceExtension($finalFile);
    	}
    	
    	$local_file = $targetFile;
    	ftp_delete($conn_id, $finalFile);
    	$upload = ftp_put($conn_id, $finalFile, $local_file, FTP_BINARY);
    	ftp_close($conn_id);
    }
}

function getLocalTimezone()
{
    $iTime = time();
    $arr = localtime($iTime);
    $arr[5] += 1900; 
    $arr[4]++;
    $iTztime = gmmktime($arr[2], $arr[1], $arr[0], $arr[4], $arr[3], $arr[5], $arr[8]);
    $offset = doubleval(($iTztime-$iTime)/(60*60));
    
    $zonelist = 
    array
    (
        'Kwajalein' => -12.00,
        'Pacific/Midway' => -11.00,
        'Pacific/Honolulu' => -10.00,
        'America/Anchorage' => -9.00,
        'America/Los_Angeles' => -8.00,
        'America/Denver' => -7.00,
        'America/Tegucigalpa' => -6.00,
        'America/New_York' => -5.00,
        'America/Caracas' => -4.30,
        'America/Halifax' => -4.00,
        'America/St_Johns' => -3.30,
        'America/Buenos_Aires' => -3.00,
        'America/Sao_Paulo' => -3.00,
        'Atlantic/South_Georgia' => -2.00,
        'Atlantic/Azores' => -1.00,
        'Europe/London' => 0,
        'Europe/Amsterdam' => 1.00,
        'Europe/Minsk' => 2.00,
        'Asia/Kuwait' => 3.00,
        'Asia/Tehran' => 3.30,
        'Asia/Muscat' => 4.00,
        'Asia/Yekaterinburg' => 5.00,
        'Asia/Kolkata' => 5.30,
        'Asia/Katmandu' => 5.45,
        'Asia/Dhaka' => 6.00,
        'Asia/Rangoon' => 6.30,
        'Asia/Krasnoyarsk' => 7.00,
        'Asia/Brunei' => 8.00,
        'Asia/Seoul' => 9.00,
        'Australia/Darwin' => 9.30,
        'Australia/Canberra' => 10.00,
        'Asia/Magadan' => 11.00,
        'Pacific/Fiji' => 12.00,
        'Pacific/Tongatapu' => 13.00
    );
    
    $index = array_keys($zonelist, $offset);
    
    if(sizeof($index)!=1)
        return false;
        
    return $index[0];
}

function replaceExtension($file)
{
	$fn = '';
	
	if (stristr($file, '.tif') !== FALSE) {
		$fn = str_replace('.tif', '.xml', $file);
	}
	
	if (stristr($file, '.pdf') !== FALSE) {
		$fn = str_replace('.pdf', '.xml', $file);
	}
	
	if ($fn == '') 
	{ 
		$fn = $file;
	}
	
	return $fn;
}

function getDateTime()
{
	$tz = getLocalTimezone();
	date_default_timezone_set($tz);
	$date = date('Y-m-d H:i:s');
	return $date;
	//return $date . ' ' . $tz;
}

/*function createXml($origFn, $file, $spId, $spName, $poNum, $domain, $app, $user)
{
	$fn = replaceExtension($file);
	
	if (file_exists($fn)) {
		unlink($fn);
	}
	
	$xml = new SimpleXMLElement('<xml/>');
	
	$dom = new DOMDocument('1.0');
	$dom->preserveWhiteSpace = true;
	$dom->formatOutput = true;

    $track = $xml->addChild('﻿SupplierInfo');
    $track->addChild('﻿eFlowAppName', $app);
    $track->addChild('﻿DomainName', $domain);
    $track->addChild('SupplierId', $spId);
    //$track->addChild('SupplierName', $spName);
    $track->addChild('﻿PONumber', $poNum);
    //$track->addChild('User', $user);
    
    //if (stristr($origFn, '.tif') !== FALSE || stristr($origFn, '.pdf')) {
    	$track->addChild('﻿File', $origFn);
    //}
    
    $track->addChild('DateTime', getDateTime());
	
	$dom->loadXML($xml->asXML());
	file_put_contents($fn, $dom->saveXML());
	
	return $fn;
}*/

function createXml($origFn, $file, $spId, $spName, $poNum, $domain, $app, $user)
{
	$fn = replaceExtension($file);
	
	if (file_exists($fn)) {
		unlink($fn);
	}
	
	$content = '﻿<SupplierInfo>' . PHP_EOL;
	$content .= '﻿<eFlowAppName>' . $app . '﻿</eFlowAppName>' . PHP_EOL;
	$content .= '﻿<DomainName>' . $domain . '﻿</DomainName>' . PHP_EOL;
	$content .= '﻿<SupplierId>' . $spId . '﻿</SupplierId>' . PHP_EOL;
	$content .= '﻿<PONumber>' . $poNum . '﻿</PONumber>' . PHP_EOL;
	$content .= '﻿<File>' . $origFn . '﻿</File>' . PHP_EOL;
	$content .= '﻿<DateTime>' . getDateTime() . '﻿</DateTime>' . PHP_EOL;
	$content .= '﻿</SupplierInfo>';
	
	file_put_contents($fn, $content);
	
	return $fn;
}

$app = $_GET['app']; 
$dm = $_GET['dm'];
$spId = $_GET['spId'];
$spName = $_GET['spName'];
$poNum = $_GET['poNum'];
$user = $_GET['user'];

$appendix = $dm . '_' . $app . '-';
$appendix .= $spId . '__' . $poNum;
$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;

if (!empty($_FILES)) {
	if ($_FILES['file']['tmp_name'] != '') {
		$tempFile = $_FILES['file']['tmp_name'];
     
     	$appendix .= '___';
		$targetFile = $targetPath . $appendix . $_FILES['file']['name'];
	
		if (!file_exists($targetPath)) {
    		mkdir($targetPath);
		}
	
		if (file_exists($targetFile)) {
			unlink($targetFile);
		}
	
		move_uploaded_file($tempFile, $targetFile);
		$xmlFn = createXml($appendix . $_FILES['file']['name'], $targetFile, $spId, $spName, $poNum, $dm, $app, $user);
		
		// Just for DreamHost - Might need to be removed for other servers...
		sendToFtp($targetFile, $appendix, false);
		sendToFtp($xmlFn, $appendix, true);
	}
	else {
		$targetFile = $targetPath . $appendix;
		$xmlFn = createXml($appendix . '.xml', $targetFile . '.xml', $spId, $spName, $poNum, $dm, $app, $user);
		sendToFtp($xmlFn, $appendix, true);
	}
}
else // flip PO
{
	$targetFile = $targetPath . $appendix;
	$xmlFn = createXml($appendix . '.xml', $targetFile . '.xml', $spId, $spName, $poNum, $dm, $app, $user);
	sendToFtp($xmlFn, $appendix, true);
}

?>   