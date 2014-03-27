enchant();

var units = [];
var castles = [];

var core;
var instance;
var coreUISize = 200;
var bottomUISize = 50;
var selected_obj = {};
var selectButton;
var attackButton;
var buttonSelected = 0;


window.onload = function(){
	core = new Core(1280+coreUISize,720+bottomUISize);
	//scene = new Scene();

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/castle.png', 'assets/button_select.png', 
				'assets/button_select_selected.png', 'assets/button_attack.png', 'assets/button_attack_selected.png',
 				'assets/attackUI.png', 'assets/upgradeUI.png', 'assets/buyInfantry.png', 'assets/buyCavalry.png',
				'assets/buyArmor.png','assets/reinforceCastle.png','assets/reinforceRegiment.png','assets/upgradeRegiment.png');
	
	core.onload = function() {
		
		var background = new Sprite(core.width-coreUISize, core.height - bottomUISize);
		background.backgroundColor = "#008000";
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
		
		selectButton = new Sprite(106, 43);
		selectButton.image = core.assets['assets/button_select.png'];
		selectButton.x = background.width/2 - selectButton.width;
		selectButton.y = bottomUI.y;
		selectButton.addEventListener(enchant.Event.TOUCH_START, selectButtonClick);
		core.rootScene.addChild(selectButton);
		
		attackButton = new Sprite(106, 43);
		attackButton.image = core.assets['assets/button_attack.png'];
		attackButton.x = background.width/2 + attackButton.width;
		attackButton.y = bottomUI.y;
		attackButton.addEventListener(enchant.Event.TOUCH_START, attackButtonClick);
		core.rootScene.addChild(attackButton);
		
		/*var castle1 = new Castle();
		castle1.sprite.x = 0;
		castle1.sprite.y = 0;
		
		var castle2 = new Castle();
		castle2.sprite.x = background.width - castle2.sprite.width;
		castle2.sprite.y = 0;
		
		var castle3 = new Castle();
		castle3.sprite.x = 0;
		castle3.sprite.y = background.height - castle3.sprite.height;
		
		var castle4 = new Castle();
		castle4.sprite.x = background.width - castle4.sprite.width;
		castle4.sprite.y = background.height - castle4.sprite.height;
		
		var castle_mid = new Castle();
		castle_mid.sprite.x = (background.width - castle_mid.sprite.width) / 2;
		castle_mid.sprite.y = (background.height - castle_mid.sprite.height) / 2;
		core.rootScene.addChild(castle_mid.sprite);*/
		
		/*var cav = new Unit("cavalry");
		cav.sprite.x = castle1.width;
		cav.sprite.y = castle1.height;
		core.rootScene.addChild(cav.sprite);*/
		
		/*var tmp_cavalry = new Unit('cavalry');
		tmp_cavalry.sprite.moveTo(100,100);*/
		
	}
	
	instance = new Instance();
	core.start();
}

var selectButtonClick = function(event) {
	this.image = core.assets['assets/button_select_selected.png'];
	attackButton.image = core.assets['assets/button_attack.png'];
	buttonSelected = 0;
}

var attackButtonClick = function(event) {
	this.image = core.assets['assets/button_attack_selected.png'];
	selectButton.image = core.assets['assets/button_select.png'];
	buttonSelected = 1;
}

var castleClick = function(event) {
	/*var label = Label('');
	label.text += 'Castle Clicked';
	label.x = this._x;
	label.y = this._y;
	core.rootScene.addChild(label);*/
	
	/*var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'cavalry';
	request.uuid = instance.uuid;
	ws.send(JSON.stringify(request));*/
	
	if(buttonSelected == 0) {
		if(!this.selected)
		{
			this.selected = true;
			selected_obj = this;
			/*selected_uuid = this.uuid;
			selected_type = 'unit';*/
		}
		else if(this.selected)
		{
			this.selected = false;
			selected_obj = {};
			/*selected_uuid = -1;
			selected_type = '';	*/
		}
		console.log("new uuid: " + selected_obj.uuid);
	}
	else if(buttonSelected == 1 && selected_obj.uuid != -1 && selected_obj.type == 'unit') {
		console.log("clicked uuid: " + selected_obj.uuid);
		var fields = {};
		fields.selected = selected_obj.uuid;
		fields.target = this.uuid;
		fields.action = 'moveto';
		ws.send(JSON.stringify(fields));
	}
}

var Castle = function() {
	this.sprite = new Sprite(86, 41);
	this.sprite.image = core.assets['assets/castle.png'];
	this.sprite.type = "castle";
	this.sprite.uuid = 0;
	this.sprite.health = 0;
	this.sprite.upgrade = 0;
	this.sprite.selected = false;
	core.rootScene.addChild(this.sprite);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, castleClick);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, uiClick);
}

