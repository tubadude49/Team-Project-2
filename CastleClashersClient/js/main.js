window.onload = function(){	
	establishCore();
}

var clickArray = [];
var clickStart;

var establishCore = function() {
	core = new Core(1280+coreUISize,1280);

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/button_select.png', 'assets/button_select_selected.png', 
				'assets/button_attack.png', 'assets/button_attack_selected.png', 'assets/attackUI.png', 'assets/upgradeUI.png', 
				'assets/buyInfantry.png', 'assets/buyCavalry.png', 'assets/buyArmor.png','assets/reinforceCastle.png', 
				'assets/reinforceRegiment.png','assets/upgradeRegiment.png', 'assets/gold.png', 'assets/cannon.png', 
				'assets/castle.png', 'assets/castle_bronze.png', 'assets/castle_silver.png', 'assets/castle_gold.png',
				'assets/redcross.png', 'assets/defense.png', 'assets/attack2.png', 'assets/upgrade.png', 'assets/veterancy.png',
				'assets/xp.png', 'assets/speed.png', 'assets/cobble.png', 'assets/grass1.png', 'assets/upgradeCastle.png',
				'assets/war.png', 'assets/alliance.png','assets/flags.png','assets/bar.png','assets/fireball.png','assets/swords.png',
				'assets/yellowpix.png','assets/greenArrow.png','assets/tut.png');
	
	core.onload = function() {
		vert1.image = core.assets['assets/yellowpix.png'];
		vert2.image = core.assets['assets/yellowpix.png'];
		hori1.image = core.assets['assets/yellowpix.png'];
		hori2.image = core.assets['assets/yellowpix.png'];
		
		startButton.text = "Start";
		startButton.x = core.width / 2 - 100;
		startButton.y = 50;
		core.rootScene.addChild(startButton);
		startButton.on(enchant.Event.TOUCH_START, startButtonClick);
		
		tutorButton.text = "Tutorial";
		tutorButton.x = core.width / 2 - 140;
		tutorButton.y = startButton.y + 150;
		core.rootScene.addChild(tutorButton);
		tutorButton.on(enchant.Event.TOUCH_START, tutorClick);

		startButton.font = "bold 60px ken-vector-future-thin";
		tutorButton.font = "bold 60px ken-vector-future-thin";
		
		/**/
		
	}
	
	instance = new Instance();
	core.start();
}
