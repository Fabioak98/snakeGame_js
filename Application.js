const score = document.getElementById("score");
const best = document.getElementById("best");

let cv = document.getElementById('myCanvas');
let ctx = cv.getContext("2d");
let snakeB = new Array()
let bodyL = 5;

let vx = vy = 0;
let px = py = 9;
let tp = 15;
let mx,my;
let tamanho = 30;

document.addEventListener("keydown",keyPressed);

window.onload = function (){
    mx = Math.floor(Math.random() * 20);
    my = Math.floor(Math.random() * 20);
}

function Update(){
    px += vx;
    py += vy;

    if(px < 0 | py <0 | px >19 | py >19 | verificaC()){
        endGame();
    }

    snakeB.push({x: px,y: py});

    //gera nova maca
    if(px === mx & py === my){
        spawnMaca();
    }

    while(snakeB.length > bodyL){
        snakeB.shift();
    }

    drawScreen();
}

function drawScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cv.clientHeight,cv.clientWidth);

    ctx.fillStyle = "green";
    for(let i =0; i< snakeB.length; i++){
        ctx.fillRect(snakeB[i].x * tamanho, snakeB[i].y * tamanho , tamanho, tamanho);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(mx *tamanho, my*tamanho ,tamanho,tamanho);
}

function keyPressed(evt){
    let nx,ny
    switch(evt.keyCode){
        case 37:
                nx = -1;
                ny = 0;
                break;
        case 38:
                nx = 0;
                ny = -1;
                break;
        case 39:
                nx  = 1;
                ny = 0;
                break;
        case 40:
                nx = 0;
                ny = 1;
                break;
    }
    if (nx* vx >= 0 & ny * vy >= 0){
        vx = nx;
        vy = ny;
    }else{
        console.log('Invalido')
    }
}

//verifica colisao
function verificaC(){
    let aux = snakeB.find(p => p.x === px & p.y === py);
    if(aux === undefined | bodyL < 6)
        return false
    else
        return true;
}

function endGame(){
    vx = vy = 0;
    px = py = 9;
    bodyL = 5;
    if(score.innerHTML > best.innerHTML){
        best.innerHTML = score.innerHTML;
    }
    score.innerHTML = 0
    alert('Game Over');
}

function spawnMaca(){
    do{
        let auxx = Math.floor(Math.random() * 20);
        let auxy = Math.floor(Math.random() * 20);
        let aux = snakeB.find(p => p.x === auxx & p.y === auxy);
        if(aux === undefined)
            mx = auxx;
            my = auxy;
            break;
    }while(aux !== undefined)
    score.innerHTML++;
    bodyL++;
}

setInterval(Update,70);