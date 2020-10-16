var camx = 0;
var camy = 0;
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    };
})();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 640;
var canvasX = 0;
var canvasY = 0;
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
function trace(inS) {
    console.log(inS);
}
function addGameScreen() {
    myGameScreen = new GameScreen();
}
gameLoop();
function gameLoop() {
    deltaT = getDelta() * 75;
    if (myGameScreen) {
        myGameScreen.updateMe();
    }
    updateCastList();
    ctx.fillStyle = "rgb(250, 250, 0)";
    ctx.font = "24px Helvetica";
    ctx.fillText("LOADING : " + Math.floor(fps), 200, 300);
    requestAnimFrame(gameLoop);
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
window.onresize = function () {
    setTimeout(function () {
        resizeCanvas();
    }, 1);
};
window.addEventListener("load", function () {
    setTimeout(function () {
        resizeCanvas();
    }, 0);
    window.addEventListener("orientationchange", function () {
        resizeCanvas();
    }, false);
});
function resizeCanvas() {
    var tempInnerWidth = window.innerWidth;
    var tempInnerHeight = window.innerHeight;
    if (tempInnerWidth / canvas.width < tempInnerHeight / canvas.height) {
        canvas.style.width = tempInnerWidth + "px";
        canvas.style.height = (tempInnerWidth / canvas.width) * canvas.height + "px";
        canvasX = 0;
        canvasY = ((tempInnerHeight - (tempInnerWidth / canvas.width) * canvas.height) / 2);
        canvasScaleX = canvasScaleY = canvas.width / tempInnerWidth;
        div.style.marginTop = canvasY + "px";
        div.style.marginLeft = canvasX + "px";
    }
    else {
        canvas.style.width = (tempInnerHeight / canvas.height) * canvas.width + "px";
        canvas.style.height = tempInnerHeight + "px";
        canvasX = ((tempInnerWidth - (tempInnerHeight / canvas.height) * canvas.width) / 2);
        canvasY = 0;
        canvasScaleX = canvasScaleY = canvas.height / tempInnerHeight;
        div.style.marginTop = canvasY + "px";
        div.style.marginLeft = canvasX + "px";
    }
}
var Sprite = (function () {
    function Sprite(options) {
        this.TELL_ONCE = false;
        this.frameIndex = 0,
            this.tickCount = 0,
            this.frameInt = 0,
            this.numberOfFrames = options.numberOfFrames || 1;
        this.numberOfCols = options.numberOfCols || this.numberOfFrames;
        this.myParent = options.myParent || null;
        this.depth = options.depth || 1;
        this.camInt = options.camInt || 0;
        this.myAnimArray = options.myAnimArray || [[true, 5, 0]];
        this.myString = options.myString || null;
        this.angle = options.angle || null;
        this.context = ctx;
        this.offX = options.offX;
        this.offY = options.offY;
        this.x = options.x;
        this.y = options.y;
        this.image = options.image;
        var rows = this.numberOfFrames / this.numberOfCols;
        this.width = this.image.width;
        this.height = this.image.height;
        this.scale = options.scale || 1;
        this.animType = 0;
        if (this.myParent) {
            this.specX = this.x;
            this.specY = this.y;
        }
        else {
            this.specX = 0;
            this.specY = 0;
        }
        castList.push(this);
    }
    Sprite.prototype.animateMe = function () {
        this.tickCount++;
        var animType = this.animType;
        var animCount = this.tickCount;
        var animDelay = this.myAnimArray[animType][1];
        var animTotal = this.myAnimArray[animType].length - 3;
        var animIndex = this.frameInt;
        if (animCount > animDelay) {
            if (this.myAnimArray[animType][0]) {
                animIndex = increaseWithLimit(animIndex, 1, animTotal);
            }
            else {
                animIndex = increaseWithLimitAndStick(animIndex, 1, animTotal);
            }
            animCount = 0;
            this.tickCount = 0;
        }
        var animFrame = this.myAnimArray[animType][2 + animIndex];
        this.frameInt = animIndex;
        this.frameIndex = animFrame;
    };
    ;
    Sprite.prototype.renderMe = function () {
        var angle = 0;
        if (this.myParent) {
            this.x = this.myParent.x + this.specX;
            this.y = this.myParent.y + this.specY;
            ;
        }
        var camxVal = camx * this.camInt;
        var camyVal = camy * this.camInt;
        var rows = this.numberOfFrames / this.numberOfCols;
        if (!this.TELL_ONCE) {
            trace("rows" + this.height / rows);
            this.TELL_ONCE = true;
        }
        this.context.drawImage(this.image, (this.frameIndex % this.numberOfCols) * (this.width / this.numberOfCols), Math.floor(this.frameIndex / this.numberOfCols) * (this.height / rows), this.width / this.numberOfCols, this.height / rows, Math.floor(this.x - camxVal - (this.offX) * this.scale), Math.floor(this.y - camyVal - (this.offY) * this.scale), (this.width / this.numberOfCols) * this.scale, (this.height / rows) * this.scale);
    };
    ;
    Sprite.prototype.resetMe = function () {
        this.frameInt = 0;
    };
    Sprite.prototype.forceFrameMe = function (frame) {
        this.frameIndex = frame;
    };
    Sprite.prototype.getFrameWidth = function () {
        return this.width / this.numberOfFrames;
    };
    ;
    return Sprite;
}());
function updateCastList() {
    for (var i = 0; i < this.castList.length - 1; i++) {
        var childA = this.castList[i];
        var childB = this.castList[i + 1];
        if (childA.depth > childB.depth) {
            this.castList[i + 1] = childA;
            this.castList[i] = childB;
        }
    }
    for (var i = 0; i < this.castList.length; i++) {
        this.castList[i].renderMe();
    }
    this.removeDeadSps();
}
function removeDeadSps() {
    for (var i = 0; i < this.castRemoveList.length; i++) {
        var removeInt = this.castList.indexOf(this.castRemoveList[i]);
        if (removeInt != -1) {
            console.log("remove somesrpite" + this.castList[removeInt].image);
            this.castList.splice(removeInt, 1);
        }
    }
    this.castRemoveList = [];
}
var loadedGfxInt = 0;
var imagesLoadList = ["images/bg2.png", "images/man.png"];
var LOADED_GFX = false;
var testText = "blarg";
var imagesLoadIntList = [];
startLoadingGfx();
function startLoadingGfx() {
    for (var i = 0; i < imagesLoadList.length; i++) {
        var tempLoadImage = new Image();
        tempLoadImage.src = imagesLoadList[i];
        tempLoadImage.id = i;
        console.log("loading " + imagesLoadList[i] + " id=" + tempLoadImage.id);
        imagesLoadIntList.push(null);
        tempLoadImage.onload = function (e) {
            loadedGfxInt++;
            imagesLoadIntList[e.target.id] = e.target;
            console.log("LOADED >" + e.target.id + " gfx done=" + loadedGfxInt);
        };
    }
    console.log("that list is " + imagesLoadIntList);
}
loadLoop();
function loadLoop() {
    if (!LOADED_GFX) {
        console.log("LADDY" + loadedGfxInt);
        if (loadedGfxInt < imagesLoadList.length) {
            if (imagesLoadIntList[0]) {
                ctx.drawImage(imagesLoadIntList[0], 0, 0);
            }
            testText = (loadedGfxInt + " / " + imagesLoadList.length);
            ctx.fillStyle = "rgb(250, 250, 0)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText("LOADING : " + testText, 200, 300);
            requestAnimFrame(loadLoop);
        }
        else {
            addGameScreen();
            LOADED_GFX = true;
        }
    }
}
function getPic(inString) {
    var retInt = imagesLoadList.indexOf("images/" + inString + ".png");
    return imagesLoadIntList[retInt];
}
function DegToRad(d) {
    return d * 0.0174532925199432957;
}
var TO_RADIANS = Math.PI / 180;
function getX(rot) {
    var rotRad = rot * (Math.PI / 180);
    return Math.sin(rotRad);
}
function getY(rot) {
    var rotRad = rot * (Math.PI / 180);
    return -Math.cos(rotRad);
}
function getRand(index) {
    var randomNum = Math.floor(Math.random() * index);
    return randomNum;
}
function getAngle(x1, y1, x2, y2) {
    var hyp = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
    var angle = (180 / Math.PI) * Math.acos((y1 - y2) / (hyp));
    if (x1 > x2) {
        angle = 360 - (180 / Math.PI) * Math.acos((y1 - y2) / (hyp));
    }
    return angle;
}
function increaseWithLimit(index, amount, limit) {
    index += amount;
    if (index > limit) {
        index = 0;
    }
    return index;
}
function increaseWithLimitAndStick(index, amount, limit) {
    index += amount;
    if (Math.abs(index) > Math.abs(limit)) {
        index = limit;
    }
    return index;
}
function getHyp(x1, y1, x2, y2) {
    var hyp = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
    return hyp;
}
var GameScreen = (function () {
    function GameScreen() {
        this.addTimer = 0;
        console.log("game added");
        GameScreen.spList = [];
        this.spRemoveList = [];
        this.gameBg = new Sprite({
            image: getPic("bg2"), x: 0, y: 0, offX: 0, offY: 0 });
    }
    GameScreen.prototype.updateMe = function () {
        this.addTimer++;
        if (this.addTimer % 100 == 1) {
            var blitGuy = new BlitMan(5 + getRand(390), 10, 0, 0, 0, this);
            GameScreen.spList.push(blitGuy);
        }
        for (var i = 0; i < GameScreen.spList.length; i++) {
            GameScreen.spList[i].updateMe();
        }
        this.removeDeadSps();
    };
    GameScreen.prototype.removeDeadSps = function () {
        for (var i = 0; i < this.spRemoveList.length; i++) {
            var removeInt = GameScreen.spList.indexOf(this.spRemoveList[i]);
            if (removeInt != -1) {
                castRemoveList.push(GameScreen.spList[removeInt].mySprite);
                GameScreen.spList.splice(removeInt, 1);
            }
        }
        this.spRemoveList = [];
    };
    GameScreen.prototype.deleteMe = function () {
    };
    return GameScreen;
}());
var tx = 0;
var ty = 0;
var TOUCHED = false;
var touchText = "false";
var touchNum = 1;
var touchNum2 = 1;
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
canvas.addEventListener("touchstart", function (event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        TOUCHED = true;
        var touch = event.touches[i];
        tx = (touch.pageX - canvasX) * canvasScaleX;
        ty = (touch.pageY - canvasY) * canvasScaleY;
    }
}, false);
canvas.addEventListener('touchmove', function (event) {
    for (var i = 0; i < event.touches.length; i++) {
        var touch = event.touches[i];
        tx = (touch.pageX - canvasX) * canvasScaleX;
        ty = (touch.pageY - canvasY) * canvasScaleY;
    }
}, false);
canvas.addEventListener("touchend", function (event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        if (TOUCHED)
            TOUCHED = false;
    }
}, false);
addEventListener('mousemove', on_canvas_move, false);
addEventListener('mousedown', on_canvas_click, false);
addEventListener('mouseup', on_canvas_clickend, false);
function on_canvas_click(ev) {
    tx = (ev.clientX - canvasX) * canvasScaleX;
    ty = (ev.clientY - canvasY) * canvasScaleY;
    console.log("bonk" + tx);
    TOUCHED = true;
}
function on_canvas_move(ev) {
    tx = (ev.clientX - canvasX) * canvasScaleX;
    ty = (ev.clientY - canvasY) * canvasScaleY;
}
function on_canvas_clickend(ev) {
    TOUCHED = false;
}
var BlitMan = (function () {
    function BlitMan(xposP, yposP, offXP, offYP, frameP, myWorldP, myTypeP, myDepthP, myForceScale, camIntP) {
        if (myTypeP === void 0) { myTypeP = 0; }
        if (myDepthP === void 0) { myDepthP = 0; }
        if (myForceScale === void 0) { myForceScale = 1; }
        if (camIntP === void 0) { camIntP = 1; }
        this.dy = -3;
        var teamSheet = "man";
        this.myType = myTypeP;
        this.mySprite = new Sprite({ image: getPic(teamSheet), x: xposP, y: yposP, offX: offXP, offY: offYP,
            depth: 10, numberOfFrames: 3, numberOfCols: 3, camInt: 1, scale: 0.5
        });
        this.mySprite.myAnimArray =
            [
                [true, 3, 0],
                [true, 9, 3, 4, 5, 4],
                [true, 5, 6, 7],
                [false, 5, 9],
                [true, 9, 9, 10, 11, 10],
                [true, 9, 12, 13, 14, 13],
                [false, 0, 8],
                [true, 5, 21, 22],
                [true, 5, 24, 25],
                [true, 5, 23],
                [true, 5, 26]
            ];
    }
    BlitMan.prototype.updateMe = function () {
        this.mySprite.y += this.dy * deltaT;
        this.dy += 0.2 * deltaT;
        if (this.mySprite.y > 590) {
            this.mySprite.y = 590;
            this.dy = -5 - getRand(10);
        }
    };
    return BlitMan;
}());
//# sourceMappingURL=tsc.js.map