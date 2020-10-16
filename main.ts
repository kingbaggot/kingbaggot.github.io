var camx = 0;
var camy = 0;


var requestAnimFrame = (function() {
    return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    };
})();
var canvas:any = document.getElementById('canvas');  //(<HTMLInputElement>document.getElementById('canvas')).value; 
var ctx = canvas.getContext("2d");
canvas.width = 400;//400;
canvas.height = 640;//640;
var canvasX = 0
var canvasY = 0
var canvasScaleX = 1;
var canvasScaleY = 1;
var div = document.getElementById('viewporter');
var isMobile = false;
var time = 0;
var deviceAgent = navigator.userAgent.toLowerCase();
if (deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i)) {
    isMobile = true;
}


var castList = [];
var castRemoveList = [];

var myGameScreen;

function trace(inS)
{
    console.log(inS);
}


function addGameScreen() 
{
myGameScreen = new GameScreen();
}


gameLoop();

function gameLoop() 
{
    deltaT = getDelta() * 75;

	if (myGameScreen){myGameScreen.updateMe() }

	updateCastList();

    ctx.fillStyle = "rgb(250, 250, 0)";
    ctx.font = "24px Helvetica";
    
    ctx.fillText("LOADING : " + Math.floor(fps), 200, 300);

    requestAnimFrame(gameLoop)
}


var fps = 0;
var previousTime = new Date().getTime();
var deltaT = 0;

function getDelta() {
    var currentTime = new Date().getTime();
    var delta = (currentTime - previousTime) / 1000;
    fps = 1000 / (currentTime - previousTime);
    previousTime = currentTime;
    if (delta > .5) {
        delta = 0;
    }
    return delta;
}

window.onresize = function() {
    setTimeout(function() {
        resizeCanvas();
    }, 1);
};

window.addEventListener("load", function() {
    setTimeout(function() {
        resizeCanvas();
    }, 0);

    window.addEventListener("orientationchange", function() {
        resizeCanvas();
    }, false);
});



function resizeCanvas() {
    var tempInnerWidth = window.innerWidth;
    var tempInnerHeight = window.innerHeight;
   /* if (tempInnerWidth > 480) {
        tempInnerWidth -= 1;
        tempInnerHeight -= 1;
    }*/
    if (tempInnerWidth / canvas.width < tempInnerHeight / canvas.height) {
        canvas.style.width = tempInnerWidth + "px";
        canvas.style.height = (tempInnerWidth / canvas.width) * canvas.height + "px";
        canvasX = 0;
        canvasY = ((tempInnerHeight - (tempInnerWidth / canvas.width) * canvas.height) / 2);
        canvasScaleX = canvasScaleY = canvas.width / tempInnerWidth;
        div.style.marginTop = canvasY + "px";
        div.style.marginLeft = canvasX + "px";
    } else {
        canvas.style.width = (tempInnerHeight / canvas.height) * canvas.width + "px";
        canvas.style.height = tempInnerHeight + "px";
        canvasX = ((tempInnerWidth - (tempInnerHeight / canvas.height) * canvas.width) / 2);
        canvasY = 0;
        canvasScaleX = canvasScaleY = canvas.height / tempInnerHeight;
        div.style.marginTop = canvasY + "px";
        div.style.marginLeft = canvasX + "px";
    }
}

