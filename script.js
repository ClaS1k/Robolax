window.onresize=function(){
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
}

function keyDownHandler(e){
    let keyCode=e.keyCode;
    if (keyCode==69){
        destroyPressed=true;
    }
    if (keyCode==32){
        jumpPressed=true;
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
    if (keyCode==69){
        destroyPressed=false;
    }
    if (keyCode==32){
        jumpPressed=false;
    }
    if (keyCode==68){
        rightPressed=false;
    }
    if (keyCode==65){
        leftPressed=false;
    }
}

function checkCords(cordX, cordY){
    //вычисление id блока по координатам cordX и cordY
    let chunkX=parseInt(cordX/625);
    let chunkY=parseInt(cordY/625);
    let chunkNum=chunkY*500+chunkX;
    let blockX=parseInt((cordX%625)/25);
    let blockY=parseInt((cordY%625)/25);
    let blockNum=blockY*25+blockX;
    let returnable=Array(2);
    returnable[0]=chunkNum;
    returnable[1]=blockNum;
    return returnable;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    thisPlayer.speedCount();
    thisPlayer.move();
    if (destroyPressed){
        let data=checkCords(thisPlayer.x+10, thisPlayer.y);
        world.world[data[0]][data[1]]=0;
        data=checkCords(thisPlayer.x-10, thisPlayer.y);
        world.world[data[0]][data[1]]=0;
        data=checkCords(thisPlayer.x, thisPlayer.y+10);
        world.world[data[0]][data[1]]=0;
        data=checkCords(thisPlayer.x, thisPlayer.y-10);
        world.world[data[0]][data[1]]=0;
    }
    drawWorld();
    ctx.beginPath();
    ctx.rect(canvas.width/2-25, canvas.height/2-37.5, 50, 75);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}

function drawWorld(){
    let bgImg=new Image();
    bgImg.src="src/MainMenuBackGround.gif";
    ctx.beginPath();
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    let i=0;
    let x=0-thisPlayer.x+canvas.width/2;
    let y=0-thisPlayer.y+canvas.height/2;
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
                x=0-thisPlayer.x+625*countXBig+countX*25+canvas.width/2;
                y=0-thisPlayer.y+625*countYBig+countY*25+canvas.height/2;
                j++;
            }
            countXBig+=1;
            if (countXBig==500){
                countYBig+=1;
                countXBig=0;
            }
            x=0-thisPlayer.x+625*countXBig+canvas.width/2;
            y=0-thisPlayer.y+625*countYBig+canvas.height/2;
        }else{
            countXBig+=1;
            if (countXBig==500){
                countYBig+=1;
                countXBig=0;
            }
            x=0-thisPlayer.x+625*countXBig+canvas.width/2;
            y=0-thisPlayer.y+625*countYBig+canvas.height/2;
        }
        i++;
    }
}

