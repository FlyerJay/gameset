var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 480;
canvas.height = 480;
canvas.style.backgroundColor="#efefef";
canvas.style.width="480px";
canvas.style.height="480px";
canvas.style.position="absolute";
canvas.style.top="50%";
canvas.style.left="50%";
canvas.style.marginTop="-240px";
canvas.style.marginLeft="-240px";
document.body.appendChild(canvas);

var snaker = {
    speed:10,
    body:[[2,0],[1,0],[0,0]],
    direction:3,//0上,1下,2左,3右
}

var keyDown = {};

var foodPosition = {
    x:-1,
    y:-1,
};
var isEat = false;

addEventListener('keydown',function(e){
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
});

function drawSnaker(){
    ctx.clearRect(0,0,480,480);
    drawFood();
    var j = 1;
    ctx.fillStyle = '#9ea7b4'
    while(j < snaker.body.length){
        ctx.fillRect(snaker.body[j][0]*20+1,snaker.body[j][1]*20+1,19,19)
        j++;
    }
    ctx.save();
    ctx.fillStyle = '#657180';
    ctx.fillRect(snaker.body[0][0]*20+1,snaker.body[0][1]*20+1,19,19)
    ctx.restore();
}

function productFood(){
    var x = Math.floor((Math.random()*24))
    var y = Math.floor((Math.random()*24))
    for(var i = 0; i < snaker.body.length; i++){
        if(x == snaker.body[i][0] && y == snaker.body[i][1]){
            productFood();
            return false;
        }
    }
    foodPosition.x = x;
    foodPosition.y = y; 
}

function drawFood(){
    ctx.save();
    ctx.fillStyle = '#00cc66';
    ctx.fillRect(foodPosition.x*20+1,foodPosition.y*20+1,19,19)
    ctx.restore();
}

function snakerMove(){
    if(isEat == true){
        snaker.body.push([foodPosition.x,foodPosition.y]);
        foodPosition.x = -1;
        foodPosition.y = -1;
        productFood();
    }
    isEat = false;
    if(snaker.body[0][0] == foodPosition.x && snaker.body[0][1] == foodPosition.y){
        isEat = true;
    }
    drawSnaker();
    window.requestAnimationFrame(snakerMove);
}

function main(){
    productFood();
    snakerMove();
    setInterval(function(){
        var i = snaker.body.length - 1;
        while(i > 0){
            snaker.body[i][0] = snaker.body[i-1][0];
            snaker.body[i][1] = snaker.body[i-1][1];
            i--;
        }
        switch(snaker.direction){
            case 0:
                snaker.body[0][1] > 0 ? snaker.body[0][1]-- : snaker.body[0][1] = 23;
                break;
            case 1:
                snaker.body[0][1] < 23 ? snaker.body[0][1]++ : snaker.body[0][1] = 0;
                break;
            case 2:
                snaker.body[0][0] > 0 ? snaker.body[0][0]-- : snaker.body[0][0] = 23;
                break;
            case 3:
                snaker.body[0][0] < 23 ? snaker.body[0][0]++ : snaker.body[0][0] = 0;
                break;
        }
    },100-snaker.speed);
}

main();