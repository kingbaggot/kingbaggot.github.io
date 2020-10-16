var tx = 0;
var ty = 0;
var TOUCHED = false;
var touchText = "false";
var touchNum = 1;
var touchNum2 = 1;

document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

canvas.addEventListener("touchstart", function(event) {

	for (var i = 0; i < event.changedTouches.length; i++) 
	{
       TOUCHED = true;
       var touch = event.touches[i];
	   tx = (touch.pageX - canvasX) * canvasScaleX;//(400 / canvas.style.width);
	   ty = (touch.pageY - canvasY) * canvasScaleY//(640 / canvas.style.height);
	}

}, false);

canvas.addEventListener('touchmove', function(event) {

	for (var i = 0; i < event.touches.length; i++) 
	{
		var touch = event.touches[i];
		tx = (touch.pageX - canvasX) * canvasScaleX;//(400 / canvas.style.width);
		ty = (touch.pageY - canvasY) * canvasScaleY//(640 / canvas.style.height);

		//console.log("ttbonk" + tx)
	}
}, false);



canvas.addEventListener("touchend", function(event) 
{

	for (var i = 0; i < event.changedTouches.length; i++) 
	{

		if (TOUCHED)

			TOUCHED = false;
		
	}

}, false);


addEventListener('mousemove', on_canvas_move, false);
addEventListener('mousedown', on_canvas_click, false);
addEventListener('mouseup', on_canvas_clickend, false);

function on_canvas_click(ev) {

	//console.log("pre bonk" + canvasX)
	tx = (ev.clientX - canvasX) * canvasScaleX;//(400 / canvas.style.width);
	ty = (ev.clientY - canvasY) * canvasScaleY//(640 / canvas.style.height);
	console.log("bonk"+tx)
	TOUCHED = true;

}

function on_canvas_move(ev) {

	//console.log("pre bonk move" + canvasX)
	tx = (ev.clientX - canvasX) * canvasScaleX;//(400 / canvas.style.width);
	ty = (ev.clientY - canvasY) * canvasScaleY//(640 / canvas.style.height);
	//console.log("bonk move" + tx)
	//TOUCHED = true;

}

function on_canvas_clickend(ev) 
{

    TOUCHED = false;

}