function player(x, y, texture){
    this.x=x;
    this.y=y;
    this.texture=new Image();
    this.texture.src=texture;
    this.speedX=0;
    this.speedY=0;
    this.accelerationX=0;
    this.accelerationY=0;
    this.inAir=function(){
        let point1=checkCords(this.x-25, this.y+37.5);
        let point2=checkCords(this.x, this.y+37.5);
        let point3=checkCords(this.x+25, this.y+37.5);
        let blockid=world.world[point1[0]][point1[1]];
        let block=blocks[blockid];
        if (block.touchble){
            return false;
        }else{
            let blockid=world.world[point2[0]][point2[1]];
            let block=blocks[blockid];
            if (block.touchble){
                return false;
            }else{
                let blockid=world.world[point3[0]][point3[1]];
                let block=blocks[blockid];
                if (block.touchble){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
    this.move=function(){
        //функция передвижения игрока
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    this.speedCount=function(){
        //расчёт скорости и ускорения
        if (rightPressed){
            if (this.accelerationX<4){
                this.accelerationX+=4;
            }
        }
        if (leftPressed){
            if (this.accelerationX>-4){
                this.accelerationX-=4;
            }
        }
        if (!rightPressed && !leftPressed){
            this.accelerationX=0;
            if (this.speedX>0){
                this.speedX-=1;
            }
            if (this.speedX<0){
                this.speedX+=1;
            }
        }
        if (jumpPressed){
            if (!this.inAir){
                if (this.accelerationY>-4){
                    this.accelerationY-=4;
                }
            }
        }
        if (this.inAir){
            this.accelerationY+=world.gravity;
        }else{
            this.accelerationY=0;
        }
        if (this.accelerationX>0){
            if (this.speedX<6){
                this.speedX+=this.accelerationX;
            }
        }
        if (this.accelerationX<0){
            if (this.speedX>-6){
                this.speedX+=this.accelerationX;
            }
        }
        if (this.accelerationY>0){
            if (this.speedY<30){
                this.speedY+=this.accelerationY;
            }
        }
        if (this.speedX>0){
            let point1=checkCords(this.x+25+this.speedX, this.y+37.5);
            let point2=checkCords(this.x+25+this.speedX, this.y);
            let point3=checkCords(this.x+25+this.speedX, this.y-37.5);
            let blockid=world.world[point1[0]][point1[1]];
            let block=blocks[blockid];
            if (block.touchble){
                this.speedX=0;
            }else{
                let blockid=world.world[point2[0]][point2[1]];
                let block=blocks[blockid];
                if (block.touchble){
                    this.speedX=0;
                }else{
                    let blockid=world.world[point3[0]][point3[1]];
                    let block=blocks[blockid];
                    if (block.touchble){
                        this.speedX=0;
                    }
                }
            }
        }
        if (this.speedY>0){
            let point1=checkCords(this.x+25, this.y+37.5+this.speedY);
            let point2=checkCords(this.x, this.y+37.5+this.speedY);
            let point3=checkCords(this.x-25, this.y+37.5+this.speedY);
            let blockid=world.world[point1[0]][point1[1]];
            let block=blocks[blockid];
            if (block.touchble){
                this.speedY=0;
            }else{
                let blockid=world.world[point2[0]][point2[1]];
                let block=blocks[blockid];
                if (block.touchble){
                    this.speedY=0;
                }else{
                    let blockid=world.world[point3[0]][point3[1]];
                    let block=blocks[blockid];
                    if (block.touchble){
                        this.speedY=0;
                    }
                }
            }
        }
        if (this.speedX<0){
            let point1=checkCords(this.x-25-this.speedX, this.y+37.5);
            let point2=checkCords(this.x-25-this.speedX, this.y);
            let point3=checkCords(this.x-25-this.speedX, this.y-37.5);
            let blockid=world.world[point1[0]][point1[1]];
            let block=blocks[blockid];
            if (block.touchble){
                this.speedY=0;
            }else{
                let blockid=world.world[point2[0]][point2[1]];
                let block=blocks[blockid];
                if (block.touchble){
                    this.speedY=0;
                }else{
                    let blockid=world.world[point3[0]][point3[1]];
                    let block=blocks[blockid];
                    if (block.touchble){
                        this.speedY=0;
                    }
                }
            }
        }
        if (this.speedY<0){
            let point1=checkCords(this.x+25, this.y-37.5-this.speedY);
            let point2=checkCords(this.x, this.y-37.5-this.speedY);
            let point3=checkCords(this.x-25, this.y-37.5-this.speedY);
            let blockid=world.world[point1[0]][point1[1]];
            let block=blocks[blockid];
            if (block.touchble){
                this.speedY=0;
            }else{
                let blockid=world.world[point2[0]][point2[1]];
                let block=blocks[blockid];
                if (block.touchble){
                    this.speedY=0;
                }else{
                    let blockid=world.world[point3[0]][point3[1]];
                    let block=blocks[blockid];
                    if (block.touchble){
                        this.speedY=0;
                    }
                }
            }
        }
    }
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
    window.jumpPressed=false;
    window.rightPressed=false;
    window.leftPressed=false;
    window.destroyPressed=false;
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

