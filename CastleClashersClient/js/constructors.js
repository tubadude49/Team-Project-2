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

var castleLClick = function(event) {	
	console.log(this);
	ws.send(this);
	//Highlight this
}

var castleRClick = function(event) {
	console.log(this);
	ws.send(this);
	//If unit selected MoveTo here
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
	this.sprite.addEventListener("LEFT_BUTTON_DOWN", castleLClick);
	this.sprite.addEventListener("RIGHT_BUTTON_DOWN", castleRClick);
}

var unitLClick = function(event) {
	console.log(this);
	ws.send(this);
	//Highlight this
}

var unitRClick = function(event) {
	console.log(this);
	ws.send(this);
	//If unit selected, move to here
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
	this.sprite.addEventListener("touchstart", unitLClick);
	this.sprite.addEventListener("RIGHT_BUTTON_DOWN", unitRClick);
}

var battleLClick = function(event) {
	console.log(this);
	ws.send(this);
	this.viewing = !this.viewing;
}

var battleRClick = function(event) {
	console.log(this);
	ws.send(this);
	//If unit selected, move to here
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
	this.addEventListener("LEFT_BUTTON_DOWN", battleLClick);
	this.addEventListener("RIGHT_BUTTON_DOWN", battleRClick);
}

var siegeLClick = function(event) {
	console.log(this);
	ws.send(this);
}

var siegeRClick = function(event) {
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
	this.addEventListener("LEFT_BUTTON_DOWN", siegeLClick);
	this.addEventListener("RIGHT_BUTTON_DOWN", siegeRClick);
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