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
    direction:2,//0上,1下,2左,3右
}

var keyDown = {}

addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 38:
            snaker.direction = 0;
            break;
        case 40:
            snaker.direction = 1;
            break;
        case 37:
            snaker.direction = 2;
            break;
        case 39:
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
    init()
    var j = 0;
    while(j < snaker.body.length){
        ctx.fillRect(snaker.body[j][0]*20+1,snaker.body[j][1]*20+1,19,19)
        j++;
    }
}

function snakerMove(){
    var temp = snaker.body[0];
    var now = [];
    
    switch(snaker.direction){
        case 0:
            snaker.body[0][1] > 0 ? snaker.body[0][1] -- : snaker.body[0][1] = 23; 
            var i = 1;
            while(i < snaker.body.length){
                now = snaker.body[i];
                snaker.body[i] = temp;
                temp = now;
                i++;
            }
            break;
        case 1:
            snaker.body[0][1] < 23 ? snaker.body[0][1] ++ : snaker.body[0][1] = 0; 
            var i = 1;
            while(i < snaker.body.length){
                now = snaker.body[i];
                snaker.body[i] = temp;
                temp = now;
                i++;
            }
            break;
        case 2:
            snaker.body[0][0] > 0 ? snaker.body[0][0] -- : snaker.body[0][0] = 23; 
            var i = 1;
            while(i < snaker.body.length){
                (function(i){
                    now = snaker.body[i];
                    snaker.body[i] = temp;
                    temp = now;
                })(i)
                i++;
            }
            break;
        case 3:
            snaker.body[0][0] < 23 ? snaker.body[0][0] ++ : snaker.body[0][0] = 0; 
            var i = 1;
            while(i < snaker.body.length){
                now = snaker.body[i];
                snaker.body[i] = temp;
                temp = now;
                i++;
            }
            break;
    }
    drawSnaker();
}

function main(){
    init()
    setInterval(function(){
        snakerMove();
    },1000)
}

main();