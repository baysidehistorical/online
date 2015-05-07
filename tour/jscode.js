

/***********************  Arrow Class   **************************/

function Arrow(a, x, y, z){
    this.angle = a;
    this.x = x;
    this.y = y;
    this.z = z;
    this.myX;
    this.myY;
    
    
    //The Update function will draw the arrow on the screen
    
    this.update = function(a){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        //a *= -1;                                                                      //This will have the arrows move in the opposite direction of the picture
        var x = -16.25;//(22.5) * Math.cos(((-a + 90 + this.angle) % 360) * Math.PI / 180);      //this will get the x-coordinate of the center of the circle if it were on a normal graph
        var y = -6.5 - 32.5;//(22.5) * Math.sin(((-a + 90 + this.angle) % 360) * Math.PI / 180);      //this will get the y-coordinate of the center of the circle if it were on a normal graph
        this.myX = ((22.5) * Math.cos(((-a + 90 + this.angle) % 360) * Math.PI / 180) + canvas.width/2);                                                   //convert the x-coordinate of the arrow so that it works with the computer
        this.myY = ((22.5) * Math.sin(((-a + 90 + this.angle) % 360) * Math.PI / 180) - canvas.height/2) * -1;                                             //convert the y-coordinate of the arrow so that it works with the computer
        ctx.save();
        //ctx.translate(x,y);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate((a - this.angle ) * Math.PI / 180 );
        //ctx.drawImage(this.img, -16.25, -16.25, 32.5, 32.5);
        ctx.drawImage(this.img,x,y,32.5,32.5);
        ctx.restore();
        /*ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = "green";//"rgba(140,130,136,0.5)";
        ctx.fill();
        */
        //this.myX = x;
        //this.myY = y;
        
        //Draw the arrow on the screen
    };
    
    
    //Return true if the user clicked on this arrow; otherwise False
    
    this.checkCollision = function(mx,my){
        var distance = Math.sqrt(Math.pow(this.myX - mx,2) + Math.pow(this.myY-my,2));
        if (distance < 16.25) {
            
            return true;
        }
        else
        {
            return false;
        }
    };
}


/************************** Sphere Class  ************************/

function Sphere(nxtSrc,myArrows){
    this.src = nxtSrc;
    this.isCurrent = false;
    this.myArrows = myArrows;
    this.img = new Image();
    this.img_high = new Image();
	
    this.img_high.onload = function(){
        var s = findSphere(this);
        s.img = this;
        s.scale = 6480 / this.width;
        if(s.isCurrent){
            s.update(cAngle,y);
        }
    };
    
	this.load = function(){
        if (this.img.src === "" ) {
            this.img.src = "http://gdriv.es/projectimages/" + this.src;
            this.img_high.src = "http://gdriv.es/imageshigh/" + this.src;
        }
    };
    this.update = function(angle, y){
        //This function must redraw the image to the canvas using the angle it is given.
        var canvas = document.getElementById("myCanvas");       //This Contains the Canvas
        var ctx = canvas.getContext('2d');                      //The graphics for Canvas
        this.scale = 6480/this.img.width;//canvas.height / this.img.height;                 //The scale of the picture. Originally set so that the picture will cover the canvas
        var iWidth = this.img.width * this.scale;                         //The final width of the picture after being resized
        var iHeight = this.img.height * this.scale;                       //The final height of the picture after being resized
        var aScale = iWidth / 360;                              //How much the picture will move with each degree
        var x = aScale * angle;                                 //The x-position of the image at this angle. 
        ctx.drawImage(this.img, x, y, iWidth, iHeight);
      
        //If the x is somewhere on the screen then you will draw two of the same image and connect them
        if (x > 0){
            ctx.drawImage(this.img, x - iWidth, y, iWidth, iHeight);
        }
        if (x + iWidth < canvas.width)
        {
            ctx.drawImage(this.img, x + iWidth, y, iWidth, iHeight);
        }
            
        
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 39, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(140,130,136,0.5)";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 6.5,0,2*Math.PI,false);
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fill();
        
        //This will update all the arrows by redrawing them in their correct positions for the given angle
        
        for(var index = 0; index < this.myArrows.length; index++){
            this.myArrows[index].update(angle);
        }
        displayRoom();
    };
    this.checkArrows = function(mx,my){
        for(var index = 0; index < this.myArrows.length; index++){
            if (this.myArrows[index].checkCollision(mx,my)){
                return this.myArrows[index];
            }
        }
        return null;
    };
    
    
    
    
    
    
    
    
}



