window.onload = function(){
	core = new Core(1280+coreUISize,720+bottomUISize);

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/button_select.png', 'assets/button_select_selected.png', 
				'assets/button_attack.png', 'assets/button_attack_selected.png', 'assets/attackUI.png', 'assets/upgradeUI.png', 
				'assets/buyInfantry.png', 'assets/buyCavalry.png', 'assets/buyArmor.png','assets/reinforceCastle.png', 
				'assets/reinforceRegiment.png','assets/upgradeRegiment.png', 'assets/gold.png', 'assets/cannon.png', 
				'assets/castle.png', 'assets/castle_bronze.png', 'assets/castle_silver.png', 'assets/castle_gold.png');
	
	core.onload = function() {
		
		var background = new Sprite(core.width-coreUISize, core.height - bottomUISize);
		background.backgroundColor = "#008000";
		background.moveTo(0, 50);
		background.addEventListener(enchant.Event.TOUCH_START, backgroundClick);
		core.rootScene.addChild(background);
		
		var backgroundUI = new Sprite(coreUISize, core.height);
		backgroundUI.x = core.width - coreUISize;
		backgroundUI.backgroundColor = "#81DAF5";
		core.rootScene.addChild(backgroundUI);
		
		var bottomUI = new Sprite(core.width, bottomUISize);
		bottomUI.x = 0;
		bottomUI.y = background.height;
		bottomUI.backgroundColor = "#81DAF5";
		core.rootScene.addChild(bottomUI);
		
		/*selectButton = new Sprite(106, 43);
		selectButton.image = core.assets['assets/button_select_selected.png'];
		selectButton.x = background.width/2 - selectButton.width;
		selectButton.y = bottomUI.y;
		selectButton.addEventListener(enchant.Event.TOUCH_START, selectButtonClick);
		core.rootScene.addChild(selectButton);
		
		attackButton = new Sprite(106, 43);
		attackButton.image = core.assets['assets/button_attack.png'];
		attackButton.x = background.width/2 + attackButton.width;
		attackButton.y = bottomUI.y;
		attackButton.addEventListener(enchant.Event.TOUCH_START, attackButtonClick);
		core.rootScene.addChild(attackButton);*/
		
		goldImage = new Sprite(32, 32);
		goldImage.image = core.assets['assets/gold.png'];
		goldImage.frame = 4;
		goldImage.x = 100;
		goldImage.y = bottomUI.y + 10;
		core.rootScene.addChild(goldImage);
		
		goldAmount = new Label('0');
		goldAmount.x = goldImage.x + goldImage.width;
		goldAmount.y = goldImage.y;
		core.rootScene.addChild(goldAmount);
		/*
		var castle1 = new Castle();
		castle1.sprite.x = 0;
		castle1.sprite.y = 0;
		castle1.sprite.owner = 0;
		
		var castle2 = new Castle();
		castle2.sprite.x = background.width - castle2.sprite.width;
		castle2.sprite.y = 500;
		castle2.sprite.owner = 1;
		
		var castle3 = new Castle();
		castle3.sprite.x = 0;
		castle3.sprite.y = background.height - castle3.sprite.height;
		
		var castle4 = new Castle();
		castle4.sprite.image = core.assets['assets/castle.png'];
		castle4.sprite.x = background.width - castle4.sprite.width;
		castle4.sprite.y = background.height - castle4.sprite.height;
		castle4.sprite.owner = 1;
		core.rootScene.addChild(castle4.sprite);
		
		var castle_mid = new Castle();
		castle_mid.sprite.x = (background.width - castle_mid.sprite.width) / 2;
		castle_mid.sprite.y = (background.height - castle_mid.sprite.height) / 2;
		core.rootScene.addChild(castle_mid.sprite);
		*/
		/*var cav = new Unit("cavalry");
		cav.sprite.x = 150;
		cav.sprite.y = 150;
		cav.sprite.uuid = 150;
		cav.sprite.owner = 1;
		core.rootScene.addChild(cav.sprite);
		/*
		var cav2 = new Unit("cavalry");
		cav2.sprite.x = 250;
		cav2.sprite.y = 250;
		cav2.sprite.uuid = 250;
		core.rootScene.addChild(cav2.sprite);*/
		/*var tmp_cavalry = new Unit('cavalry');
		tmp_cavalry.sprite.moveTo(100,100);*/
		
	}
	
	instance = new Instance();
	core.start();
}
