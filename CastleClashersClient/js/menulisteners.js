//MAIN MENU BUTTONS
var startButton = new Label();
var tutorButton = new Label();
//LOBBY BUTTONS
var leaveButton = new Label();
var nameLabel = new Label();
var nameTextbox = new Input();
var joinButton = new Label();

var testButton = new Label();

var startButtonClick = function() {
	establishWS();

	core.rootScene.removeChild(startButton);
	core.rootScene.removeChild(tutorButton);
	
	if(!nameTextbox.scaled) {
		nameTextbox.scale(1/core._scale);
		nameTextbox.scaled = true;
	}
	nameTextbox.moveTo(core.width/2 - 150, core.height/2 - 25);
	core.rootScene.addChild(nameTextbox);
	
	nameLabel.text = "Enter your name:";
	nameLabel.width = 500;
	nameLabel.moveTo(core.width/2 - 150, core.height/2 - 75);
	core.rootScene.addChild(nameLabel);
	
	joinButton.text = "Join Lobby";
	joinButton.moveTo(core.width/2 - 120, core.height/2 + 50);
	core.rootScene.addChild(joinButton);
	joinButton.on(enchant.Event.TOUCH_START, joinClick);
	
	joinButton.font = "bold 32px ken-vector-future-thin";
	nameLabel.font = "bold 32px ken-vector-future-thin";
}

var joinClick = function() {
	instance.name = nameTextbox._input.value;
	
	leaveButton.text = "Leave Lobby";
	leaveButton.x = 0;
	leaveButton.y = core.height - 100;
	leaveButton.on(enchant.Event.TOUCH_START, leaveClick);	
	core.rootScene.addChild(leaveButton);

	core.rootScene.removeChild(nameTextbox);
	core.rootScene.removeChild(nameLabel);
	core.rootScene.removeChild(joinButton);
	
	leaveButton.font = "bold 32px ken-vector-future-thin";
	
	var request = {};
	request.action = "join";
	request.name = instance.name;
	ws.send(JSON.stringify(request));
}

var leaveClick = function(event) {
	//console.log(core.rootScene.hit(event.x, event.y));

	core.rootScene.addChild(startButton);
	core.rootScene.addChild(tutorButton);
	
	core.rootScene.removeChild(leaveButton);	
}

var initGameboard = function() {
	core.rootScene.removeChild(startButton);
	core.rootScene.removeChild(tutorButton);
	core.rootScene.removeChild(nameTextbox);
	core.rootScene.removeChild(nameLabel);
	core.rootScene.removeChild(joinButton);
	core.rootScene.removeChild(leaveButton);

	background = new Sprite(core.width-coreUISize, core.height - bottomUISize);
	background.image = core.assets['assets/grass1.png'];
	background.moveTo(0, 50);
	//background.addEventListener(enchant.Event.TOUCH_START, backgroundClick);
	background.on(enchant.Event.TOUCH_START, startClick);
	background.on(enchant.Event.TOUCH_END, endClick);
	core.rootScene.addChild(background);
	
	backgroundUI = new Sprite(coreUISize, core.height);
	backgroundUI.image = core.assets['assets/cobble.png'];
	backgroundUI.x = core.width - coreUISize;
	core.rootScene.addChild(backgroundUI);
	
	goldImage = new Sprite(32, 32);
	goldImage.image = core.assets['assets/gold.png'];
	goldImage.frame = 4;
	goldImage.x = core.width / 2;
	goldImage.y = 9;
	core.rootScene.addChild(goldImage);
	
	goldAmount = new Label('0');
	goldAmount.x = goldImage.x + goldImage.width;
	goldAmount.y = goldImage.y;
	core.rootScene.addChild(goldAmount);
	
	health.font = "bold 26px ken-vector-future-thin";
	upgrade.font = "bold 26px ken-vector-future-thin";
	goldAmount.font = "bold 26px ken-vector-future-thin";
	castleUpgrade.font = "bold 26px ken-vector-future-thin";
	unitXP.font = "bold 26px ken-vector-future-thin";
	veterancy.font = "bold 26px ken-vector-future-thin";
	unitUpgrade.font = "bold 26px ken-vector-future-thin";
	unitAttack.font = "bold 26px ken-vector-future-thin";
	unitDefense.font = "bold 26px ken-vector-future-thin";
	unitSpeed.font = "bold 26px ken-vector-future-thin";
}
