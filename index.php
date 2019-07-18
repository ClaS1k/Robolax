<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>RobolaX</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="script.js"></script>
        <script src="scriptSecond.js"></script>
    </head>
    <body>
        <div class="content" id="content">
        <div class="singlePlayerMenu" id="singlePlayerMenu">
            <div class="startSinglePlayerGame">
                    <img src="src/UI/newGame.png" class="startSinglePlayerGameImg" onclick="startSinglePlayerGame()">
                </div>
                <div class="loadSinglePlayerGame">
                    <img src="src/UI/loadGame.png" class="loadSinglePlayerGameImg" onclick="loadSinglePlayerGame()">
                </div>
                <div class="singlePlayerMenuBack">
                    <img src="src/UI/back.png" class="singlePlayerMenuBackImg" onclick="singlePlayerMenuBack()">
                </div>
        </div>
            <img class="backGround" src="src/MainMenuBackGround.gif">
            <div class="mainMenu" id="mainMenu">
                <div class="singlePlayer">
                    <img src="src/UI/singleplayer.png" class="singlePlayerImg" onclick="singlePlayerMenu()">
                </div>
                <div class="multiPlayer">
                    <img src="src/UI/multiplayer.png" class="multiPlayerImg" onclick="multiPlayerMenu()">
                </div>
                <div class="settings">
                    <img src="src/UI/settings.png" class="settingsImg" onclick="settingsMenu()">
                </div>
                <div class="help">
                    <img src="src/UI/help.png" class="helpImg" onclick="helpMenu()">
                </div>
            </div>
            <div class="Auth" id="Auth">
            	<div class="AuthHeader">
            		<div id="AuthHeader">
            			<a id="TextAuth">Авторизация</a>
            		</div>
            	</div>
            	<div class="NotValid">
            			<div id="NotValid">
            				<a id="TextNotValid">Логин или пароль не верны</a>
            			</div>
            	</div>
            	<div class="FormAuth">
            		<a class="LogImgOfAuth"></a>
            		<a class="KeyImgOfAuth"></a>
               	 <form method="post">
             		<input type="text" id="login" name="username" placeholder="NickName" required>
                	<input type="password" id="pass" name="password" placeholder="Password" required>
                	<input type="submit" id="authBTN" name="authbtn" value="Войти">
							<?php
								$host = 'localhost'; 
								$db = 'authme';
								$user = 'root';
								$password = '';

										$link = mysqli_connect($host, $user, $password, $db) or die("Ошибка " . mysqli_error($link));

										if(isset($_POST['username']) && isset($_POST['password'])){
										session_start(); 
												$username = $_POST['username']; 
												$password = $_POST['password'];  
											$log = "SELECT * FROM `signin` WHERE username = '$username' and pass = '$password'";
											$data = mysqli_query($link, $log);
										if(mysqli_num_rows($data) == 1){
												$result = mysqli_query($link, $log) or die("Ошибка с бд" . mysqli_error($link)); 
												if($result){
													?>
		 												<script>
		 													document.getElementById('Auth').style.display="none"; 
															document.getElementById('mainMenu').style.display="block";
		 												</script>
		 											<?php
		   										}else{
		 											?>
		 												<script>
		 													document.getElementById('NotValid').style.display="block"; 
		 													document.getElementById('login').style.border="1px solid rgba(255,0,0,.9)";
		 													document.getElementById('pass').style.border="1px solid rgba(255,0,0,.9)";
		 													document.getElementById('login').style.height = "43px";
		 													document.getElementById('pass').style.height = "43px";
		 												</script>
		 											<?php
		 										}
											}else{
		 											?>
		 												<script>
		 													document.getElementById('NotValid').style.display="block"; 
		 													document.getElementById('login').style.border="1px solid rgba(255,0,0,.9)";
		 													document.getElementById('pass').style.border="1px solid rgba(255,0,0,.9)";
		 													document.getElementById('login').style.height = "43px";
		 													document.getElementById('pass').style.height = "43px";
		 												</script>
		 											<?php
		 									}	
										}
										?>
               	 </form>
               	</div>
               		<div class="RegistrationBTNinAuthwindow">
               			<button id="regBTN" onclick="
               			document.location.href = 'authfolder/registration.php';
               			">Зaрегистрироваться</button>
               		</div>
               		<div class="TxtOfAuth">
               			<a id="WidthOutReg" onclick="
               			document.getElementById('Auth').style.display='none'; 
						document.getElementById('mainMenu').style.display='block';
						">Продолжить без авторизации</a>
               			<a id="DontKnow" onclick="">Забыл пароль</a>
               		</div>
            </div>
        </div>
        <canvas id="gameCanvas">Обновите браузер!</canvas>
    </body>
</html>