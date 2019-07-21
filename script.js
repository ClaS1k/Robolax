window.onresize=function(){
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
}

function keyDownHandler(e){
    let keyCode=e.keyCode;
    if (keyCode==87){
        upPressed=true;
    }
    if (keyCode==83){
        downPressed=true;
    }
    if (keyCode==68){
        rightPressed=true;
    }
    if (keyCode==65){
        leftPressed=true;
    }
}

function keyUpHandler(e){
    let keyCode=e.keyCode;
    if (keyCode==87){
        upPressed=false;
    }
    if (keyCode==83){
        downPressed=false;
    }
    if (keyCode==68){
        rightPressed=false;
    }
    if (keyCode==65){
        leftPressed=false;
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('done!');
    if (upPressed){
        thisPlayer.y-=5;
    }
    if (downPressed){
        thisPlayer.y+=5;
    }
    if (rightPressed){
        thisPlayer.x+=7;
    }
    if (leftPressed){
        thisPlayer.x-=7;
    }
    drawWorld();
}

function drawWorld(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let bgImg=new Image();
    bgImg.src="src/MainMenuBackGround.gif";
    ctx.beginPath();
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    let i=0;
    let x=0-thisPlayer.x;
    let y=0-thisPlayer.y;
    let countXBig=0;
    let countYBig=0;
    while (i<10000){
        if (x>-1800 && x<1800 && y>-1500 && y<+1500){
            let j=0;
            let countX=0;
            let countY=0;
            while (j<625){
                let blockId=world.world[i][j];
                let drawbleBlock=blocks[blockId];
                if (drawbleBlock.texture!=null){
                    ctx.beginPath();
                    ctx.drawImage(drawbleBlock.texture, x, y, 25, 25);
                    ctx.closePath();
                }
                countX++;
                if (countX==25){
                    countY+=1;
                    countX=0;
                }
                x=0-thisPlayer.x+625*countXBig+countX*25;
                y=0-thisPlayer.y+625*countYBig+countY*25;
                j++;
            }
            countXBig+=1;
            if (countXBig==501){
                countYBig+=1;
                countXBig=0;
            }
            x=0-thisPlayer.x+625*countXBig;
            y=0-thisPlayer.y+625*countYBig;
        }else{
            countXBig+=1;
            if (countXBig==501){
                countYBig+=1;
                countXBig=0;
            }
            x=0-thisPlayer.x+625*countXBig;
            y=0-thisPlayer.y+625*countYBig;
        }
        i++;
    }
}

function player(x, y, texture){
    this.x=x;
    this.y=y;
    this.texture=new Image();
    this.texture.src=texture;
}

function block(id, texture, touchble){
    //конструктор объекта блока
    this.id=id;
    this.touchble=touchble;
    if (texture!=null){
        this.texture=new Image();
        this.texture.src=texture;
    }
}

function gameInit(){
    //инициализация игры
    window.canvas=document.getElementById('gameCanvas');
    window.ctx=canvas.getContext('2d');
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
    window.thisPlayer=new player(156250, 1650, "src/player_models/buffalo.png");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    window.upPressed=false;
    window.downPressed=false;
    window.rightPressed=false;
    window.leftPressed=false;
    window.blocks=Array(50);
    //загружаем текстуры блоков
    blocks[0]=new block(0, null, false);
    blocks[1]=new block(1, "src/blocks/grass.png", true);
    blocks[2]=new block(2, "src/blocks/dirt.png", true);
    blocks[3]=new block(3, "src/blocks/stone.png", true);
}

function getRandom(min, max) {
    //случайное целое число от min до max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function World(){
    //генерация мира
    this.gravity=1;
    this.backGround=getRandom(1, 5);
    this.world=Array();
    this.buildWorld=function(){
        let j=0;
        while (j<10000){
            if (j<1500){
                this.world[j]=this.genChunk('air');
            }
            if (j>=1500 && j<2000){
                this.world[j]=this.genChunk('forest');
            }
            if (j>=2000){
                this.world[j]=this.genChunk('underground');
            }
            j++;
        }
    }
    this.genChunk=function(type){
        //функция генерации чанка
        let chunk=Array(625);
        switch (type){
            case 'air':
                var i=0;
                while (i<625){
                    chunk[i]=0;
                    i++;
                }
            break;
            case 'forest':
                var i=0;
                while (i<625){
                    if (i<50){
                        //первые два ряда блоков
                        chunk[i]=0;
                    }
                    if (i>=50 && i<75){
                        //третий ряд(воздух либо трава)
                        chunk[i]=getRandom(0, 1);
                    }
                    if (i>=75 && i<100){
                        //четвёртый ряд
                        if (chunk[i-25]!=0){
                            //если блоком выше трава, то ставим трава
                            chunk[i]=1;
                        }else{
                            //иначе выбираем блок случайным образом
                            chunk[i]=getRandom(0, 1);
                        }
                    }
                    if (i>=100 && i<125){
                        //пятый ряд блоков(всегда трава)
                        chunk[i]=1;
                    }
                    if (i>=125 && i<175){
                        //6-8 ряды, всегда земля
                        chunk[i]=2;
                    }
                    if (i>=175){
                        //глубже в этом чанке только камень
                        chunk[i]=3;
                    }
                    i++;
                }
            break;
            case 'underground':
                //Всё, что под землёй
                var i=0;
                while (i<625){
                    chunk[i]=3;
                    i++;
                }
            break;
        }
        return chunk;
    }
}

function startSinglePlayerGame(){
    //начало новой одиночной игры
    gameInit();
    document.getElementById('content').style.display="none";
    canvas.style.display="block";
    window.world=new World();
    world.buildWorld();
    var interval=setInterval(draw, 30);
}

function singlePlayerMenuBack(){
    document.getElementById('mainMenu').style.display="block";
    document.getElementById('singlePlayerMenu').style.display="none";
}

function singlePlayerMenu(){
    document.getElementById('mainMenu').style.display="none";
    document.getElementById('singlePlayerMenu').style.display="block";
}

function multiPlayerMenu(){
    alert('Данный режим пока недоступен!');
}

function settingsMenu(){
    //code
}

function helpMenu(){
    //code
}

