window.onload = function() {
	enchant();
	var game = new Core(320, 320); 
	game.preload("assets/swords.png");
	game.onload = function() {
		var sword = new Sprite(21, 21);
		sword.image = game.assets["assets/swords.png"];
		game.rootScene.addChild(sword);
	};
	game.start();
};