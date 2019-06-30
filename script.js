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
    if (upPressed){
        thisPlayer.smeshY+=5;
        thisPlayer.y+=5;
    }
    if (downPressed){
        thisPlayer.smeshY-=5;
        thisPlayer.y-=5;
    }
    if (rightPressed){
        thisPlayer.smeshX+=5;
        thisPlayer.x+=5;
    }
    if (leftPressed){
        thisPlayer.smeshX-=5;
        thisPlayer.x-=5;
    }
    drawWorld();
}

function drawWorld(){
    let bgImg=new Image();
    bgImg.src="src/MainMenuBackGround.gif";
    ctx.beginPath();
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    let chunk=thisPlayer.getChunk();
    //получаем чанк, в котором находится игрок
    let drawbleChunk=Array();
    drawbleChunk.push(chunk-502);
    drawbleChunk.push(chunk-501);
    drawbleChunk.push(chunk-500);
    drawbleChunk.push(chunk-499);
    drawbleChunk.push(chunk-498);
    drawbleChunk.push(chunk-2);
    drawbleChunk.push(chunk-1);
    drawbleChunk.push(chunk);
    drawbleChunk.push(chunk+1);
    drawbleChunk.push(chunk+2);
    drawbleChunk.push(chunk+498);
    drawbleChunk.push(chunk+499);
    drawbleChunk.push(chunk+500);
    drawbleChunk.push(chunk+501);
    drawbleChunk.push(chunk+502);
    //составляем список рисуемых чанков
    let x=canvas.width/2-1562.5-thisPlayer.smeshX;
    let y=canvas.height/2-937.5+thisPlayer.smeshY;
    //считаем стартовые координаты
    let countChunk=0;
    let countChunkY=0;
    let i=0;
    while (i<15){
        let j=0;
        let countBlock=0;
        while (j<625){
            if (j==0){
                ctx.beginPath();
                ctx.fillStyle="black";
                ctx.fillRect(x, y, 25, 25);
                ctx.fillStyle="white";
                ctx.fontStyle="22px Verdana";
                ctx.fillText(i, x, y);
                ctx.closePath();
            }
            if (countBlock==25){
                y+=25;
                x-=625;
                countBlock=0;
            }
            let dChunk=drawbleChunk[i];
            let blockId=world.world[dChunk][j];
            if (blockId!=0){
                let drawbleBlock=blocks[blockId];
                ctx.beginPath();
                ctx.drawImage(drawbleBlock.texture, x, y, 25, 25);
                ctx.closePath();
            }
            x+=25;
            j++;
            countBlock++;
        }
        countChunk++;
        if (countChunk==5){
            y+=25;
            countChunkY+=1;
            countChunk=0;
            x=canvas.width/2-1562.5-thisPlayer.smeshX;
        }else{
            x=canvas.width/2-1562.5+625*countChunk-thisPlayer.smeshX;
            y=canvas.height/2-937.5+625*countChunkY+thisPlayer.smeshY;
        }
        i++;
    }
}

function player(x, y, texture, smeshX, smeshY){
    this.x=x;
    this.y=y;
    this.smeshX=smeshX;
    this.smeshY=smeshY;
    this.texture=new Image();
    this.texture.src=texture;
    this.getChunk=function(){
        if (this.x<0){
            let playerX=this.x*-1;
            var chunkX=playerX/625;
            chunkX=parseInt(chunkX, 10);
            chunkX=250-chunkX;
        }
        if (this.x>0){
            var chunkX=this.x/625;
            chunkX=parseInt(chunkX, 10)
            chunkX=250+chunkX;
        }
        if (this.x==0){
            var chunkX=250;
        }
        if (this.y<0){
            let playerY=this.y*-1;
            var chunkY=playerY/625;
            chunkY=parseInt(chunkY, 10);
            chunkY=3-chunkY;
        }
        if (this.y>0){
            var chunkY=this.y/625;
            chunkY=parseInt(chunkY, 10)
            chunkY=3+chunkY;
        }
        if (this.y==0){
            var chunkY=3;
        }
        let chunk=chunkY*500+chunkX;
        chunk=parseInt(chunk, 10);
        return chunk;
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
    window.thisPlayer=new player(0, 0, "src/player_models/buffalo.png", 0, 0);
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

