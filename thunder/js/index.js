var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;
canvas.style.position = 'absolute';
canvas.background = 'transparent';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.zIndex = '1000';
canvas.style.marginLeft = '-200px';
canvas.style.marginTop = '-300px';
document.body.appendChild(canvas);

var scene = document.querySelectorAll('.background-bottom')[0];
var scene1 = document.querySelectorAll('.background-bottom .background')[0];
var scene2 = document.querySelectorAll('.background-bottom .background')[1];
var initColor = 250;
var INTER = 25;
var DOUBLEINTER = 50;
var backgroundSEC = true;
var boomImage = new Image();
boomImage.src = './images/boom.png';
var boomReady = false;
boomImage.onload = function(){
    boomReady = true;
};

scene2.style.backgroundImage = `-webkit-gradient(linear,center top,center bottom,from(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})), to(rgb(${initColor},${initColor},${initColor})))`;
scene1.style.backgroundImage = `-webkit-gradient(linear,center top,center bottom,from(rgb(${initColor-DOUBLEINTER},${initColor-DOUBLEINTER},${initColor-DOUBLEINTER})), to(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})))`;

function background(){//背景移动
    var bottom = scene.style.bottom.replace('px','') - 0;
    if(bottom <= -600){
        bottom = 0;
        if(backgroundSEC){
            initColor -= INTER;
            scene2.style.backgroundImage = `-webkit-gradient(linear,center top,center bottom,from(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})), to(rgb(${initColor},${initColor},${initColor})))`;
            scene1.style.backgroundImage = `-webkit-gradient(linear,center top,center bottom,from(rgb(${initColor-DOUBLEINTER},${initColor-DOUBLEINTER},${initColor-DOUBLEINTER})), to(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})))`;
            if(initColor < 100){
                backgroundSEC = false;
                initColor -= INTER;
            }
        }else{
            
            scene1.style.backgroundImage = `-webkit-gradient(linear,center bottom,center top,from(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})), to(rgb(${initColor},${initColor},${initColor})))`;
            scene2.style.backgroundImage = `-webkit-gradient(linear,center bottom,center top,from(rgb(${initColor-DOUBLEINTER},${initColor-DOUBLEINTER},${initColor-DOUBLEINTER})), to(rgb(${initColor-INTER},${initColor-INTER},${initColor-INTER})))`;
            initColor += INTER;
            if(initColor >200){
                backgroundSEC = true;
                initColor += INTER;
            }
        }
    }
    scene.style.bottom = bottom - 2 + 'px';
    requestAnimationFrame(background);
}

function Boom(){
    var boom = function(){
        this.boomSize = 70;
        this.boomINTER = 62.8;
        this.boomState = 0;
        this.boomExpand = true;
        this.boomEnd = false;
    }
    boom.prototype.startBoom = function(x,y,size){
        var self = this;
        var boom = setInterval(function(){
            if(boomReady && !self.boomEnd){
                ctx.clearRect(x,y,size,size);
                ctx.drawImage(boomImage,8.3+self.boomINTER*self.boomState,0,self.boomSize,self.boomSize,x,y,size,size);
                self.boomState++;
                if(self.boomState > 12){
                    self.boomEnd = true;
                    clearInterval(boom);
                    ctx.clearRect(x,y,size,size);
                    return false;
                }
            } 
        },30);
    }
    return new boom();
}

function draw(){
    ctx.save();
    ctx.fillStyle = 'transparent';
    ctx.restore();
    requestAnimationFrame(draw);
}

function main(){
    background();//绘制背景
    draw();
}

main();
// setInterval(function(){
//     var x = Math.floor(Math.random() * 340);
//     var y = Math.floor(Math.random() * 540);
//     Boom().startBoom(x,y,100);
// },500)