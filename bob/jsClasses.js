function business(name,image,location,description,address){					//the location will hold the html for the google maps frame

	this.name = name;
	this.image = "images/" + image;
	this.location = location;
	this.description = description;
	this.address = address;
	this.img = new Image();
	
	
	
	
	
	this.display = function(){
		/*This function will display the information for this business on the screen.
			It will do the following:
				It will display the name of the business on the top
				Then it will have the image for the business on the left and the description to its right
				Following that we will display the street address of the business and underneath that we will show its location on a google maps plugin
		
		*/
		
		
		//This is what is going to be put in the announcement div layer
		$("#businessPic").html(
			 //"<img src = \"close.jpg\" onclick = clearDisplay() > "
			
			
			
			 
			
			"<h1>" + this.name + "</h1>"
			
			
			
			+
			
			"<img src = \" " + this.image + " \" style = \" border: 5px solid white;  \" >"
			
			+
			
			"<p>" + this.description + "</p>"
			
			+
			
			this.address
			
			+
			
			"<br/>"
			
			+
			
			this.location
			
		);
		
		
		
		
	};
	
	//this function will begin loading the image
	this.loadImage = function(){
		this.img.onload = function(){
		var myPos = findBusiness(this);
		if(myPos > -1){
			//currentBusinessType.businesses[myPos].draw(myPos,currentBusinessType.x);
			currentBusinessType.updateBusinesses();
		}
		}
		this.img.src = this.image;
	};
	
	this.draw = function(i, startPos){				//This will draw the business depending on the i position and the x 
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext('2d');
		
		var scale = canvas.height/this.img.height;
		
		//Each image has 300 pixels to sit in
		
		
		var difference = (300 - this.img.width * scale) / 2;
		var dx = 300 * i + difference;
		
		if(startPos + dx > -this.img.width * scale && startPos + dx < canvas.width)
			ctx.drawImage(this.img, startPos + dx, 0, this.img.width * scale, this.img.height * scale);
	};
	
	this.unload = function(){
		this.img = new Image();
		
	
	}
}


//A business type has an array of businesses, a name(string) such as food or service, and an image src(string) indicating where to get the image from

function businessType(businesses,name,image){
	this.businesses = businesses;
	this.name = name;
	this.image = "images/" + image;
	this.x = 0;					//This will be the x-position for the beginning of the train of pics
	this.tWidth = 0;
	
	this.unloadBusinesses = function(){
		for(var index = 0; index < businesses.length; index++){
			businesses[index].unload();
		}
	}
	
	
	this.display = function(){
		/*
			The purpose of this function is to display the images for all the businesses of this business type
			It will change the content of the div layers in index by using inner html.
			this.image will display in #Businesspic and this.name will display in #businessName
		
		*/
		$("#businessName").html(this.name);
		document.getElementById("type").style.backgroundImage =  "url(\""+ this.image + "\")";
		$("#businessPic").html("<img src = \"" + this.image + "\"   style =  'width: 100%; height: 95%;' >");
		
		//Still need to display the businesses on the bottom of the screen - Probably with the use of a canvas
		
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext('2d');
		//this.tWidth = drawBusinesses(this.businesses, this.x, true);								//This function will draw the businesses starting on the part of the screen requested

		
		/*
			the following code must be run every time the pictures are moved on the screen as well as in the beginning. 
			That will ensure that their is never an empty area on the canvas where pictures of businesses are not being shown
		
		*/
		for(var index = 0; index < businesses.length; index++){
			businesses[index].loadImage();
		}
		this.updateBusinesses();
		
		
	}
	
	this.updateBusinesses = function(){						//this function will redraw the business pictures depending on the x
		var canvas = document.getElementById("myCanvas");
	
		this.tWidth = drawBusinesses(this.businesses,this.x,true);
		
		if(this.x > 0){
			drawBusinesses(this.businesses,this.x - this.tWidth,false);
		}
		
		if(this.x + this.tWidth <= canvas.width){
			drawBusinesses(this.businesses,this.x + this.tWidth,false);								//If the end of the businesses is showing, redraw them on the end
		}
		
		if(this.x > canvas.width){
			this.x -= this.tWidth;
		}
		
		if(this.x + this.tWidth <= 0){									//If the second display of businesses reaches the beginning of the screen we will reposition the starting point
			this.x += this.tWidth;
		}
		
		
	}


}