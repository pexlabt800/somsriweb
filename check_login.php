<?php
@session_start();

$pages=['cust-page'=>'customer_home.html','admin-page'=>'admin_home.html','login'=>'login.html'];
//load database;
$staffDatabase=[];
$customerDatabase=[];
$info=<<<data
		<span style='text-align:center;'><h3><b>คุณยังไม่ได้ลงชื่อเข้าใช้งาน</b></h3><hr>
		<span style='text-align:center;'>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href='index.html'>กลับหน้าหลัก</a>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href="login.html">ลงชื่อเข้าใช้งาน</a>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href="member.html">สมัคสมาชิกใหม่</a>
		</span>
data;
if (isset($_SESSION['login'])){
	$login=$_SESSION['login'];
	$go_page=null;
	$login_info='';
	if(in_array($login['id'],array_keys($staffDatabase))){
		//staff 
		$staff=$staffDatabase[$login['id']];
		$name=$staff['name'];
		$go_page=$pages['admin-page'];
		$login_info="เจ้าหน้าที่ชื่อ:{$name}";
	}elseif(in_array($login['id'],array_keys($customerDatabase))){
		$cust=$customerDatabase[$login['id']];
		$name=$cust['name'];
		$go_page=$pages['cust-page'];
		$login_info="เจ้าหน้าที่ชื่อ:{$name}";
	}
	$info=<<<data
		<span style='text-align:center;'><h3><b>ลงชื่อเข้าใช้งานแล้ว</b></h3><hr>
		<h3><h3>{$login_info}</span><hr>
		<span style='text-align:center;'>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href='index.html'>กลับหน้าหลัก</a>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href="{$go_page}">เข้าบัญชี</a>
			<img src="pic/cop_pic/home.png" width="12px" height="12px" alt="no pic"><a href="exit.php">ลงชื่อออก</a>
		</span>
	data;
}
echo $info;
?>