function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    var canvas=document.getElementById('gameCanvas');
    var ctx=canvas.getContext('2d');
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
    var blocks=Array(50);
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

function generateWorld(){
    //генерация мира
    this.gravity=1;
    this.backGround=getRandom(1, 5);
    this.world=Array();
    this.genChunk=function(type){
        //функция генерации чанка
        let chunk=Array(625);
        switch (type){
            case 'air':
                let i=0;
                while (i<625){
                    chunk[i]=0;
                    i++;
                }
            break;
            case 'forest':
                let i=0;
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
        }
        return chunk;
    }
}

function startSinglePlayerGame(){
    //начало новой одиночной игры
    document.getElementById('content').style.display="none";
    gameInit();
    canvas.style.display="block";
    var world=generateWorld();
}

function loadSinglePlayerGame(){
    //code
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

