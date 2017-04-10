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

var boomImage = new Image();
boomImage.src = './images/boom.png';
var boomReady = false;
boomImage.onload = function(){
    boomReady = true;
};

var heroImage = new Image();
heroImage.src = './images/hero.png';
var heroReady = false;
heroImage.onload = function(){
    heroReady = true;
}

var backgroundImage = new Image();
backgroundImage.src = './images/map.jpg'
var backgroundReady = false;
backgroundImage.onload = function(){
    backgroundReady = true;
}

var hulletImage = new Image();
hulletImage.src = './images/hullet.png';
var hulletReady = false;
hulletImage.onload = function(){
    hulletReady = true;
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
        if(boomReady && !self.boomEnd){
            ctx.drawImage(boomImage,8.3+self.boomINTER*self.boomState,0,self.boomSize,self.boomSize,x,y,size,size);
            self.boomState++;
            if(self.boomState > 12){
                self.boomEnd = true;
                return false;
            }
        }
    }
    return new boom();
}
var hero = new Hero();

addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 38:
            hero.direction.up = true;
            break;
        case 40:
            hero.direction.down = true;
            break;
        case 37:
            hero.direction.left = true;
            break;
        case 39:
            hero.direction.right = true;
            break;
    }
})

addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 38:
            hero.direction.up = false;
            break;
        case 40:
            hero.direction.down = false;
            break;
        case 37:
            hero.direction.left = false;
            break;
        case 39:
            hero.direction.right = false;
            break;
    }
})

function Hero(){
    this.x = 160;
    this.y = 540;
    this.direction = {
        up:false,
        down:false,
        left:false,
        right:false,
    };
}

var hullets = [];

function Hullet(x,y){
    this.x = x;
    this.y = y;
}

function draw(){
    ctx.save();
    ctx.fillStyle = 'transparent';
    ctx.restore();
    drawBg();
    //Boom().startBoom(20,20,40);
    drawHullet();
    drawHero();
    requestAnimationFrame(draw);
}

function drawHero(){
    if(hero.direction.up && hero.y > -50)
        hero.y-=5;
    if(hero.direction.down && hero.y < 550)
        hero.y+=5;
    if(hero.direction.left && hero.x > -50)
        hero.x-=5;
    if(hero.direction.right && hero.x < 350)
        hero.x+=5;
    ctx.drawImage(heroImage,hero.x,hero.y,100,100);
}

var by = -2048+600;

function drawBg(){
    by+=2;
    if(by == -424) by = -2048+600;
    ctx.drawImage(backgroundImage,0,by,400,1024);
    ctx.drawImage(backgroundImage,0,by+1024,400,1024);
}

function shot(){
    setInterval(function(){
        hullets.push(new Hullet(hero.x,hero.y));
    },200)
}

function drawHullet(){
    for(var i = 0;i < hullets.length;i++){
        ctx.drawImage(hulletImage,hullets[i].x+20,hullets[i].y-=10,60,60)
    }
    var copy = [];
    for(var i = 0;i < hullets.length;i++){
        if(hullets[i].y > -50){
            copy.push(hullets[i])
        }
    }
    hullets = copy;
}

function main(){
    draw();
    shot();
}

main();