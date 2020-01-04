window.onresize=function(){
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
}

var config=new Object();
config.light=true;

function keyDownHandler(e){
    let keyCode=e.keyCode;
    if (keyCode==32){
        jumpPressed=true;
    }
    if (keyCode==68){
        rightPressed=true;
    }
    if (keyCode==65){
        leftPressed=true;
    }
    if (keyCode==49){
        thisPlayer.selected_item=0;
    }
    if (keyCode==50){
        thisPlayer.selected_item=1;
    }
    if (keyCode==51){
        thisPlayer.selected_item=2;
    }
    if (keyCode==52){
        thisPlayer.selected_item=3;
    }
    if (keyCode==53){
        thisPlayer.selected_item=4;
    }
    if (keyCode==54){
        thisPlayer.selected_item=5;
    }
    if (keyCode==55){
        thisPlayer.selected_item=6;
    }
    if (keyCode==56){
        thisPlayer.selected_item=7;
    }
    if (keyCode==73){
        inventory_open();
    }
    if (keyCode==67){
        craft_open();
    }
    if (keyCode==69){
        if (craft_opened){
            let craft_list=[];
            let help_items=[];
            let k=0;
            let i=0;
            while (i<36){
                if (thisPlayer.inventory[i].id!=0){
                    switch (thisPlayer.inventory[i].id){
                        case 3:
                        craft_list[i]=11;
                        help_items[k]=i;
                        k++;
                    break;
                    case 12:
                        craft_list[i]=16;
                        help_items[k]=i;
                        k++;
                    break;
                    case 13:
                        craft_list[i]=17;
                        help_items[k]=i;
                        k++;
                    break;
                    case 14:
                        craft_list[i]=18;
                        help_items[k]=i;
                        k++;
                    break;
                    case 15:
                        craft_list[i]=19;
                        help_items[k]=i;
                        k++;
                    break;
                    }
                }
                i++;
            }
            let recept=blocks[craft_list[help_items[thisPlayer.selected_craft]]].recept;
            let material_id=recept[0];
            let material_mass=recept[1];
            i=0;
            while(i<36){
                if(thisPlayer.inventory[i].id==material_id){
                    if (thisPlayer.inventory[i].mass>=material_mass){
                        let k=0;
                        while (k<36){
                            if (thisPlayer.inventory[k].id==0){
                                thisPlayer.inventory[i].mass-=material_mass;
                                thisPlayer.inventory[k].id=blocks[craft_list[help_items[thisPlayer.selected_craft]]].id;
                                thisPlayer.inventory[k].mass+=1;
                                k=36;
                            }
                            k++;
                        }
                        i=36;
                    }else{
                        i=36;
                    }
                }else{
                    i++;
                }
            }
        }
        if (furance_opened){
            let craft_list=[];
            let help_items=[];
            let k=0;
            let i=0;
            while (i<36){
                switch (thisPlayer.inventory[i].id){
                    case 4:
                        help_items[k]=i;
                        k++;
                        craft_list[i]=12;
                        //железо
                    break;
                    case 5:
                        help_items[k]=i;
                        k++;
                        craft_list[i]=13;
                        //серебро
                    break;
                    case 6:
                        help_items[k]=i;
                        k++;
                        craft_list[i]=14;
                        //золото
                    break;
                    case 7:
                        help_items[k]=i;
                        k++;
                        craft_list[i]=15;
                        //алмаз
                    break;
                }
                i++;
            }
            let recept=blocks[craft_list[help_items[thisPlayer.selected_furance]]].recept;
            let material_id=recept[0];
            let material_mass=recept[1];
            i=0;
            k=0;
            while(i<36){
                if(thisPlayer.inventory[i].id==material_id){
                    if (thisPlayer.inventory[i].mass>=material_mass){
                        let k=0;
                        while (k<36){
                            if (thisPlayer.inventory[k].id==0 || thisPlayer.inventory[k].id==craft_list[help_items[thisPlayer.selected_furance]]){
                                thisPlayer.inventory[i].mass-=material_mass;
                                thisPlayer.inventory[k].id=blocks[craft_list[help_items[thisPlayer.selected_furance]]].id;
                                thisPlayer.inventory[k].mass+=1;
                                k=36;
                            }
                            k++;
                        }
                        i=36;
                    }else{
                        i=36;
                    }
                }else{
                    i++;
                }
            }
        }
    }
    if (keyCode==82){
        if (furance_opened){
            if(thisPlayer.selected_furance==3){
                thisPlayer.selected_furance=0;
            }else{
                thisPlayer.selected_furance++;
            }
        }
        if (craft_opened){
            if(thisPlayer.selected_craft==3){
                thisPlayer.selected_craft=0;
            }else{
                thisPlayer.selected_craft++;
            }
        }
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

function open_furance_menu(){
    if(furance_opened){
        furance_opened=false;
    }else{
        furance_opened=true;
    }
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
    drawInterface();
    ctx.beginPath();
    ctx.rect(canvas.width/2-25, canvas.height/2-37.5, 50, 75);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
    drawInterface();
}

function drawWorld(){
    let bgImg=new Image();
    if (thisPlayer.y>2500){
        bgImg.src="src/backgrounds/underground.jpg";
    }else{
        bgImg.src="src/MainMenuBackGround.gif";
    }
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
                drawbleBlock=blocks[blockId];
                if (drawbleBlock.texture!=null){
                    ctx.beginPath();
                    ctx.drawImage(drawbleBlock.texture, x, y, 25, 25);
                    ctx.closePath();
                    if (config.light){
                        block_1=checkCords(thisPlayer.x-canvas.width/2+x+12.5-25, thisPlayer.y-canvas.height/2+y-12.5-25);
                        //дальняяя группа
                        block_2=checkCords(thisPlayer.x-canvas.width/2+x+12.5-25, thisPlayer.y-canvas.height/2+y-12.5);
                        //ближняя группа
                        block_3=checkCords(thisPlayer.x-canvas.width/2+x+12.5-25, thisPlayer.y-canvas.height/2+y-12.5+25);
                        //дальняя группа
                        block_4=checkCords(thisPlayer.x-canvas.width/2+x+12.5, thisPlayer.y-canvas.height/2+y-12.5-25);
                        //ближняя группа 
                        block_5=checkCords(thisPlayer.x-canvas.width/2+x+12.5, thisPlayer.y-canvas.height/2+y-12.5+25);
                        //ближняя группа
                        block_6=checkCords(thisPlayer.x-canvas.width/2+x+12.5+25, thisPlayer.y-canvas.height/2+y-12.5-25);
                        //дальняя группа
                        block_7=checkCords(thisPlayer.x-canvas.width/2+x+12.5+25, thisPlayer.y-canvas.height/2+y-12.5);
                        //ближняя группа
                        block_8=checkCords(thisPlayer.x-canvas.width/2+x+12.5+25, thisPlayer.y-canvas.height/2+y-12.5+25);
                        //дальняя группа
                        block_9=checkCords(thisPlayer.x-canvas.width/2+x+12.5, thisPlayer.y-canvas.height/2+y-12.5);
                        //центральный блок
                        block_1=world.world[block_1[0]][block_1[1]];
                        block_2=world.world[block_2[0]][block_2[1]];
                        block_3=world.world[block_3[0]][block_3[1]];
                        block_4=world.world[block_4[0]][block_4[1]];
                        block_5=world.world[block_5[0]][block_5[1]];
                        block_6=world.world[block_6[0]][block_6[1]];
                        block_7=world.world[block_7[0]][block_7[1]];
                        block_8=world.world[block_8[0]][block_8[1]];
                        block_9=world.world[block_9[0]][block_9[1]];
                        if (!blocks[block_9].is_light){
                            //проверяем ближнюю группу: 2, 4, 5, 7
                            if (blocks[block_2].is_light || blocks[block_4].is_light || blocks[block_5].is_light || blocks[block_7].is_light){
                                ctx.beginPath();
                                ctx.rect(x, y-1, 25, 25.2);
                                ctx.fillStyle="rgba(0, 0, 0, 0.3)";
                                ctx.fill();
                                ctx.closePath();
                            }else if(blocks[block_1].is_light || blocks[block_3].is_light || blocks[block_6].is_light || blocks[block_8].is_light){
                                //проверяем дальнюю группу: 1, 3, 6, 8
                                ctx.beginPath();
                                ctx.rect(x, y-1, 25, 25.2);
                                ctx.fillStyle="rgba(0, 0, 0, 0.5)";
                                ctx.fill();
                                ctx.closePath();
                            }else{
                                ctx.beginPath();
                                ctx.rect(x, y-1, 25, 25.2);
                                ctx.fillStyle="rgba(0, 0, 0, 0.9)";
                                ctx.fill();
                                ctx.closePath();
                            }
                        }
                    }
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

function drawInterface(){
    ctx.beginPath();
    ctx.rect(22, 30, thisPlayer.hp , 5);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    //первый слот
    ctx.beginPath();
    ctx.rect(canvas.width-470, 30, 15 , 15);
    if (thisPlayer.selected_item==0){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==0){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[0].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-477.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //второй слот
    ctx.beginPath();
    ctx.rect(canvas.width-410, 30, 15 , 15);
    if (thisPlayer.selected_item==1){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==1){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[1].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-417.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //третий слот
    ctx.beginPath();
    ctx.rect(canvas.width-350, 30, 15 , 15);
    if (thisPlayer.selected_item==2){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==2){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[2].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-357.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //четвёртый слот
    ctx.beginPath();
    ctx.rect(canvas.width-290, 30, 15 , 15);
    if (thisPlayer.selected_item==3){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==3){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[3].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-297.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //пятый слот
    ctx.beginPath();
    ctx.rect(canvas.width-230, 30, 15 , 15);
    if (thisPlayer.selected_item==4){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==4){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[4].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-237.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //шестой слот
    ctx.beginPath();
    ctx.rect(canvas.width-170, 30, 15 , 15);
    if (thisPlayer.selected_item==5){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==5){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[5].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-177.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //седьмой слот
    ctx.beginPath();
    ctx.rect(canvas.width-110, 30, 15 , 15);
    if (thisPlayer.selected_item==6){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==6){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[6].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-117.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    //восьмой слот
    ctx.beginPath();
    ctx.rect(canvas.width-50, 30, 15 , 15);
    if (thisPlayer.selected_item==7){
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.fill();
    if (thisPlayer.selected_item==7){
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
    }else{
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.stroke();
    ctx.closePath();
    block_id=thisPlayer.inventory[7].id;
    if (block_id!==0){
        ctx.beginPath();
        ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
        ctx.closePath();  
    }
    if (furance_opened){
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width*0.7, 200, 150 , 400);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width*0.55, 200, 300 , 400);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        let craft_list=[];
        let help_items=[];
        let k=0;
        let i=0;
        while (i<36){
            switch (thisPlayer.inventory[i].id){
                case 4:
                    help_items[k]=i;
                    k++;
                    craft_list[i]=12;
                    //железо
                break;
                case 5:
                    help_items[k]=i;
                    k++;
                    craft_list[i]=13;
                    //серебро
                break;
                case 6:
                    help_items[k]=i;
                    k++;
                    craft_list[i]=14;
                    //золото
                break;
                case 7:
                    help_items[k]=i;
                    k++;
                    craft_list[i]=15;
                    //алмаз
                break;
            }
            i++;
        }
        let h=help_items.length;
        i=0;
        while(i<h){
            let help_container=help_items[i];
            help_container=craft_list[help_container];
            help_container=blocks[help_container];
            if (thisPlayer.selected_furance==i){
                ctx.beginPath();
                ctx.drawImage(help_container.texture, canvas.width-canvas.width*0.7+40, 215, 70, 70);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(help_container.name, canvas.width-canvas.width*0.7+40, 330 );
                ctx.closePath();
                ctx.beginPath();
                ctx.rect(canvas.width-canvas.width*0.55+10, 80*i+200, 260, 100);
                ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
                ctx.fill();
                ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
                ctx.lineJoin = 'round';
                ctx.lineWidth = 35;
                ctx.closePath();
                ctx.beginPath();
                ctx.drawImage(help_container.texture, canvas.width-canvas.width*0.55+10, 80*i+1+200, 70, 70);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(blocks[help_container.recept[0]].name+"X"+thisBlock.recept[1], canvas.width-canvas.width*0.55+100, 250+80*i+1);
                ctx.closePath();
            }else{
                ctx.beginPath();
                ctx.rect(canvas.width-canvas.width*0.55+10, 80*i+200, 260, 100);
                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                ctx.fill();
                ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
                ctx.lineJoin = 'round';
                ctx.lineWidth = 35;
                ctx.closePath();
                ctx.beginPath();
                ctx.drawImage(help_container.texture, canvas.width-canvas.width*0.55+10, 80*i+1+200, 70, 70);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(blocks[help_container.recept[0]].name+"X"+thisBlock.recept[1], canvas.width-canvas.width*0.55+100, 250+80*i+1);
                ctx.closePath();
            }
            i++;
        }
    }
    if (craft_opened){
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width*0.7, 200, 150 , 400);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width*0.55, 200, 300 , 400);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        let craft_list=[];
        let help_items=[];
        let k=0;
        let i=0;
        while (i<36){
            if (thisPlayer.inventory[i].id!=0){
                switch (thisPlayer.inventory[i].id){
                    case 3:
                        craft_list[i]=11;
                        help_items[k]=i;
                        k++;
                    break;
                    case 12:
                        craft_list[i]=16;
                        help_items[k]=i;
                        k++;
                    break;
                    case 13:
                        craft_list[i]=17;
                        help_items[k]=i;
                        k++;
                    break;
                    case 14:
                        craft_list[i]=18;
                        help_items[k]=i;
                        k++;
                    break;
                    case 15:
                        craft_list[i]=19;
                        help_items[k]=i;
                        k++;
                    break;
                }
            }
            i++;
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width*0.55+20, 220, 260 , 50);
        ctx.fillStyle = "rgba(0, 255, 17, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 255, 17, 0.4)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        thisItem=help_items[0];
        thisItem=craft_list[thisItem];
        thisBlock=blocks[thisItem];
        switch(thisPlayer.selected_craft){
            case 0:
                thisItem_h=help_items[0];
                thisItem_h=craft_list[thisItem_h];
                thisBlock_h=blocks[thisItem_h];
                ctx.beginPath();
                ctx.drawImage(thisBlock_h.texture, canvas.width-canvas.width*0.7+25, 210, 100, 100);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(thisBlock_h.name, canvas.width-canvas.width*0.7+40, 330 );
                ctx.closePath();
            break;
            case 1:
                thisItem_h=help_items[1];
                thisItem_h=craft_list[thisItem_h];
                thisBlock_h=blocks[thisItem_h];
                ctx.beginPath();
                ctx.drawImage(thisBlock_h.texture, canvas.width-canvas.width*0.7+25, 210, 100, 100);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(thisBlock_h.name, canvas.width-canvas.width*0.7+40, 330 );
                ctx.closePath();
            break;
            case 2:
                thisItem_h=help_items[2];
                thisItem_h=craft_list[thisItem_h];
                thisBlock_h=blocks[thisItem_h];
                ctx.beginPath();
                ctx.drawImage(thisBlock_h.texture, canvas.width-canvas.width*0.7+25, 210, 100, 100);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(thisBlock_h.name, canvas.width-canvas.width*0.7+40, 330 );
                ctx.closePath();
            break;
            case 3:
                thisItem_h=help_items[3];
                thisItem_h=craft_list[thisItem_h];
                thisBlock_h=blocks[thisItem_h];
                ctx.beginPath();
                ctx.drawImage(thisBlock_h.texture, canvas.width-canvas.width*0.7+25, 210, 100, 100);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.font = "italic 15pt Arial";
                ctx.fillText(thisBlock_h.name, canvas.width-canvas.width*0.7+40, 330 );
                ctx.closePath();
            break;
        }
        if (typeof(thisBlock.texture)=="object"){
            ctx.beginPath();
            ctx.drawImage(thisBlock.texture, canvas.width-canvas.width*0.55+30, 225, 40, 40);
            ctx.closePath();
        }
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font = "italic 15pt Arial";
        ctx.fillText(thisBlock.name, canvas.width-canvas.width*0.55+80, 252);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font = "italic 15pt Arial";
        ctx.fillText(blocks[thisBlock.recept[0]].name+"X"+thisBlock.recept[1], canvas.width-canvas.width*0.55+150, 252);
        ctx.closePath();
        
    }
    if (inventory_opened){
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-180, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[8].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-187.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-120, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[9].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-127.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-60, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[10].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-67.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[11].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-7.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+60, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[12].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+60-7.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+120, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[13].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+120-7.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+180, canvas.height*0.35, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[14].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+180-7.5, canvas.height*0.35-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-180, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[15].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-180-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-120, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[16].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-120-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-60, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[17].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-60-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[18].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+60, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[19].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+60-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+120, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[20].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+120-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+180, canvas.height*0.35+60, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[21].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2+180-7.5, canvas.height*0.35+60-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-180, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[22].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-canvas.width/2-180-7.5, canvas.height*0.35+120-8.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-120, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[23].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-60, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[24].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[25].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+60, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[26].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+120, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[27].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+180, canvas.height*0.35+120, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[28].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-180, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[29].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-120, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[30].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2-60, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[31].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[32].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+60, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[33].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+120, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[34].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
        ctx.beginPath();
        ctx.rect(canvas.width-canvas.width/2+180, canvas.height*0.35+180, 15 , 15);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35;
        ctx.stroke();
        ctx.closePath();
        block_id=thisPlayer.inventory[35].id;
        if (block_id!==0){
            ctx.beginPath();
            ctx.drawImage(blocks[block_id].texture, canvas.width-57.5, 22.5, 30, 30);
            ctx.closePath();  
        }
    }
}

function item(id, mass){
    this.id=id;
    this.mass=mass;
}

function player(x, y, texture, hp){
    this.hp=hp;
    this.x=x;
    this.y=y;
    this.inventory=[];
    this.selected_craft=0;
    this.selected_furance=0;
    let i=0;
    while (i<36){
        this.inventory[i]=new item(0, 0);
        i++;
    }
    this.texture=new Image();
    this.texture.src=texture;
    this.speedX=0;
    this.speedY=0;
    this.accelerationX=0;
    this.accelerationY=0;
    this.selected_item=0;
    this.getSelectedBlock=function(){
        let selected_block=this.inventory[this.selected_item];
        return selected_block.id;
    }
    this.inAir=function(){
        let point1=checkCords(this.x-25, this.y+39);
        let point2=checkCords(this.x, this.y+39);
        let point3=checkCords(this.x+25, this.y+39);
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
            if (!this.inAir()){
                if (this.accelerationY > -10){
                    this.accelerationY -= 10;
                }
            }
        }
        this.speedY+=this.accelerationY;
        if (this.inAir()){
            this.accelerationY+=world.gravity;
        }else{
            if (this.speedY>10){
                thisPlayer.hp-=10;
            }
            if (this.speedY>15){
                thisPlayer.hp-=20;
            }
            if (this.speedY>20){
                thisPlayer.hp-=40;
            }
            if (this.speedY>25){
                thisPlayer.hp-=70;
            }
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
            let point1=checkCords(this.x+22.5+this.speedX, this.y+36);
            let point2=checkCords(this.x+22.5+this.speedX, this.y);
            let point3=checkCords(this.x+22.5+this.speedX, this.y-36);
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
            let point1=checkCords(this.x+20, this.y+36+this.speedY);
            let point2=checkCords(this.x, this.y+36+this.speedY);
            let point3=checkCords(this.x-20, this.y+36+this.speedY);
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
            let point1=checkCords(this.x-22.5+this.speedX, this.y+36);
            let point2=checkCords(this.x-22.5+this.speedX, this.y);
            let point3=checkCords(this.x-22.5+this.speedX, this.y-36);
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
        if (this.speedY<0){
            let point1=checkCords(this.x+20, this.y-36-this.speedY);
            let point2=checkCords(this.x, this.y-36-this.speedY);
            let point3=checkCords(this.x-20, this.y-36-this.speedY);
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

function block(id, texture, touchble, name, recept, is_light){
    //конструктор объекта блока
    this.id=id;
    this.touchble=touchble;
    this.name=name;
    this.is_light=is_light;
    if (typeof(recept)=="object"){
        this.recept=recept;
    }
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
    canvas.addEventListener('click', function (e){
        let mouse_X=e.clientX;
        let mouse_Y=e.clientY;
        let x=thisPlayer.x-canvas.width/2+mouse_X;
        let y=thisPlayer.y-canvas.height/2+mouse_Y;
        if (Math.sqrt(Math.pow(thisPlayer.x-x,2)+Math.pow(thisPlayer.y-y,2))<300){
            if (thisPlayer.inventory[thisPlayer.selected_item].id==16){
                let point=checkCords(x-12.5, y-12.5);
                let blockid=world.world[point[0]][point[1]];
                let i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
            }else if(thisPlayer.inventory[thisPlayer.selected_item].id==17){
                let point=checkCords(x-12.5, y-12.5);
                let blockid=world.world[point[0]][point[1]];
                let i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
            }else if(thisPlayer.inventory[thisPlayer.selected_item].id==18){
                let point=checkCords(x-12.5, y-12.5);
                let blockid=world.world[point[0]][point[1]];
                let i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y+25);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y-25);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
            }else if(thisPlayer.inventory[thisPlayer.selected_item].id==19){
                let point=checkCords(x-12.5, y-12.5);
                let blockid=world.world[point[0]][point[1]];
                let i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y+25);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+25, y-25);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x-12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y-12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
                point=checkCords(x+12.5, y+12.5);
                blockid=world.world[point[0]][point[1]];
                i=0;
                world.setBlock(point[0], point[1], 0);
                while (i<36){
                    if (blockid==thisPlayer.inventory[i].id){
                        thisPlayer.inventory[i].mass+=1;
                        i=36;
                    }else{
                        if(thisPlayer.inventory[i].id==0){
                            thisPlayer.inventory[i].id=blockid;
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }
                    }
                    i++;
                }
            }else{
                let point=checkCords(x, y);
                let blockid=world.world[point[0]][point[1]];
                if (blockid==11){
                    open_furance_menu();
                }else{
                    let i=0;
                    world.setBlock(point[0], point[1], 0);
                    while (i<36){
                        if (blockid==thisPlayer.inventory[i].id){
                            thisPlayer.inventory[i].mass+=1;
                            i=36;
                        }else{
                            if(thisPlayer.inventory[i].id==0){
                                thisPlayer.inventory[i].id=blockid;
                                thisPlayer.inventory[i].mass+=1;
                                i=36;
                            }
                        }
                        i++;
                    }
                }
            }
        }
    });
    canvas.addEventListener('dblclick', function(e) {
        let mouse_X=e.clientX;
        let mouse_Y=e.clientY;
        let x=thisPlayer.x-canvas.width/2+mouse_X;
        let y=thisPlayer.y-canvas.height/2+mouse_Y;
        let point=checkCords(x, y);
        let blockid=world.world[point[0]][point[1]];
        if (blockid==0){
            if (thisPlayer.inventory[thisPlayer.selected_item].mass==0){
                thisPlayer.inventory[thisPlayer.selected_item].id=0;
            }else if(block_id!=11){
                world.world[point[0]][point[1]]=thisPlayer.getSelectedBlock();
                thisPlayer.inventory[thisPlayer.selected_item].mass-=1;
            }else{
                open_furance_menu();
            }
        }
    }, false);
    window.music=new Audio();
    window.music_id=getRandom(1, 20);
    window.music.src="src/music/"+window.music_id+".mp3";
    window.music.onended=function(){
        if (window.music_id==20){
            window.music_id=1;
        }else{
            window.music_id++;
        }
        window.music.src="src/music/"+window.music_id+".mp3";
        window.music.play();
    }
    window.music.volume=0.2;
    window.music.play();
    window.inventory_opened=false;
    window.craft_opened=false;
    window.furance_opened=false;
    window.thisPlayer=new player(156250, 1850, "src/player_models/buffalo.png", 100);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    window.jumpPressed=false;
    window.rightPressed=false;
    window.leftPressed=false;
    window.destroyPressed=false;
    window.blocks=Array(50);
    //загружаем текстуры блоков
    blocks[0]=new block(0, null, false, "", null, true);
    blocks[8]=new block(8, "src/blocks/trunk_bottom.png", false, "Основа дерева", null, false);
    blocks[9]=new block(9, "src/blocks/trunk_side.png", false, "Дерево", null, false);
    blocks[10]=new block(10, "src/blocks/leaves.png", false, "Листва", null, true);
    blocks[1]=new block(1, "src/blocks/grass.png", true, "Трава", null, false);
    blocks[2]=new block(2, "src/blocks/dirt.png", true, "Земля", null, false);
    blocks[3]=new block(3, "src/blocks/stone.png", true, "Камень", null, false);
    blocks[4]=new block(4, "src/blocks/stone_iron.png", true, "Железная руда", null, false);
    blocks[5]=new block(5, "src/blocks/stone_silver.png", true, "Серебряная руда", null, false);
    blocks[6]=new block(6, "src/blocks/stone_gold.png", true, "Золотая руда", null, false);
    blocks[7]=new block(7, "src/blocks/stone_diamond.png", true, "Алмазная руда", null, false);
    blocks[11]=new block(11, "src/blocks/oven.png", true, "Печь", [3, 10], true);
    blocks[12]=new block(12, "src/blocks/ore_iron.png", false, "Железо", [4, 1], false);
    blocks[13]=new block(13, "src/blocks/ore_silver.png", false, "Серебро", [5, 1], false);
    blocks[14]=new block(14, "src/blocks/ore_gold.png", false, "Золото", [6, 1], false);
    blocks[15]=new block(15, "src/blocks/ore_diamond.png", false, "Алмаз", [7, 1], false);
    blocks[16]=new block(16, "src/blocks/pick_iron.png", false, "Железная кирка", [12, 3, 9, 2], false);
    blocks[17]=new block(17, "src/blocks/pick_silver.png", false, "Серебряная кирка", [13, 3, 9, 2], false);
    blocks[18]=new block(18, "src/blocks/pick_gold.png", false, "Золотая кирка", [14, 3, 9, 2], false);
    blocks[19]=new block(19, "src/blocks/pick_diamond.png", false, "Серебряная кирка", [15, 3, 9, 2], false);
}

function getRandom(min, max) {
    //случайное целое число от min до max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function craft_open(){
    if (craft_opened){
        craft_opened=false;
    }else{
        craft_opened=true;
    }
}

function inventory_open(){
    if(inventory_opened){
        inventory_opened=false;
    }else{
        inventory_opened=true;
    }
}

function World(){
    //генерация мира
    this.gravity=0.05;
    this.backGround=getRandom(1, 5);
    this.world=Array();
    this.setBlock=function (line_num, chunk_num, block_id){
        this.world[line_num][chunk_num]=block_id;
    }
    this.buildWorld=function(){
        let j=0;
        while (j<10000){
            if (j<1500){
                this.world[j]=this.genChunk('air');
            }
            if (j>=1500 && j<2000){
                this.world[j]=this.genChunk('forest');
            }
            if (j>=2000 && j<2500){
                this.world[j]=this.genChunk('underground_level_1');
            }
            if (j>=2500 && j<3000){
                this.world[j]=this.genChunk('underground_level_2');
            }
            if (j>=3000 && j<3500){
                this.world[j]=this.genChunk('underground_level_3');
            }
            if (j>=3500){
                this.world[j]=this.genChunk('underground_level_4');
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
                let is_tree=getRandom(1, 100);
                if (is_tree>40){
                    is_tree=true;
                }else{
                    is_tree=false;
                }
                while (i<625){
                    if (is_tree){
                        if(i<250){
                            block=0;
                        }else if(i>=250 && i<275){
                            if (i<262 && i<267){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=275 && i<300){
                            if (i<286 && i<293){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=300 && i<325){
                            if (i<311 && i<318){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=325 && i<350){
                            if (i<336 && i<343){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=350 && i<375){
                            if (i<361 && i<368){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=375 && i<400){
                            if (i<386 && i<493){
                                block=10;
                            }else{
                                block=0;
                            }
                        }else if(i>=400 && i<425){
                            if (i<411 && i<418){
                                if (i>412 && i<417){
                                    block=9;
                                }else{
                                    block=10;
                                }
                            }else{
                                block=0;
                            }
                        }else if(i>=425 && i<450){
                            if (i<436 && i<443){
                                if (i>437 && i<442){
                                    block=9;
                                }else{
                                    block=10;
                                }
                            }else{
                                block=0;
                            }
                        }else if(i>=450 && i<475){
                            if (i<461 && i<468){
                                if (i>462 && i<467){
                                    block=9;
                                }else{
                                    block=10;
                                }
                            }else{
                                block=0;
                            }
                        }else if(i>=475 && i<500){
                            if (i<487 && i<492){
                                block=9;
                            }else{
                                block=0;
                            }
                        }else if(i>=500 && i<550){
                            block=1;
                        }else if(i>=550 && i<600){
                            block=2;
                        }else{
                            block=3;
                        }
                    }else{
                        if (i<500){
                            block=0;
                        }else if(i>=500 && i<550){
                            block=1;
                        }else if(i>=550 && i<600){
                            block=2;
                        }else{
                            block=3;
                        }
                    }
                    chunk[i]=block;
                    i++;
                }
            break;
            case 'underground_level_1':
                //Всё, что под землёй первый уровень
                var i=0;
                //Ж, С и З
                while (i<625){
                    let support=getRandom(1, 100);
                    let block;
                    if (support<80){
                        block=3;
                        //камень
                    }
                    if (support>=80 ){
                        block=4;
                        //железо
                    } 
                    chunk[i]=block;
                    i++;
                }
            break;
            case 'underground_level_2':
                //Всё, что под землёй 2 уровень
                var i=0;
                //Ж, С и З
                while (i<625){
                    let support=getRandom(1, 100);
                    let block;
                    if (support<70){
                        block=3;
                        //камень
                    }
                    if (support>=70 && support<90 ){
                        block=4;
                        //железо
                    } 
                    if (support>=90){
                        block=5;
                        //серебро
                    }
                    chunk[i]=block;
                    i++;
                }
            break;
            case 'underground_level_3':
                //Всё, что под землёй 3 уровень
                var i=0;
                //Ж, С и З
                while (i<625){
                    let support=getRandom(1, 100);
                    let block;
                    if (support<50){
                        block=3;
                        //камень
                    }
                    if (support>=50 && support<70 ){
                        block=4;
                        //железо
                    } 
                    if (support>=70 && support<90 ){
                        block=5;
                        //серебро
                    }
                    if (support>=90){
                        block=6;
                        //золото
                    }
                    chunk[i]=block;
                    i++;
                }
            break;
            case 'underground_level_4':
                //Всё, что под землёй 4 уровень
                var i=0;
                //Ж, С и З
                while (i<625){
                    let support=getRandom(1, 100);
                    let block;
                    if (support<30){
                        block=3;
                        //камень
                    }
                    if (support>=30 && support<55 ){
                        block=4;
                        //железо
                    } 
                    if (support>=55 && support<70 ){
                        block=5;
                        //серебро
                    }
                    if (support>=70 && support<85){
                        block=6;
                        //золото
                    }
                    if (support>=85){
                        block=7;
                        //алмаз
                    }
                    chunk[i]=block;
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
    window.interval=setInterval(draw, 30);
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

