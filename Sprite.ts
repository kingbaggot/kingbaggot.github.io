


class Sprite {
	
myAnimArray;
frameIndex;
tickCount;
frameInt;
numberOfFrames;
numberOfCols;
animType;

angle;
context;
width;
height;
offX;
offY;
x;
y;
image;
scale;
depth;
myParent;
specX;
specY;
myString;
camInt;
TELL_ONCE;



	constructor(options) 
	{
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

		this.context = ctx;//options.context;
		
		this.offX = options.offX;
		this.offY = options.offY;

		this.x = options.x;		
		this.y = options.y;

		this.image = options.image;

		var rows = this.numberOfFrames / this.numberOfCols;

		this.width = this.image.width  ///this.numberOfCols;
		this.height = this.image.height  /// rows;

		this.scale = options.scale || 1;
		this.animType = 0;



		if(this.myParent)
		{
			this.specX = this.x;
			this.specY = this.y;
		}else{
			this.specX = 0;
			this.specY = 0;
		}

		castList.push(this);

	}

	animateMe() 
	{

        this.tickCount++;

        var animType = this.animType;
        var animCount = this.tickCount;

        var animDelay = this.myAnimArray[animType][1];
        var animTotal = this.myAnimArray[animType].length - 3;
        var animIndex = this.frameInt;

        //console.log("myArray "+this.myAnimArray);

        
        	
        if (animCount > animDelay) 
        {
			//console.log(animCount+" < >" + animDelay);
			if (this.myAnimArray[animType][0]) {
				animIndex = increaseWithLimit(animIndex, 1, animTotal);
				//console.log("jump= "+animIndex+" animTotal"+animTotal);
			} else {
				animIndex = increaseWithLimitAndStick(animIndex, 1, animTotal);
			}

			animCount = 0;
			this.tickCount = 0;

        }

        var animFrame = this.myAnimArray[animType][2 + animIndex];

        this.frameInt = animIndex;
        this.frameIndex = animFrame;

        //console.log("frame =" + animFrame+" mtArray="+this.myAnimArray);
	};


	renderMe() 
	{

		var angle = 0;

		if(this.myParent)
		{
			this.x = this.myParent.x + this.specX;
			this.y = this.myParent.y + this.specY;;
		}

		

		/*if (this.angle)// != null
		{
			angle = this.angle;

			this.context.save();
			this.context.translate(this.offX, this.offY)
			this.context.translate((this.x - this.offX), (this.y - this.offY));

			this.context.rotate(DegToRad(angle));

			this.context.translate(-this.offX, -this.offY)
			this.context.translate(-(this.x - this.offX), -(this.y - this.offY));


		} else {




		}*/

		var camxVal = camx * this.camInt;
		var camyVal = camy * this.camInt;

		var rows = this.numberOfFrames / this.numberOfCols;

		if (!this.TELL_ONCE)
		{
		trace("rows" + this.height/rows);
		this.TELL_ONCE = true;
		}
		//blitRect.x = (animFrame % tileSheetCols) * (myTileRadius * 2);
		//blitRect.y = (int(animFrame / tileSheetCols)) * (myTileRadius * 2);

        // Draw the animation
        this.context.drawImage
			(
			this.image,
			(this.frameIndex % this.numberOfCols) * (this.width/this.numberOfCols),//this.frameIndex * this.width / this.numberOfFrames,
			Math.floor(this.frameIndex / this.numberOfCols) * (this.height/rows),//0,
			this.width / this.numberOfCols,//this.width / this.numberOfFrames
			this.height / rows,//,//this.height,
			Math.floor(this.x - camxVal - (this.offX) * this.scale),
			Math.floor(this.y - camyVal - (this.offY) * this.scale),

			(this.width / this.numberOfCols) * this.scale, //(this.width / this.numberOfFrames) * this.scale,
			(this.height / rows) * this.scale //this.height * this.scale
			);

        //this.context.restore();

      /*  if (this.myString) 
        {
			ctx.fillStyle = "rgb(250, 250, 0)"; ctx.font = "24px Helvetica";
			ctx.fillText(this.myString, this.x, this.y);
		}*/

    }; 


	resetMe() 
	{
		this.frameInt = 0;
	}

	forceFrameMe(frame) 
	{
		this.frameIndex = frame;
	}

	getFrameWidth() 
	{
		return this.width / this.numberOfFrames;
    };

}