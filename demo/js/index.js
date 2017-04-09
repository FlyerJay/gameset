var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 480;
canvas.height = 480;
canvas.style.backgroundColor = '#efefef';
canvas.style.position = 'absolute';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate3d(-50%,-50%,0)';

var snaker = {
    speed:1,
    body:[{x: 2, y: 0},{x: 1, y: 0},{x: 0, y: 0}],
    move:function(){
        var i = this.body.length - 1;
        while(i > 0){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
            i--;
        }
        switch(this.direction){
            case 0:
                this.body[0].y > 0 ? this.body[0].y-- : this.body[0].y = 23;
                break;
            case 1:
                this.body[0].y < 23 ? this.body[0].y++ : this.body[0].y = 0;
                break;
            case 2:
                this.body[0].x > 0 ? this.body[0].x-- : this.body[0].x = 23;
                break;
            case 3:
                this.body[0].x < 23 ? this.body[0].x++ : this.body[0].x = 0;
                break;
        }
        var j = this.body.length - 1;
        while(j > 0){
            if(this.body[0].x == this.body[j].x && this.body[0].y == this.body[j].y) {
                gameEnd();
                return;
            }
            j--;
        }
        if(food.isEat){
            productFood();
            food.isEat = false;
        }
        if(this.body[0].x == food.x && this.body[0].y == food.y){
            food.isEat = true;
            scoreSRC();
            this.body.push({x:food.x,y:food.y});
            food.x = -1;
            food.y = -1;
        }
        this.canChangeDir = true;
    },
    direction:3,//0上,1下,2左,3右;
    canChangeDir:true,
    score:0,
    end:true
}

var food = {
    x:-1,
    y:-1,
    isEat:false,
}

function productFood(){
    food.x = Math.ceil(Math.random() * 23);
    food.y = Math.ceil(Math.random() * 23);
    var i = 0;
    while(i < snaker.body.length){
        if(food.x == snaker.body[i].x && food.y == snaker.body[i].y){
            productFood();
        }
        i++;
    }
}

function scoreSRC(){
    snaker.score ++;
    if(snaker.score % 10 == 0 && snaker.speed < 10){
        snaker.speed ++ ;
        clearInterval(move);
        move = setInterval(function(){
            snaker.move();
        },150 - (snaker.speed * 15));
    }
}

addEventListener('keydown',function(e){
    if(e.keyCode == 32 && snaker.end){
        startGame();
    }
    if(!snaker.canChangeDir) return;
    switch(e.keyCode){
        case 38:
            if(snaker.direction == 0 || snaker.direction == 1) return;
            snaker.direction = 0;
            break;
        case 40:
            if(snaker.direction == 0 || snaker.direction == 1) return;
            snaker.direction = 1;
            break;
        case 37:
            if(snaker.direction == 2 || snaker.direction == 3) return;
            snaker.direction = 2;
            break;
        case 39:
            if(snaker.direction == 2 || snaker.direction == 3) return;
            snaker.direction = 3;
            break;
    }
    snaker.canChangeDir = false;
})

function drawSnaker(){
    ctx.clearRect(0,0,480,480);
    drawFood();
    for(var i = 1; i < snaker.body.length; i++){
        ctx.fillStyle = '#888';
        ctx.fillRect(snaker.body[i].x * 20 + 1, snaker.body[i].y * 20 + 1, 18, 18);
        ctx.save();
    }
    ctx.fillStyle = '#444';
    ctx.fillRect(snaker.body[0].x * 20 + 1, snaker.body[0].y * 20 + 1, 18, 18)
    ctx.restore();
}

function drawFood(){
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x * 20 + 1,food.y * 20 + 1, 18, 18);
    ctx.restore();
}

function drawInfo(){
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillText(`游戏得分：${snaker.score}`, 10, 15);
    ctx.fillText(`速度：${snaker.speed}`, 430, 15);
    ctx.restore();
    if(snaker.end){
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.font = '24px 隶书';
        ctx.fillText('游戏结束',200,228);
        ctx.restore();
    }
}

function draw(){
    drawSnaker();
    drawFood();
    drawInfo();
    requestAnimationFrame(draw);
}

var move = {};

function snakerMove(){
    move = setInterval(function(){
        snaker.move();
    },150 - (snaker.speed * 15));
}

function gameEnd(){
    clearInterval(move);
    snaker.end = true;
}

function main(){
    productFood();
    draw();
}

function startGame(){
    snaker.speed = 1;
    snaker.direction = 3;
    snaker.score = 0;
    snaker.body = [{x: 2, y: 0},{x: 1, y: 0},{x: 0, y: 0}];
    snaker.end = false;
    snakerMove();
}

main();

document.body.appendChild(canvas);