var unitClick = function(event) {
	if(buttonSelected == 0) {
		if(!this.selected)
		{
			this.selected = true;
			selected_obj = this;
			/*selected_uuid = this.uuid;
			selected_type = 'unit';*/
		}
		else if(this.selected)
		{
			this.selected = false;
			selected_obj = {};
			/*selected_uuid = -1;
			selected_type = '';	*/
		}
		console.log("new uuid: " + selected_obj.uuid);
	}
	else if(buttonSelected == 1 && selected_obj.uuid != -1 && selected_obj.type == 'unit') {
		console.log("clicked uuid: " + selected_obj.uuid);
		var fields = {};
		fields.selected = selected_obj.uuid;
		fields.target = this.uuid;
		fields.action = 'moveto';
		ws.send(JSON.stringify(fields));
	}	
}

var Unit = function(subtype) {
	this.sprite = new Sprite(50,37);
	this.sprite.image = core.assets['assets/' + subtype + '.png'];
	this.sprite.uuid = 0;
	this.sprite.xp = 0;
	this.sprite.veterancy = 0;
	this.sprite.health = 0;
	this.sprite.upgrade = 0;
	this.sprite.attack = 0;
	this.sprite.defense = 0;
	this.sprite.speed = 0;
	this.sprite.destX = 0;
	this.sprite.destY = 0;
	this.sprite.selected = false;
	this.sprite.subtype = subtype;
	core.rootScene.addChild(this.sprite);
	this.sprite.type = "unit";
	this.sprite.addEventListener(enchant.Event.TOUCH_START, unitClick);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, uiClick);
}

var battleClick = function(event) {
	//console.log(this);
	//ws.send(this);
	this.viewing = !this.viewing;
}

var Battle = function() {
	this.type = "battle";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.viewing = false;
	this.players = [];
	this.units = [];
	this.action = "";
	this.selected;
	
	//scene.addChild(this);
	this.addEventListener(enchant.Event.TOUCH_START, battleClick);
}

var siegeClick = function(event) {
	//console.log(this);
	//ws.send(this);
}

var Siege = function() {
	this.type = "siege";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.viewing = false;
	this.castle = -1; 	//uuid
	this.units = [];
	this.action = "";
	this.selected;
	
	//scene.addChild(this);
	this.addEventListener(enchant.Event.TOUCH_START, siegeLClick);
}

var Instance = function() {
	this.type = "instance";
	this.uuid = 0;
	this.name = "";
	this.gold = 0;
	this.alliance = -1;	//uuid
	this.war = -1;		//uuid
	this.selected = 0;
}

var castleFromData = function(castle, data) {
	castle.sprite.uuid = data.uuid;
	castle.sprite.health = data.health;
	castle.sprite.upgrade = data.upgrade;
	castle.sprite.owner = data.owner;
	castle.sprite.moveTo(data.x,data.y);
	return castle;
}

var unitFromData = function(unit, data) {	
	unit.sprite.uuid = data.uuid;
	unit.sprite.health = data.health;
	unit.sprite.upgrade = data.upgrade;
	unit.sprite.veterancy = data.veterancy;
	unit.sprite.owner = data.owner;
	unit.sprite.attack = data.attack;
	unit.sprite.defense = data.defense;
	unit.sprite.speed = data.speed;
	unit.sprite.dest = data.dest;
	unit.sprite.moveTo(data.x,data.y);
	return unit;
}

var upgradeClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'upgrade';
	request.type = selected_obj.type;
	request.uuid = selected_obj.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyInfantryClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'infantry';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyCavalryClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'cavalry';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyArmorClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'cannon';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

// Possible general type
/*var buyRegimentClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = selected_obj.subtype;
	request.type = selected_obj.type;
	request.uuid = selected_obj.uuid;
	ws.send(JSON.stringify(request));
}*/

var reinforceClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'reinforce';
	request.type = selected_obj.type;
	request.uuid = selected_obj.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var uiClick = function(event) {
	console.log('whichClick ' + this.type);
	
	/*** USED FOR CASTLE IF STATEMENT ***/
	var reinforceCastle = new Sprite(200, 69);
 	reinforceCastle.image = core.assets['assets/reinforceCastle.png'];
 	reinforceCastle.x = core.width-coreUISize;
	reinforceCastle.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
	
	var buyInfantry = new Sprite(200, 69);
 	buyInfantry.image = core.assets['assets/buyInfantry.png'];
 	buyInfantry.x = core.width-coreUISize;
	buyInfantry.y = reinforceCastle.height;
	buyInfantry.addEventListener(enchant.Event.TOUCH_START, buyInfantryClick)
	
	var buyCavalry = new Sprite(200, 69);
 	buyCavalry.image = core.assets['assets/buyCavalry.png'];
 	buyCavalry.x = core.width-coreUISize;
	buyCavalry.y = buyInfantry.y + buyCavalry.height;
	buyCavalry.addEventListener(enchant.Event.TOUCH_START, buyCavalryClick);
	
	var buyArmor = new Sprite(200, 69);
 	buyArmor.image = core.assets['assets/buyArmor.png'];
 	buyArmor.x = core.width-coreUISize;
	buyArmor.y = buyCavalry.y + buyArmor.height;
	buyArmor.addEventListener(enchant.Event.TOUCH_START, buyArmorClick);
 	/*************************************/
	
 	/*** UNIT IF STATEMENT ***/
	var reinforceRegiment = new Sprite(200, 69);
 	reinforceRegiment.image = core.assets['assets/reinforceRegiment.png'];
 	reinforceRegiment.x = core.width-coreUISize;
	reinforceRegiment.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
	
	var upgradeRegiment = new Sprite(200, 69);
 	upgradeRegiment.image = core.assets['assets/upgradeRegiment.png'];
 	upgradeRegiment.x = core.width-coreUISize;
	upgradeRegiment.y = reinforceRegiment.height;
	upgradeRegiment.addEventListener(enchant.Event.TOUCH_START, upgradeClick);
 	
	
	
	/*** FOR CASTLES AND UNITS ***/
		
 	var typeLabel = Label('');
 	var health = Label('');
 	var upgrade = Label('');
 	
 	/** CASTLE **/
 	var castleUpgrade = Label('');
 	
 	/** UNITS **/
 	var unitXP = Label('');
 	var veterancy = Label('');
 	var unitUpgrade = Label('');
 	var unitAttack = Label('');
 	var unitDefense = Label('');
 	var unitSpeed = Label('');
 	var unitSubtype = Label('');
 	
 	/***** CASTLE STATS SETUP *****/
 	typeLabel.text += this.type;
 	typeLabel.x = core.width-150;
 	typeLabel.y = core.height / 2;
 	
 	health.text += 'Health: ' + this.health;
 	health.x = typeLabel.x-49;
 	health.y = typeLabel.y+50;
 	
 	upgrade.text += 'Upgrade lvl: ' + this.upgrade;
 	upgrade.x = typeLabel.x-49;
 	upgrade.y = typeLabel.y+75;
 	
	/***** UNIT STATS SETUP *****/
	unitSubtype.text = this.type + ':' + this.subtype;
	unitSubtype.x = core.width-150;
	unitSubtype.y = typeLabel.y;
	typeLabel.y = core.height / 2;
	
	unitAttack.text = 'Attack: ' + this.attack;
	unitAttack.x = health.x;
	unitAttack.y = upgrade.y + 25;
	
	unitDefense.text = 'Defence: ' + this.defense;
	unitDefense.x = health.x + 75;
	unitDefense.y = upgrade.y + 25;
	
	unitSpeed.text = 'Speed: ' + this.speed;
	unitSpeed.x = health.x;
	unitSpeed.y = unitDefense.y + 25;
	
	veterancy.text = 'Veterancy: ' + this.veterancy;
	veterancy.x = health.x;
	veterancy.y = unitSpeed.y + 25;
	
	unitXP.text = 'XP: ' + this.xp;
	unitXP.x = health.x;
	unitXP.y = veterancy.y + 25;
	
	
 	if(this.type == 'castle'){
		core.rootScene.removeChild(reinforceRegiment);
		core.rootScene.removeChild(upgradeRegiment);
		core.rootScene.removeChild(typeLabel);
		core.rootScene.removeChild(unitSubtype);
		core.rootScene.removeChild(health);
		core.rootScene.removeChild(upgrade);
		core.rootScene.removeChild(unitAttack);
		core.rootScene.removeChild(unitDefense);
		core.rootScene.removeChild(unitSpeed);
		core.rootScene.removeChild(veterancy);
		core.rootScene.removeChild(unitXP);
	}
	else if(this.type == 'unit') {
		core.rootScene.removeChild(reinforceCastle);
		core.rootScene.removeChild(buyInfantry);
		core.rootScene.removeChild(buyCavalry);
		core.rootScene.removeChild(buyArmor);
		core.rootScene.removeChild(typeLabel);
		core.rootScene.removeChild(health);
		core.rootScene.removeChild(upgrade);
	}
		
 	if(this.type == "castle") {
		/*** BUTTONS ***/
 		core.rootScene.addChild(reinforceCastle);
		core.rootScene.addChild(buyInfantry);
		core.rootScene.addChild(buyCavalry);
		core.rootScene.addChild(buyArmor);
		
		/*** LABELS ***/
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);
 	}
	else if (this.type == "unit") {		
		/*** BUTTONS ***/
		core.rootScene.addChild(reinforceRegiment);
		core.rootScene.addChild(upgradeRegiment);
		
		/*** LABELS ***/
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(unitSubtype);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);
		core.rootScene.addChild(unitAttack);
		core.rootScene.addChild(unitDefense);
		core.rootScene.addChild(unitSpeed);
		core.rootScene.addChild(veterancy);
		core.rootScene.addChild(unitXP);
		
		
	}
 }
