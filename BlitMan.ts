



class BlitMan 
{


	mySprite;
	
	grav;
	myWorld;
	myType;
	obstType;
	dy = -3;

	

	//(xpos,ypos,offXP,offYP,frameP,myWorldP,myTypeP:Int = 0,myDepthP:Int = 0,myForceScale:Float = 1,camIntP:Int = 1) 
	constructor(xposP, yposP, offXP, offYP, frameP, myWorldP, myTypeP = 0, myDepthP = 0, myForceScale = 1, camIntP = 1) 
	{
		var teamSheet = "man";
		this.myType = myTypeP;

		this.mySprite = new Sprite({image: getPic(teamSheet), x: xposP, y: yposP, offX: offXP, offY: offYP,
			depth: 10, numberOfFrames: 3, numberOfCols: 3, camInt: 1, scale: 0.5
		})
		
		this.mySprite.myAnimArray = 
		[
			[true, 3, 0],	//run right w. ball
			[true, 9, 3, 4, 5, 4],	//run right ball less
			[true, 5, 6, 7],      // happy
			[false, 5, 9],		// sad
			[true, 9, 9, 10, 11, 10], // run left w.ball
			[true, 9, 12, 13, 14, 13], // run left without ball
			[false, 0, 8], // kick IT
			[true, 5, 21, 22], // keeper facing right.
			[true, 5, 24, 25], // keeper facing left.
			[true, 5, 23], // keeper facing right.+ball
			[true, 5, 26] // keeper facing left.+ball
		];

		

	}

	

	

	
	updateMe()
	{
		
		this.mySprite.y += this.dy * deltaT;
        this.dy += 0.2 * deltaT;

        if (this.mySprite.y > 590) {
			this.mySprite.y = 590;
			this.dy = -5 - getRand(10)
        }
	}


}