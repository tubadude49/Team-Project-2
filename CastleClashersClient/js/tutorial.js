var tutImage = new Sprite(1480, 1280);
var arrow = new Sprite(200, 69);

var tutorClick = function() {
	core.rootScene.removeChild(startButton);
	core.rootScene.removeChild(tutorButton);
		
	tutImage.image = core.assets['assets/tut.png'];
	tutImage.frame = 0;	

	arrow.image = core.assets['assets/greenArrow.png'];
	arrow.x = core.width - coreUISize;
	arrow.y = core.height - 89;
	arrow.on(enchant.Event.TOUCH_START, arrowClick);

	core.rootScene.addChild(tutImage);
	core.rootScene.addChild(arrow);
	
	//castle1.sprite.health = 100;
	//castle2.sprite.health = 200;
}

var tutFrame = 0;

var arrowClick = function(event) {
	tutFrame = tutFrame + 1;
	console.log(tutFrame);
	if(tutFrame < 11)
	{
		tutImage.frame = parseInt(tutFrame);
	}
	else 
	{
		tutFrame = 0;
		core.rootScene.addChild(startButton);
		core.rootScene.addChild(tutorButton);
		core.rootScene.removeChild(tutImage);
		core.rootScene.removeChild(arrow);		
	}
	
}