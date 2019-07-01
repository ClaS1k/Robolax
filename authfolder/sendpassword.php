<!DOCTYPE html>
<html>
<head>
	<title>RobolaX</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="send.css">
</head>
<body>
		    <div class="SendMail" id="SendMail"> 
            	<div class="MailHeader">
            		<div id="MailHeader">
            			<a id="TextMail">Восстановление Пароля</a>
            		</div>
            	</div>
            	<div class="MailErrorBlock">
            			<div id="MailError">
            				<a id="TextError">Текст ошибки</a>
            			</div>
            	</div>
            	<div class="FormMail">
            		<a class="LinkImgOfMail"></a>
               	 <form method="post">
             		<input type="text" id="email" name="email" placeholder="Email" required>
                	<input type="submit" id="MailBTN" name="Mailbtn" value="Восстановить">
                	<?php  
									$host = 'localhost'; 
									$db = 'authme';
									$user = 'root';
									$password = '';
										if(Isset($_POST['email'])){
										$email = $_POST['email'];
									$link = mysqli_connect($host, $user, $password, $db) or die("Ошибка " . mysqli_error($link));
 										$per = "SELECT * FROM `signin` WHERE email = '$email'";
										$data = mysqli_query($link, $per);
											if(mysqli_num_rows($data) == 1){
												$pass = "SELECT pass FROM `signin` WHERE email = '$email'";
												$password = mysqli_fetch_row(mysqli_query($link, $pass));
												$username = "SELECT username FROM `signin` WHERE email = '$email'";
												$nickname = mysqli_fetch_row(mysqli_query($link, $username));
												?>
													<script type="text/javascript">
														document.getElementById('MailError').id = "MailSuccess";
														document.getElementById('MailSuccess').style.display = "block";
														document.getElementById('TextError').innerHTML = "Пароль был выслан на ваш Email";
													</script>
													<?php
													$subj = "Восстановление пароля RobolaX";
														$mess = '<h1 style="color: black;"> Утеря пароля, означает плохую память или малую посещаемость нашего проекта :(</h1> <br> 
                                                            <h2 style="color: black;">Ваши данные для входа RobolaX</h2><br> 
                                                            <a style="font-size: 18px;color: black;">Никнейм: '.$nickname[0].'</p><br> 
                                                            <a style="font-size: 18px;color: black;">Пароль: '.$password[0].'</p><br>
                                                            <h2 style="color: black;"> Если ты ещё раз забудешь, мы тебе поможим, хорошей игры )</h2> <br>';
                                                            $headers= "MIME-Version: 1.0\r\n";
                                                            $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
                                                            $headers .= "From: RobolaX\r\n";
													mail($email,$subj,$mess,$headers);
												}else{
												?>
													<script type="text/javascript">
														document.getElementById('MailError').style.display = "block";
														document.getElementById('TextError').innerHTML = "Данный Email не зарегистрирован";
													</script>
													<?php
											}
										}
							?>	
								
                	<input type="submit" name="MailBtnBack" id="MailBtnBack" value="Назад" onclick="
								document.location.href = '../';
                	">
               	 </form>
               	</div>
            </div>
</body>
</html>