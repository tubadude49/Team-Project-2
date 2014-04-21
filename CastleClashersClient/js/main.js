window.onload = function(){	
	establishCore();
}

var clickArray = [];
var clickStart;

var establishCore = function() {
	core = new Core(1280+coreUISize,1280);

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/gold.png', 'assets/cannon.png', 
				'assets/castle.png', 'assets/castle_bronze.png', 'assets/castle_silver.png', 'assets/castle_gold.png',
				'assets/redcross.png', 'assets/defense.png', 'assets/attack2.png', 'assets/upgrade.png', 
				'assets/veterancy.png',	'assets/xp.png', 'assets/speed.png', 'assets/cobble.png', 'assets/grass1.png', 
				'assets/flags.png','assets/bar.png','assets/fireball.png','assets/swords.png',
				'assets/yellowpix.png','assets/greenArrow.png','assets/tut.png', 'assets/castleclashersbk.png');
	
	core.onload = function() {
		vert1.image = core.assets['assets/yellowpix.png'];
		vert2.image = core.assets['assets/yellowpix.png'];
		hori1.image = core.assets['assets/yellowpix.png'];
		hori2.image = core.assets['assets/yellowpix.png'];
		
		menubackground = new Sprite(1280+coreUISize,1280);
		menubackground.image = core.assets['assets/castleclashersbk.png'];
		menubackground.x = 0;
		menubackground.y = 0;
		core.rootScene.addChild(menubackground);
		
		castleClashersLabel.text = '   Castle                                                                                                Clashers';
		castleClashersLabel.x = core.width / 2 - 275;
		castleClashersLabel.y = 150;
		castleClashersLabel.width = 550;
		core.rootScene.addChild(castleClashersLabel);
		
		startButton.text = "Start";
		startButton.x = core.width / 2 - 100;
		startButton.y = 550;
		core.rootScene.addChild(startButton);
		startButton.on(enchant.Event.TOUCH_START, startButtonClick);
		
		tutorButton.text = "Tutorial";
		tutorButton.x = core.width / 2 - 140;
		tutorButton.y = startButton.y + 150;
		core.rootScene.addChild(tutorButton);
		tutorButton.on(enchant.Event.TOUCH_START, tutorClick);

		startButton.font = "bold 60px ken-vector-future-thin";
		tutorButton.font = "bold 60px ken-vector-future-thin";
		castleClashersLabel.font = "bold 108px ken-vector-future-thin";
		
		/**/
		
	}
	
	instance = new Instance();
	core.start();
}
