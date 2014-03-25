enchant();

var core;
//var scene;

window.onload = function(){
	core = new Core(1280,720);
	//scene = new Scene();

	core.preload('assets/cavalry.png','assets/infantry.png');
	
	core.onload = function() {
		var test_cav = Unit('cavalry');
		
	}
	
	core.start();
}

var castleClick = function(event) {	
	console.log(this);
	ws.send(this);
	//Highlight this
}

var Castle = function() {
	this.type = "castle";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.health = 0;
	this.upgrade = 0;
	this.sprite = new Sprite(100,100);
	this.sprite.image = core.assets['assets/castle_gold.png'];
	this.action = "";
	this.selected;
	//scene.addChild(this.sprite);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, castleLClick);
}

var unitClick = function(event) {
	console.log('left: ' + type + ' #' + uuid);
	var response = '{ "type" : "' + type + '" , '
					+ '"uuid" : "' + uuid + '" , '
					+ '"x" : "' + x + '" , '
					+ '"y" : "' + y + '" , '
					+ '"xp" : "' + xp + '" , '
					+ '"veterancy" : "' + veterancy + '" , '
					+ '"health" : "' + health + '" , '
					+ '"upgrade" : "' + upgrade + '" , '
					+ '"attack" : "' + attack + '" , '
					+ '"defense" : "' + defense + '" , '
					+ '"speed" : "' + speed + '" , '
					+ '"destX" : "' + destX + '" , '
					+ '"destY" : "' + destY + '" , '
					+ '"subtype" : "' + subtype + '" , '
					+ '"action" : "' + action + '"}';
	console.log(response);
	ws.send(response);
	//Highlight this
}

var Unit = function(subtype) {
	this.type = "unit";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.xp = 0;
	this.veterancy = 0;
	this.health = 0;
	this.upgrade = 0;
	this.attack = 0;
	this.defense = 0;
	this.speed = 0;
	this.destX = 0;
	this.destY = 0;
	this.subtype = subtype;
	this.sprite = new Sprite(50,37);
	this.sprite.image = core.assets['assets/' + subtype + '.png'];
	this.action = "";
	this.selected;
	core.rootScene.addChild(this.sprite);
	//scene.addChild(this.sprite);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, unitClick);
}

var battleClick = function(event) {
	console.log(this);
	ws.send(this);
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
	console.log(this);
	ws.send(this);
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