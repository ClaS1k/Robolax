function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function block(id, texture, touchble){
    //конструктор объекта блока
    this.id=id;
    this.touchble=touchble;
    this.texture=new Image();
    this.texture.src=texture;
}

function gameInit(){
    //инициализация игры
    var canvas=document.getElementById('gameCanvas');
    var ctx=canvas.getContext('2d');
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
    var blocks=Array();
    //загружаем текстуры блоков
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
        let chunk=Array();
        switch (type){
            
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

