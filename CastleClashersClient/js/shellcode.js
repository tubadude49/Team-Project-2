enchant();

var host = "compute.cs.tamu.edu";
var ws = new WebSocket(host);

ws.onopen = function(event) {
	console.log(event);
}
ws.onmessage = function(event) {
	var r = JSON.parse(event);
	console.log(event);
}
ws.onerror = function(event) {
	console.log(event);
}
ws.onclose = function(event) {
	console.log(event);
}

var core = new Core(1280,720);
var scene = new Scene();

core.preload("","","");

var castleLClick(event) {	
	console.log(this);
	ws.send(this);
}

var castleRClick(event) {
	
}

var Castle = function() {
	this.type = "castle";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.health = 0;
	this.upgrade = 0;
	this.sprite = new Sprite(100,100);
	this.sprite.image = core.assets[""];
	
	scene.addChild(this);
	scene.addEventListener("LEFT_BUTTON_DOWN", castleLClick};
	scene.addEventListener("RIGHT_BUTTON_DOWN", castleRClick};
}

var unitLClick(event) {
	
}

var unitRClick(event) {
	
}

var Unit = function() {
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
	this.subtype = "null";
	this.sprite = new Sprite(100,100);
	this.sprite.image = core.assets[""];
	
	scene.addChild(this);
	scene.addEventListener("LEFT_BUTTON_DOWN", unitLClick};
	scene.addEventListener("RIGHT_BUTTON_DOWN", unitRClick};
}

var battleLClick(event) {
	
}

var battleRClick(event) {
	
}

var Battle = function() {
	this.type = "battle";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.viewing = false;
	this.players = [];
	this.units = [];
	
	scene.addChild(this);
	scene.addEventListener("LEFT_BUTTON_DOWN", battleLClick};
	scene.addEventListener("RIGHT_BUTTON_DOWN", battleRClick};
}

var siegeLClick(event) {
	
}

var siegeRClick(event) {
	
}

var Siege = function() {
	this.type = "siege";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.viewing = false;
	this.castle = -1; 	//uuid
	this.units = [];
	
	scene.addChild(this);
	scene.addEventListener("LEFT_BUTTON_DOWN", siegeLClick};
	scene.addEventListener("RIGHT_BUTTON_DOWN", siegeRClick};
}

var Instance = function() {
	this.type = "instance";
	this.uuid = 0;
	this.name = "";
	this.gold = 0;
	this.alliance = -1;	//uuid
	this.war = -1;		//uuid
}
