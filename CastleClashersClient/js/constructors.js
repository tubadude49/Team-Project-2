enchant();

var units = [];
var castles = [];

//Basic map variables
var core;
var instance;
var coreUISize = 200;
var bottomUISize = 50;
var selected_objs = [];
var selectButton; //deprecated
var attackButton; //deprecated
var goldImage;
var goldAmount ;
var buttonSelected = 0;

var background;
var backgroundUI;

// FOR CASTLES AND UNITS 
 
var healCastle = new Label();
var healBackground = new Sprite(140, 52);
healBackground.tl.setTimeBased();
var healGold = new Sprite(32, 32);
var healCost = new Label();
var HealGroup = new Group();
var upgradeCastle = new Label();
var upgradeBackground = new Sprite(140, 52);
upgradeBackground.tl.setTimeBased();
var upgradeGold = new Sprite(32, 32);
var upgradeCost = new Label();
var UpgradeGroup = new Group();
var buyInfantry = new Label();
var infantryBackground = new Sprite(140, 52);
infantryBackground.tl.setTimeBased();
var infantryGold = new Sprite(32, 32);
var infantryCost = new Label();
var InfantryGroup = new Group();
var buyCavalry = new Label();
var cavalryBackground = new Sprite(140, 52);
cavalryBackground.tl.setTimeBased();
var cavalryGold = new Sprite(32, 32);
var cavalryCost = new Label();
var CavalryGroup = new Group();
var buyArmor = new Label();
var cannonBackground = new Sprite(140, 52);
cannonBackground.tl.setTimeBased();
var cannonGold = new Sprite(32, 32);
var cannonCost = new Label();
var CannonGroup = new Group();
var healRegiment = new Label();
var upgradeRegiment = new Label();
var allianceCastleBreak = new Label();
var allianceCastleOffer = new Label();

// Sounds
var upgradeSound = new Audio('assets/upgrade.wav');
var battleSound = new Audio('assets/battle.wav');
var castleAttackSound = new Audio('assets/castleattack.wav');
var goldSound = new Audio('assets/gold.wav');
var fanfareSound = new Audio('assets/fanfare.wav');
var marchingSound = new Audio('assets/marching.wav');
var horseSound = new Audio('assets/horse.wav');
var cannonSound = new Audio('assets/cart.wav');
var helloSound = new Audio('assets/hello.wav');
var nopeSound = new Audio('assets/nope.wav');

// for selected unit UI
var castleIcon = new Sprite(83, 41);
var infantryIcon = new Sprite(68, 42);
var cavalryIcon = new Sprite(50, 37);
var armorIcon = new Sprite(72, 24);
var selectedCastles = new Label();
var selectedInfantry = new Label();
var selectedCavalry = new Label();
var selectedArmor = new Label();

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

var message = Label('');

//Castle attributes
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

//Different unit attributes
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
	this.sprite.on(enchant.Event.TOUCH_START, startClick);
	this.sprite.on(enchant.Event.TOUCH_END, endClick);
	
	this.hsprite = new Sprite(48,10);
	this.hsprite.moveTo(x,y);
	this.hsprite.image = core.assets['assets/bar.png'];
	this.hsprite.tl.setTimeBased();
}

// a battle is represented by a sword icon
var Battle = function() {
	this.sprite = new Sprite(21,21);
	this.sprite.image = core.assets['assets/swords.png'];
	this.sprite.type = "battle";
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.tl.setTimeBased();
}

// a siege is represented by a fireball icon
var Siege = function() {
	this.sprite = new Sprite(43,39);
	this.sprite.image = core.assets['assets/fireball.png'];
	this.sprite.type = "siege";
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.tl.setTimeBased();
}

// equivalent to the Server's Player class
var Instance = function() {
	this.type = "instance";
	this.uuid = 0;
	this.name = "";
	this.gold = 0;
	this.alliance = -1;	//uuid
	this.war = -1;		//uuid
	this.selected = 0;
}

// function that updates the gold image and label
// called from ws.js when a message containing an instance is received
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

