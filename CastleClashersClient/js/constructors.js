enchant();

var core;
var selected_uuid = -1;

window.onload = function(){
	core = new Core(1280,720);
	//scene = new Scene();

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/castle.png');
	core.preload('assets/attack.png', 'assets/defend.png', 'assets/siege.png');
	
	core.onload = function() {
		
		var background = new Sprite(core.width, core.height);
		background.backgroundColor = "#008000";
		core.rootScene.addChild(background);
		
		var castle1 = new Castle();
		castle1.sprite.x = 0;
		castle1.sprite.y = 0;
		core.rootScene.addChild(castle1.sprite);
		
		var castle2 = new Castle();
		castle2.sprite.x = background.width - castle2.sprite.width;
		castle2.sprite.y = 0;
		core.rootScene.addChild(castle2.sprite);
		
		var castle3 = new Castle();
		castle3.sprite.x = 0;
		castle3.sprite.y = background.height - castle3.sprite.height;
		core.rootScene.addChild(castle3.sprite);
		
		var castle4 = new Castle();
		castle4.sprite.x = background.width - castle4.sprite.width;
		castle4.sprite.y = background.height - castle4.sprite.height;
		core.rootScene.addChild(castle4.sprite);
		
		var castle_mid = new Castle();
		castle_mid.sprite.x = (background.width - castle_mid.sprite.width) / 2;
		castle_mid.sprite.y = (background.height - castle_mid.sprite.height) / 2;
		core.rootScene.addChild(castle_mid.sprite);
		
		
		
	}
	
	core.start();
}

var castleLClick = function(event) {	
	console.log(this);
	//console.log(uuid);
	ws.send(this);
	var attackOption = new Sprite(136,47);
		attackOption.image = core.assets['assets/attack.png'];
	
	/*label.text += core.width;
	label.x = this._x;
	label.y = this._y;
	core.rootScene.addChild(label);*/
	
	if(this._x == 0 && this._y==0){ 
		attackOption.x = this._x;
		attackOption.y = this._y + this.height;
		core.rootScene.addChild(attackOption);
	}
	else if(this._x == core.width-this.width && this._y == 0){
		attackOption.x = core.width - attackOption.width;
		attackOption.y = this._y + this.height;
		core.rootScene.addChild(attackOption);
	}
	else if(this._x == 0 && this._y==core.height-this.height) {
		attackOption.x = 0;
		attackOption.y = this._y - 2 * attackOption.height;
		core.rootScene.addChild(attackOption);
	}
	else if(this._x == core.width-this.width && this._y==core.height-this.height) {
		attackOption.x = core.width-attackOption.width;
		attackOption.y = this._y - 2 * this.height;
		core.rootScene.addChild(attackOption);
	}
	else if(this._x == ((core.width - this.width) / 2) && this._y == ((core.width - this.width) / 2)) {
		attackOption.x = this._x;
		attackOption.y = this._y + this.height;
		core.rootScene.addChild(attackOption);
	}
	
	
}

var Castle = function() {
	this.type = "castle";
	this.uuid = 0;
	this.x = 0;
	this.y = 0;
	this.health = 0;
	this.upgrade = 0;
	this.sprite = new Sprite(86, 41);
	this.sprite.image = core.assets['assets/castle.png'];
	this.action = "";
	this.selected;
	//scene.addChild(this.sprite);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, castleLClick);
}

var unitClick = function(event) {
	console.log('left: ' + type + ' #' + uuid);
	if(selected_uuid == -1)
	{
		selected = true;
		selected_uuid = uuid;
	}
	else if(selected)
	{
		selected = false;
		selected_uuid = uuid;
	}
	//else
	//{
		var fields = new Object();
		fields.selected = selected_uuid;
		fields.target = uuid;
		fields.action = 'moveto';
		var response = JSON.stringify(fields);
	//}
	console.log(response);
	//ws.send(response);
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
	this.selected = false;
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
