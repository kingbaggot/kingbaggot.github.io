
var loadedGfxInt = 0;
var imagesLoadList = ["images/bg2.png", "images/man.png" ];
var LOADED_GFX = false;
var testText = "blarg";

var imagesLoadIntList = [];

startLoadingGfx();

function startLoadingGfx() 
{
	
	for (var i = 0; i < imagesLoadList.length; i++) 
	{
		// imagesLoadIntList.push(null);

		var tempLoadImage = new Image();
		tempLoadImage.src = imagesLoadList[i];
		tempLoadImage.id = i;
		console.log("loading " + imagesLoadList[i] + " id=" + tempLoadImage.id);

		imagesLoadIntList.push(null);


		tempLoadImage.onload = function(e) 
		{
			loadedGfxInt++;
			imagesLoadIntList[e.target.id] = e.target;
			console.log("LOADED >" + e.target.id + " gfx done=" + loadedGfxInt)
		};
    }

    console.log("that list is " + imagesLoadIntList)
}

loadLoop();

function loadLoop() 
{
	 if(!LOADED_GFX)
    {
    console.log("LADDY"+loadedGfxInt);
        
        if(loadedGfxInt < imagesLoadList.length)
        {
            if(imagesLoadIntList[0])
            {
            ctx.drawImage(imagesLoadIntList[0], 0, 0);
            }

	        testText = (loadedGfxInt+" / "+imagesLoadList.length)// (Math.floor(tx)+": "+Math.floor(ty)+" scaX"+canvasScaleX);
	          // Score
	        ctx.fillStyle = "rgb(250, 250, 0)";
	        ctx.font = "24px Helvetica";
	        ctx.textAlign = "center";
	        ctx.textBaseline = "top";
	        ctx.fillText("LOADING : " + testText, 200, 300);

        requestAnimFrame(loadLoop);
       
        }else{

        addGameScreen();
        LOADED_GFX = true;
        //imagesLoadedDefineStuff();
        }
    }

}

function getPic(inString)
{

	var retInt = imagesLoadList.indexOf("images/"+inString+".png");

	

	return imagesLoadIntList[retInt];
}



