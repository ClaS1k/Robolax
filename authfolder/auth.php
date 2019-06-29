<?php
$host = 'localhost'; 
$db = 'authme';
$user = 'root';
$password = '';

$link = mysqli_connect($host, $user, $password, $db) 
    or die("Ошибка " . mysqli_error($link));

session_start(); 
$login = $_POST['login']; 
$password = $_POST['password'];
$password = SHA1($password); 
$log = "SELECT * FROM `signin` WHERE username = '$login' and password = '$password'";
$data = mysqli_query($link, $log);
$result = mysqli_query($link, $log) or die("Ошибка с бд" . mysqli_error($link)); 
if($result)
{
	//скрипт на убирание поля авторизации и показ дальнейшего меню
 }else{
 	//скрипт показ ошибки из за неверного лога или пароля

}
?>