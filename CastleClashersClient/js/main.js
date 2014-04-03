window.onload = function(){
	establishWS();

	core = new Core(1280+coreUISize,720);

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/button_select.png', 'assets/button_select_selected.png', 
				'assets/button_attack.png', 'assets/button_attack_selected.png', 'assets/attackUI.png', 'assets/upgradeUI.png', 
				'assets/buyInfantry.png', 'assets/buyCavalry.png', 'assets/buyArmor.png','assets/reinforceCastle.png', 
				'assets/reinforceRegiment.png','assets/upgradeRegiment.png', 'assets/gold.png', 'assets/cannon.png', 
				'assets/castle.png', 'assets/castle_bronze.png', 'assets/castle_silver.png', 'assets/castle_gold.png',
				'assets/redcross.png', 'assets/defense.png', 'assets/attack2.png', 'assets/upgrade.png', 'assets/veterancy.png',
				'assets/xp.png', 'assets/speed.png', 'assets/cobble.png', 'assets/grass1.png', 'assets/upgradeCastle.png',
				'assets/war.png', 'assets/alliance.png','assets/flags.png');
	
	core.onload = function() {
		
		var background = new Sprite(core.width-coreUISize, core.height - bottomUISize);
		background.image = core.assets['assets/grass1.png'];
		background.moveTo(0, 50);
		background.addEventListener(enchant.Event.TOUCH_START, backgroundClick);
		core.rootScene.addChild(background);
		
		var backgroundUI = new Sprite(coreUISize, core.height);
		backgroundUI.image = core.assets['assets/cobble.png'];
		backgroundUI.x = core.width - coreUISize;
		core.rootScene.addChild(backgroundUI);
		
		goldImage = new Sprite(32, 32);
		goldImage.image = core.assets['assets/gold.png'];
		goldImage.frame = 4;
		goldImage.x = core.width / 2;
		goldImage.y = 9;
		core.rootScene.addChild(goldImage);
		
		goldAmount = new Label('0');
		goldAmount.x = goldImage.x + goldImage.width;
		goldAmount.y = goldImage.y;
		core.rootScene.addChild(goldAmount);
				
		health.font = "bold 26px arial,serif";
		upgrade.font = "bold 26px arial,serif";
		goldAmount.font = "bold 26px arial,serif";
		castleUpgrade.font = "bold 26px arial,serif";
		unitXP.font = "bold 26px arial,serif";
		veterancy.font = "bold 26px arial,serif";
		unitUpgrade.font = "bold 26px arial,serif";
		unitAttack.font = "bold 26px arial,serif";
		unitDefense.font = "bold 26px arial,serif";
		unitSpeed.font = "bold 26px arial,serif";
		
		
	}
	
	instance = new Instance();
	core.start();
}
