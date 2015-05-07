//BusinessInfo is an array of business types. It contains the businesses. 
//When the document loads the first business type will display

//x is the number of the business type currently being displayed
var x;
var currentBusinessType;				//This will store the current business type being displayed
var myTimer;


$(document).ready(function(){
	var ctx = document.getElementById("myCanvas").getContext('2d');
	ctx.canvas.width = $("#businessPictures").width();
	ctx.canvas.height = $("#businessPictures").height();
	x = 0;
	currentBusinessType = businessInfo[x];
	currentBusinessType.display();
	
	document.getElementById("myCanvas").addEventListener('click', function(evt) {					//If the user clicks on the canvas we see if their was a collision with a pic and if so we will display its info
	var mousePos = getMousePos(this, evt);
	var collide = checkCollision(currentBusinessType.businesses, currentBusinessType.x, currentBusinessType.tWidth, mousePos);		//This will get the business the mouse collided with otherwise null
	if(collide !== null){										//If there was a collision between the mouse and one of the business Pictures, we display its information
		collide.display();
	}
	
}, false);

	
	
	
	
})

function nextBusinessType(){					//This will move to the next business type and display it
	currentBusinessType.unloadBusinesses();
	x++;								//Go to the next business type
	x %= businessInfo.length;			//This will keep the value of x within the range of the number of business types
	currentBusinessType = businessInfo[x];		//Set the current bussiness being displayed to the information of the business that should be displayed
	currentBusinessType.display();
}

function previousBusinessType(){							//this function will change the business type being displayed to the previous one
	currentBusinessType.unloadBusinesses();
	x--;
	if(x < 0) x = businessInfo.length - 1;
	currentBusinessType = businessInfo[x];
	currentBusinessType.display();
}

function clearDisplay(){									//This function will clear the display for displaying info for a particular business
	
	
}

function drawBusinesses(theBusinesses,startPoint,redo){					//This function will draw the businesses starting at the designated point
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');
	
	if(redo){
		ctx.fillStyle="rgb(165,42,42)";
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}
	var dx = 0;
	for(var index = 0; index < theBusinesses.length; index++){
		theBusinesses[index].draw(index,startPoint);
	}
	return 300 * index;
}

function getMousePos(canvas, evt) {									//Returns the position of the mouse  (.x is the x position      .y is the y position)
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}

function checkCollision(businesses, x, width, myMouse){					//This function will return the business that was clicked on by using the x position and the width of the businesses
	var sx = myMouse.x - x;
	if(sx < 0){
		sx = width + sx;
	}
	if(sx > width){
		sx -= width;
	}
	var i = parseInt(sx / 300);
	var b = businesses[i];											//The b is the business that you got close to clicking on
	return b;

}

function previousBusinesses(){
	
	
	myTimer = setInterval(function(){
		currentBusinessType.x += 20;
		currentBusinessType.updateBusinesses();
	},50);
}

function nextBusinesses(){
	
	myTimer = setInterval(function(){
		currentBusinessType.x -= 20;
		currentBusinessType.updateBusinesses();
	},50);
}

function stopMotion(){											//This function stops the businesses from moving
	clearInterval(myTimer);
}

function findBusiness(img) {
	for(var index = 0; index < currentBusinessType.businesses.length; index++){
		if (img == currentBusinessType.businesses[index].img) {
			return index;
		}
	}
	return -1;
}

