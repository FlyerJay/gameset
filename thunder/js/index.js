/**设置canvas画布 */
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

/**定义游戏状态 */
var GAME_STATUS = 0;//0是加载中，1是进行中

/**定义需要加载的图片 */
var loadImg = new Image();
loadImg.src = './images/loading.gif';
loadImg.onload = function(){
    drawLoading();
}
var images = ['./images/boom.png','./images/hero.png','./images/map.jpg','./images/hullet.png','./images/ep_1.png','./images/epb_1.png'];
var Images = [];

/**加载所有图片 */
function loadImage(){
    for(var i = 0; i < images.length; i++){
        (function(i){
            var image = new Image();
            image.src = images[i];
            Images.push(image);
            image.onload = function(){
                loading();
            }
        })(i)
        
    }
}
var loadStep = 0;
var hero = {};
var enemys = [];
function loading(){
    loadStep += Math.ceil(100/images.length);
    if(loadStep >= 100){
        var img = document.getElementsByTagName('img')[0]
        document.body.removeChild(img);
        GAME_STATUS = 1;
        hero = new Hero();
    }
}

/**定义爆炸动画 */
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
        if(!self.boomEnd){
            ctx.drawImage(Images[0],8.3+self.boomINTER*self.boomState,0,self.boomSize,self.boomSize,x,y,size,size);
            self.boomState++;
            if(self.boomState > 12){
                self.boomEnd = true;
                return false;
            }
        }
    }
    return new boom();
}

/**定义英雄的方向控制函数 */
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

/**定义hero对象 */
function Hero(){
    this.x = 160;
    this.y = 520;
    this.shotSpeed = 200;
    this.direction = {
        up:false,
        down:false,
        left:false,
        right:false,
    };
    this.hullets = [];
    var self = this;
    this.shot = function(){
        setInterval(function(){
            self.hullets.push(new Hullet(self.x,self.y));
        },self.shotSpeed)
    }
    this.shot();//自动攻击
}

/** 定义enemy对象 */
function Enemy() {
    this.x = 160;
    this.y = -50;
    this.shotSpeed = 500;
    this.speedX = 10;
    this.speedY = 20;
    this.direction = {
        up:false,
        down:false,
        left:false,
        right:false,
    };
    this.hullets = [];
    var self = this;
    this.shot = setInterval(function(){
        self.hullets.push(new Hullet(self.x,self.y));
    },self.shotSpeed);
    this.direction.left = Math.floor(((Math.random() * 1000) % 2)) == 1;
    this.randomDirectTion = setInterval(function(){
        Math.floor(((Math.random() * 1000) % 2)) == 1 ? function(){
            self.direction.left = true 
        }() : 
        function(){
            self.direction.left = false 
        }(); 
    },3000);
    this.moveY = setInterval(function(){
        if(self.y > 600){
            clearInterval(self.moveY);
            clearInterval(self.moveX);
            clearInterval(self.shot);
            clearInterval(self.randomDirectTion);
        }
        self.y += 1;
    },self.speedY);
    this.moveX = setInterval(function(){
        self.direction.left ? self.x < 50 ? self.direction.left = !self.direction.left : self.x -= 1 :self.x > 350 ? self.direction.left = !self.direction.left : self.x += 1;
    },self.speedX);
}

function Hullet(x,y){
    this.x = x;
    this.y = y;
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
    for(var i = 0; i < hero.hullets.length; i++){
        ctx.drawImage(Images[3],hero.hullets[i].x + 20,hero.hullets[i].y -= 10,60,60);
    }
    var copy = [];
    for(var i = 0;i < hero.hullets.length;i++){
        if(hero.hullets[i].y > -50){
            copy.push(hero.hullets[i])
        }
    }
    hero.hullets = copy;
    ctx.drawImage(Images[1],hero.x,hero.y,100,100);
}
/** 敌人列表 **/
enemys[enemys.length] = new Enemy();
function drawEnemy() {
    for(var i = 0; i < enemys[0].hullets.length; i++){
        ctx.drawImage(Images[5],enemys[0].hullets[i].x + 30,(enemys[0].hullets[i].y += 10) + 50,30,30);
    }
    // var copy = [];
    // for(var i=0;i <enemys[0].hullets.length;i++){
    //     if(enemys[0].hullets.y < 550){
    //         copy.push(hero.hullets[i])
    //     }
    // }
    // enemys[0].hullets = copy;
    ctx.drawImage(Images[4],enemys[0].x,enemys[0].y,100,100);
}

/**绘制背景 */
var by = 600 -2048;
function drawBg(){
    by += 2;
    if(by == -424) by = 600 - 2048;
    ctx.drawImage(Images[2],0,by,400,1024);
    ctx.drawImage(Images[2],0,by+1024,400,1024);
}

function drawLoading(){
    ctx.save();
    ctx.fillStyle = '#efefef';
    ctx.fillRect(0,0,400,600);
    ctx.restore();
    var img = document.createElement('img');
    img.style.position = 'absolute';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate3d(-50%,-50%,0)';
    img.src = './images/loading.gif';
    img.style.zIndex = '1001';
    document.body.appendChild(img); 
}
var boom = Boom()
/**主绘制函数 */
function draw(){
    if(GAME_STATUS == 1){
        drawBg();;
        drawHero();
        drawEnemy();
    }
    requestAnimationFrame(draw);
}

function main(){
    loadImage();
    draw();
}

main();