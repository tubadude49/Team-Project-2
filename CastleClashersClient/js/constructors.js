enchant();

var units = [];
var castles = [];

var core;
var instance;
var selected_uuid = -1;

window.onload = function(){
	core = new Core(1280,720);
	//scene = new Scene();

	core.preload('assets/cavalry.png','assets/infantry.png', 'assets/castle.png');
	
	core.onload = function() {
		
		var background = new Sprite(core.width, core.height);
		background.backgroundColor = "#008000";
		core.rootScene.addChild(background);
		
		var castle1 = new Castle();
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
<<<<<<< HEAD
		core.rootScene.addChild(castle_mid.sprite);
		
		var cav = new Unit("cavalry");
		cav.sprite.x = castle1.width;
		cav.sprite.y = castle1.height;
		core.rootScene.addChild(cav.sprite);
=======
		
		var tmp_cavalry = new Unit('cavalry');
		tmp_cavalry.sprite._x = 100;
		tmp_cavalry.sprite._y = 100;
>>>>>>> 44e71ec908abc9ec4c54916d700199291f4ed14a
		
	}
	
	instance = new Instance();
	core.start();
}

var castleClick = function(event) {	
	console.log(this);
	ws.send(this);
	var label = Label('');

	label.text += 'Castle Clicked';
	label.x = this._x;
	label.y = this._y;
	core.rootScene.addChild(label);
	var request = {};
	request.action = 'purchase';
	request.type = 'cavalry';
	ws.send(JSON.stringify(request));
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
	core.rootScene.addChild(this.sprite);
	this.sprite.addEventListener(enchant.Event.TOUCH_START, castleClick);
}

var unitClick = function(event) {
	console.log('left: ' + this.obj.type + ' #' + this.obj.uuid);
	var fields = new Object();
	
	if(selected_uuid == -1)
	{
		this.obj.selected = true;
		selected_uuid = this.obj.uuid;
		
	}
	else if(this.obj.selected)
	{
		this.obj.selected = false;
		selected_uuid = this.obj.uuid;
		
	}
	//else
	{
		fields.selected = selected_uuid;
		fields.target = this.obj.uuid;
		fields.action = 'moveto';
	}
	var response = JSON.stringify(fields);
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
	this.selected = false;
	core.rootScene.addChild(this.sprite);
	//scene.addChild(this.sprite);
	this.sprite.obj = this;
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