// displays the battle icon to the client
// called from ws.js when a battle is received
var drawBattle = function(data) {
	battleSound.play();
	/*battleSound.loop = true;
	setTimeout(function() { battleSound.loop = false; }, 1750);*/
	var batt = new Battle();
	batt.sprite.x = data.x;
	batt.sprite.y = data.y;	
	core.rootScene.addChild(batt.sprite);
	batt.sprite.tl.delay(1250).then(function() {
		core.rootScene.removeChild(batt.sprite);
	});		
}

// displays the siege icon to the client; gives an indication the users that a siege is happening
var drawSiege = function(data) {
	castleAttackSound.play();
	var siege_engine = new Siege();
	siege_engine.sprite.x = data.x;
	siege_engine.sprite.y = data.y;	
	core.rootScene.addChild(siege_engine.sprite);
	siege_engine.sprite.tl.delay(1250).then(function() {
		core.rootScene.removeChild(siege_engine.sprite);
	});		
}

// "error messages" display when a user tries to do something they cannot do
// Ex. Trying to upgrade a unit with maximum upgrade level
var drawMessage = function(data, color)
{
	message.text = data;
	message.color = color;//Red
	var fontsize = 48;
	message.width = (fontsize * message.text.length);
	while(message.width > core.width - coreUISize && fontsize > 24)
	{
		fontsize = fontsize - 4;
		message.width = (fontsize * message.text.length);
	}

	message.font = "bold " + fontsize + "px ken-vector-future-thin";
	message.width = (fontsize * message.text.length);
	if(fontsize > 28)
		message.x = (core.width - coreUISize - message.width) * 2;
	else
		message.x = 0;
	message.y = core.height/2;

	console.log(message);
	core.rootScene.addChild(message);
	message.tl.setTimeBased();
	message.tl.delay(2500).then(function() {	
		core.rootScene.removeChild(message);
	});
	
}

// creates a castle object from data received from the server
var castleFromData = function(castle, data) {
	castle.sprite.uuid = data.uuid;
	castle.sprite.health = data.health;
	castle.sprite.upgrade = data.upgrade;
	castle.sprite.owner = data.owner;
	castle.sprite.fsprite.frame = castle.sprite.owner;
	if(castle.sprite.owner < 0)
	{
		castle.sprite.fsprite.visible = false;
	}
	else
	{
		castle.sprite.fsprite.visible = true;
	}
	return castle;
}

// creates a unit from data received from the server
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

// updates the castle image based on upgrade level as well as flag color to indicate ownership
var updateCastle = function(c_sprite) {
	c_sprite.fsprite.frame = c_sprite.owner;
	if(c_sprite.owner < 0)
	{
		c_sprite.fsprite.visible = false;
	}
	else
	{
		c_sprite.fsprite.visible = true;
	}
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

//When game is finished
var clearGame = function() {
	console.log('clear game');
	clearUI();
	core.rootScene.removeChild(background);
	core.rootScene.removeChild(backgroundUI);
	core.rootScene.removeChild(goldImage);
	core.rootScene.removeChild(goldAmount);
	
	for(i=0;i<units.length;i++) {
		core.rootScene.removeChild(units[i].sprite);
		core.rootScene.removeChild(units[i].hsprite);
	}
	for(i=0;i<castles.length;i++) {
		core.rootScene.removeChild(castles[i].sprite);
		core.rootScene.removeChild(castles[i].sprite.fsprite);
	}
	
	core.rootScene.removeChild(castleIcon);
	core.rootScene.removeChild(selectedCastles);
	core.rootScene.removeChild(infantryIcon);
	core.rootScene.removeChild(selectedInfantry);
	core.rootScene.removeChild(cavalryIcon);
	core.rootScene.removeChild(selectedCavalry);
	core.rootScene.removeChild(armorIcon);
	core.rootScene.removeChild(selectedArmor);	
	
	core.rootScene.removeChild(nameTextbox);
	core.rootScene.removeChild(nameLabel);
	core.rootScene.removeChild(joinButton);
	core.rootScene.removeChild(leaveButton);
	
	core.rootScene.addChild(menubackground);
	core.rootScene.addChild(startButton);
	core.rootScene.addChild(tutorButton);
	core.rootScene.addChild(castleClashersLabel);
}
