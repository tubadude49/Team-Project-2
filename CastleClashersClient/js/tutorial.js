var tutImage = new Sprite(1480, 1280);
var tutImage2 = new Sprite(1480, 1280);
var arrow = new Sprite(160, 50);

var tutorClick = function() {
	core.rootScene.removeChild(startButton);
	core.rootScene.removeChild(tutorButton);
	
		
	tutImage.image = core.assets['assets/tut.png'];
	tutImage.frame = 0;	
	
	tutImage2.image = core.assets['assets/tut2.png'];
	tutImage2.frame = 0;
	
	arrow.image = core.assets['assets/greenArrow.png'];
	arrow.x = core.width - coreUISize + 20;
	arrow.y = core.height - 69;
	arrow.on(enchant.Event.TOUCH_START, arrowClick);

	
	core.rootScene.addChild(tutImage);
	core.rootScene.addChild(arrow);
	
	
}

var tutFrame = 0;
var tutFrame2 = 0;

var arrowClick = function(event) {
	console.log("tutFrame:"+tutFrame);
	console.log("tutFrame2:"+tutFrame2);
	core.assets['assets/click.wav'].play();
	
	if(tutFrame <= 10)
	{
		console.log("if1");
		tutFrame = tutFrame + 1;
		tutImage.frame = parseInt(tutFrame);
	}
	else if(tutFrame > 10)
	{	
		console.log("if2");
		tutFrame = "DONE";
		core.rootScene.removeChild(tutImage);
		core.rootScene.addChild(tutImage2);
		core.rootScene.addChild(arrow);
	}
	else if(tutFrame == "DONE" && tutFrame2 < 1)
	{
		console.log("if3");
		tutFrame2 = tutFrame2 + 1;
		tutImage2.frame = parseInt(tutFrame2);
		
	}
	else 
	{
		tutFrame = 0;
		tutFrame2 = 0;
		core.rootScene.addChild(startButton);
		core.rootScene.addChild(tutorButton);
		core.rootScene.removeChild(tutImage);
		core.rootScene.removeChild(tutImage2);
		core.rootScene.removeChild(arrow);		
	}
	
}