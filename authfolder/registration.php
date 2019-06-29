<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="reg.css">
</head>
<body>
		    <div class="Registration" id="Registration"> 
            	<div class="RegHeader">
            		<div id="RegHeader">
            			<a id="TextReg">Региcтрация</a>
            		</div>
            	</div>
            	<div class="RegErrorBlock">
            			<div id="RegError">
            				<a id="TextError">Текст ошибки</a>
            			</div>
            	</div>
            	<div class="FormReg">
            		<a class="LogImgOfReg"></a>
            		<a class="LinkImgOfReg"></a>
            		<a class="KeyImgOfReg"></a>
               	 <form method="post">
             		<input type="text" id="login" name="usernamereg" placeholder="NickName" required>
             		<input type="text" id="email" name="emailreg" placeholder="Email" required>
                	<input type="password" id="pass" name="passwordreg" placeholder="Password" required>
                	<input type="submit" id="regBTN" name="regbtn" value="Зaрегистрироваться">
                	<?php
							$usernamereg = $_POST['usernamereg'];
							$emailreg = $_POST['emailreg'];  
							$passwordreg = $_POST['passwordreg'];
								session_start();
									$host = 'localhost'; 
									$db = 'authme';
									$user = 'root';
									$password = '';
									if(Isset($emailreg)){
									$link = mysqli_connect($host, $user, $password, $db) or die("Ошибка " . mysqli_error($link));
									$per = "SELECT * FROM `signin` WHERE username = '$usernamereg'";
									$data = mysqli_query($link, $per);
									if(mysqli_num_rows($data) == 0){
 										$per = "SELECT * FROM `signin` WHERE email = '$emailreg'";
										$data = mysqli_query($link, $per);
											if(mysqli_num_rows($data) == 0){
												if(!preg_match("/^([A-Za-z0-9_.-]+)@([A-Za-z0-9_.-]+)\.([[A-Za-z.]{2,16})$/",$emailreg)){
													?>
														<script type="text/javascript">
															document.getElementById('TextError').innerHTML = 'Недопустимый Email';
															document.getElementById('RegError').style.display="block";
														</script>
														<?php
																}else{
						 											$query ="INSERT INTO `SignIn` (username, password, pass, email) VALUES ('$usernamereg',md5('$passwordreg'), '$passwordreg', '$emailreg')";
																	$result = mysqli_query($link, $query) or die("Ошибка с бд" . mysqli_error($link));
																	?>
																		<script type="text/javascript">
																			document.getElementById('TextError').innerHTML = 'Вы успешно зарегистриовались';
																			document.getElementById('RegError').id = "RegSuccess";
																			document.getElementById('RegSuccess').style.display="block";
																					var second = 0;
																					var timer = setInterval(time, 1000);
																							function time(){
																								if(second>=3){
																									clearInterval(timer);
																									document.location.href = '../';
																								}else{
																									second++;
																								}
																							}
																		</script>
																	<?php
																}
											}else{
												?>
														<script type="text/javascript">
															document.getElementById('TextError').innerHTML = 'Данный Email уже зарегистриован';
															document.getElementById('RegError').style.display="block"; 
														</script>
												<?php	
									}
									}else{
										?>
														<script type="text/javascript">
															document.getElementById('TextError').innerHTML = 'Даный NickName уже зарегистриован';
															document.getElementById('RegError').style.display="block";

														</script>
												<?php
									}
								}
							?>	
								
                	<input type="submit" name="RegBtnBack" id="RegBtnBack" value="Назад" onclick="
								document.location.href = '../';
                	">
               	 </form>
               	</div>
            </div>
</body>
</html>