

class GameScreen {
	
	public static spList;
	public static myPlayer;

	gameBg;
    spRemoveList;
	addTimer = 0;
	constructor()
	{
		console.log("game added");
		
		GameScreen.spList = [];
		this.spRemoveList = [];

		this.gameBg = new Sprite({
			image: getPic("bg2"), x: 0, y: 0, offX: 0, offY: 0})
		
		//addPlayer(200, 400);

	}



	updateMe() 
	{
		
		this.addTimer++;

		if(this.addTimer % 100 == 1)
		{
			var blitGuy = new BlitMan(5 + getRand(390),10,0,0,0,this)
			GameScreen.spList.push(blitGuy);
		}

		for (var i = 0; i < GameScreen.spList.length; i++) {
			GameScreen.spList[i].updateMe();
		}

		this.removeDeadSps();

		
		
	}


	removeDeadSps() 
	{

		for (var i = 0; i < this.spRemoveList.length; i++) 
		{
			var removeInt = GameScreen.spList.indexOf(this.spRemoveList[i]);  

			if(removeInt != -1)
			{
				castRemoveList.push(GameScreen.spList[removeInt].mySprite);
				GameScreen.spList.splice(removeInt, 1);
			}
		}

		this.spRemoveList = [];

	}

	deleteMe() 
	{
    
	}


	

	
	
}


