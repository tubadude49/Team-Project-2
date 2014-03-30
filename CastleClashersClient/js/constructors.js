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
var goldImage;
var goldAmount ;
var buttonSelected = 0;

// FOR CASTLES AND UNITS 
 
var reinforceCastle = new Sprite(200, 69);
var buyInfantry = new Sprite(200, 69);
var buyCavalry = new Sprite(200, 69);
var buyArmor = new Sprite(200, 69);
var reinforceRegiment = new Sprite(200, 69);
var upgradeRegiment = new Sprite(200, 69);

var typeLabel = Label('');
var health = Label('');
var upgrade = Label('');
 	
//  CASTLE 
var castleUpgrade = Label('');
 	
//  UNITS 
var unitXP = Label('');
var veterancy = Label('');
var unitUpgrade = Label('');
var unitAttack = Label('');
var unitDefense = Label('');
var unitSpeed = Label('');
var unitSubtype = Label('');

var Castle = function(x, y) {
	this.sprite = new Sprite(86, 41);
	this.sprite.moveTo(x, y);
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

var Unit = function(subtype, x, y) {
	if(subtype == "cannon")
		this.sprite = new Sprite(72,24);
	else
		this.sprite = new Sprite(50,37);
	this.sprite.moveTo(x, y);
	this.sprite.image = core.assets['assets/' + subtype + '.png'];
	this.sprite.uuid = 0;
	this.sprite.owner = 0;
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

var updateGold = function(instance) {
	
	if (goldAmount != null) {
		goldAmount.text = instance.gold;
	}
	
	if(instance.gold < 25) { 
		goldImage.frame = 4;
	} else if (instance.gold < 50) {
		goldImage.frame = 5;
	} else if (instance.gold < 100) {
		goldImage.frame = 6;
	} else if (instance.gold < 200) {
		goldImage.frame = 7;
	} else {
		goldImage.frame = 8
	}
	
}

var castleFromData = function(castle, data) {
	castle.sprite.uuid = data.uuid;
	castle.sprite.health = data.health;
	castle.sprite.upgrade = data.upgrade;
	castle.sprite.owner = data.owner;
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

var updateCastle = function(c_sprite) {
	
	if (c_sprite.upgrade == 0) {
		c_sprite.image = core.assets['assets/castle.png'];
	} else if (c_sprite.upgrade == 1) {
		c_sprite.image = core.assets['assets/castle_bronze.png'];
	} else if (c_sprite.upgrade == 2) {
		c_sprite.image = core.assets['assets/castle_silver.png'];
	} else {
		c_sprite.image = core.assets['assets/castle_gold.png'];
	}	

}
