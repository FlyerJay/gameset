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
    speed:100,
    body:[[2,0],[1,0],[0,0]],
    direction:3,//0上,1下,2左,3右
}

var keyDown = {};

var foodPosition = {
    x:-1,
    y:-1,
    speed:1,
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

var init = function(){
    //先画横线
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    for(var i = 0; i <= 24; i++){
        ctx.moveTo(0,i*20);
        ctx.lineTo(480,i*20);
    }
    //再画竖线
    for(var i = 0; i <= 24; i++){
        ctx.moveTo(i*20,0);
        ctx.lineTo(i*20,480);
    }
    ctx.stroke();
    ctx.save();
}

function drawSnaker(){
    ctx.clearRect(0,0,480,480);
    //init();
    drawFood();
    var j = 0;
    while(j < snaker.body.length){
        ctx.fillRect(snaker.body[j][0]*20+1,snaker.body[j][1]*20+1,19,19)
        j++;
    }
}


function productFood(){
    var x = Math.floor((Math.random()*24))
    var y = Math.floor((Math.random()*24))
    for(arr in snaker.body){
        if(x==arr[0] && y==arr[1]){
            productFood();
            return;
        } 
    }
    foodPosition.x = x;
    foodPosition.y = y; 
    console.log(foodPosition.x,foodPosition.y)
}

function drawFood(){
    ctx.save();
    ctx.fillStyle = 'green';
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
    window.requestAnimationFrame(snakerMove)
}

function main(){
    //init()
    drawSnaker();
    drawFood();
    productFood();
    snakerMove();
    setInterval(function(){
        switch(snaker.direction){
            case 0:
                var i = snaker.body.length - 1;
                var copy = snaker.body;
                while(i > 0){
                    copy[i][0] = snaker.body[i-1][0];
                    copy[i][1] = snaker.body[i-1][1];
                    i--;
                }
                copy[0][1] > 0 ? copy[0][1]-- : copy[0][1] = 23;
                snaker.body = copy;
                break;
            case 1:
                var i = snaker.body.length - 1;
                var copy = snaker.body;
                while(i > 0){
                    copy[i][0] = snaker.body[i-1][0];
                    copy[i][1] = snaker.body[i-1][1];
                    i--;
                }
                copy[0][1] < 23 ? copy[0][1]++ : copy[0][1] = 0;
                snaker.body = copy;
                break;
            case 2:
                var i = snaker.body.length - 1;
                var copy = snaker.body;
                while(i > 0){
                    copy[i][0] = snaker.body[i-1][0];
                    copy[i][1] = snaker.body[i-1][1];
                    i--;
                }
                copy[0][0] > 0 ? copy[0][0]-- : copy[0][0] = 23;
                snaker.body = copy;
                break;
            case 3:
                var i = snaker.body.length - 1;
                var copy = snaker.body;
                while(i > 0){
                    copy[i][0] = snaker.body[i-1][0];
                    copy[i][1] = snaker.body[i-1][1];
                    i--;
                }
                copy[0][0] < 23 ? copy[0][0]++ : copy[0][0] = 0;
                snaker.body = copy;
                break;
        }
    },(1000/snaker.speed*10));
}

main();