

function updateCastList()
{

	for (var i = 0; i < this.castList.length-1; i++) 
	{
		var childA = this.castList[i];
		var childB = this.castList[i + 1];

		if (childA.depth > childB.depth) 
		{
			this.castList[i + 1] = childA;
			this.castList[i] = childB;
		}
	}

	for (var i = 0; i < this.castList.length; i++)
	{
		this.castList[i].renderMe();
	}


	this.removeDeadSps();
}

function removeDeadSps()
{

	for (var i = 0; i < this.castRemoveList.length; i++) {
		var removeInt = this.castList.indexOf(this.castRemoveList[i]);

		if (removeInt != -1)
		{
			console.log("remove somesrpite" + this.castList[removeInt].image);
			this.castList.splice(removeInt, 1);
		}
	}

	this.castRemoveList = [];

}