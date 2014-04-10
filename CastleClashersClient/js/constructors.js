enchant();

var units = [];
var castles = [];

var core;
var instance;
var coreUISize = 200;
var bottomUISize = 50;
var selected_objs = [];
var selectButton;
var attackButton;
var goldImage;
var goldAmount ;
var buttonSelected = 0;

// FOR CASTLES AND UNITS 
 
var healCastle = new Label(); //new Sprite(200, 69);
var buyInfantry = new Label(); //new Sprite(200, 69);
var buyCavalry = new Label(); //new Sprite(200, 69);
var buyArmor = new Label(); //new Sprite(200, 69);
var healRegiment = new Label(); //new Sprite(200, 69);
var upgradeRegiment = new Label(); //new Sprite(200, 69);
var upgradeCastle = new Label(); //new Sprite(200,69);
//var warCastle = new Sprite(200, 69);
//var allianceCastle = new Sprite(200, 69);

var healthImg = new Sprite(32,32);
var health = Label('');
var upgradeImg = new Sprite(32,32);
var upgrade = Label('');
 	
//  CASTLE 
var castleUpgrade = Label('');
 	
//  UNITS 
var unitUpgrade = Label('');
var unitAttackImg = new Sprite(32,32);
var unitAttack = Label('');
var unitDefenseImg = new Sprite(32,32);
var unitDefense = Label('');
var unitSpeedImg = new Sprite(32,32);
var unitSpeed = Label('');
var veterancyImg = new Sprite(32,32);
var veterancy = Label('');
var unitXPImg = new Sprite(32,32);
var unitXP = Label('');

var Castle = function(x, y) {
	this.sprite = new Sprite(86, 41);
	this.sprite.moveTo(x, y);
	this.sprite.image = core.assets['assets/castle.png'];
	this.sprite.type = "castle";
	this.sprite.uuid = 0;
	this.sprite.health = 0;
	this.sprite.upgrade = 0;
	this.sprite.selected = false;
	this.sprite.owner = -1;
	
	this.sprite.fsprite = new Sprite(16,16);
	this.sprite.fsprite.moveTo(x, y);
	this.sprite.fsprite.image = core.assets['assets/flags.png'];
	this.sprite.fsprite.type = "flag";
	
	
	core.rootScene.addChild(this.sprite.fsprite);
	core.rootScene.addChild(this.sprite);
	/*this.sprite.addEventListener(enchant.Event.TOUCH_START, castleClick);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, uiClick);
	*/
	this.sprite.on(enchant.Event.TOUCH_START, startClick);
	this.sprite.on(enchant.Event.TOUCH_END, endClick);
}

var Unit = function(subtype, x, y) {
	if(subtype == "cannon")
		this.sprite = new Sprite(72,24);
	else if(subtype == "infantry")
		this.sprite = new Sprite(68,42);
	else
		this.sprite = new Sprite(50,37);
	this.sprite.moveTo(x, y);
	this.sprite.image = core.assets['assets/' + subtype + '.png'];
	this.sprite.uuid = 0;
	this.sprite.owner = 0;
	this.sprite.xp = 0;
	this.sprite.veterancy = 0;
	this.sprite.maxHealth = 0;
	this.sprite.health = 0;
	this.sprite.upgrade = 0;
	this.sprite.attack = 0;
	this.sprite.defense = 0;
	this.sprite.speed = 0;
	this.sprite.destX = 0;
	this.sprite.destY = 0;
	this.sprite.selected = false;
	this.sprite.subtype = subtype;
	this.sprite.type = "unit";
	this.sprite.built = false;
	this.sprite.tl.setTimeBased();
	/*this.sprite.addEventListener(enchant.Event.TOUCH_START, unitClick);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, uiClick);
	*/
	this.sprite.on(enchant.Event.TOUCH_START, startClick);
	this.sprite.on(enchant.Event.TOUCH_END, endClick);
	
	this.hsprite = new Sprite(48,10);
	this.hsprite.moveTo(x,y);
	this.hsprite.image = core.assets['assets/bar.png'];
	this.hsprite.tl.setTimeBased();
}

var Battle = function() {
	this.sprite = new Sprite(21,21);
	this.sprite.image = core.assets['assets/swords.png'];
	this.sprite.type = "battle";
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.tl.setTimeBased();
}

var Siege = function() {
	this.sprite = new Sprite(43,39);
	this.sprite.image = core.assets['assets/fireball.png'];
	this.sprite.type = "siege";
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.tl.setTimeBased();
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
	
	if(goldImage != null) {
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
}

var drawBattle = function(data) {
	var batt = new Battle();
	batt.sprite.x = data.x;
	batt.sprite.y = data.y;	
	core.rootScene.addChild(batt.sprite);
	batt.sprite.tl.delay(1250).then(function() {
		core.rootScene.removeChild(batt.sprite);
	});		
}

var drawSiege = function(data) {
	var siege_engine = new Siege();
	siege_engine.sprite.x = data.x;
	siege_engine.sprite.y = data.y;	
	core.rootScene.addChild(siege_engine.sprite);
	siege_engine.sprite.tl.delay(1250).then(function() {
		core.rootScene.removeChild(siege_engine.sprite);
	});		
}

var castleFromData = function(castle, data) {
	castle.sprite.uuid = data.uuid;
	castle.sprite.health = data.health;
	castle.sprite.upgrade = data.upgrade;
	castle.sprite.owner = data.owner;
	castle.sprite.fsprite.frame = castle.sprite.owner + 1;
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
	unit.sprite.tl.moveTo(data.x,data.y, 300);
	unit.hsprite.tl.moveTo(data.x,data.y - 10,300);
	unit.sprite.frame = unit.sprite.owner;
	if(unit.sprite.health > unit.sprite.maxHealth)//Upgrade or level up occurred
	{
		unit.sprite.maxHealth = unit.sprite.health;
	}
	unit.hsprite.frame = 22 - (Math.ceil(22 * (unit.sprite.health/unit.sprite.maxHealth)));
	
	//console.log(unit.sprite.health + "/" + unit.sprite.maxHealth + "-" + unit.hsprite.frame);
	if(data.built && !unit.sprite.built) {
		core.rootScene.addChild(unit.sprite);
		core.rootScene.addChild(unit.hsprite);
		unit.sprite.built = true;
		unit.sprite.maxHealth = unit.sprite.health;
	}

	return unit;
}

var updateCastle = function(c_sprite) {
	c_sprite.fsprite.frame = c_sprite.owner + 1;
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
