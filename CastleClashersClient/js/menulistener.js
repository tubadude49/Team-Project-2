//MAIN MENU BUTTONS
var startButton = new Label();
var tutorButton = new Label();
//LOBBY BUTTONS
var leaveButton = new Label();
var nameLabel = new Label();
var nameTextbox = new Input();


var startClick = function() {
	core.rootScene.removeChild(startButton);
	core.rootScene.removeChild(tutorButton);
		
	leaveButton.text = "Leave Lobby";
	leaveButton.x = 0;
	leaveButton.y = core.height - 100;
	core.rootScene.addChild(leaveButton);
	leaveButton.on(enchant.Event.TOUCH_START, leaveClick);
	
	core.rootScene.addChild(nameTextbox);
	//nameTextbox._input.value;
		
	leaveButton.font = "bold 32px arial,serif";
}

var leaveClick = function() {
	core.rootScene.addChild(startButton);
	core.rootScene.addChild(tutorButton);
	
	core.rootScene.removeChild(nameTextbox);	
	core.rootScene.removeChild(leaveButton);
}

var tutorClick = function() {
	console.log(" there is no tutorial :( ");
}
