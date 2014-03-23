window.onload = function() {
	enchant();
	var game = new Game(1, 1); game.preload('swords.png');
	game.onload = function() {
		var sword = new Sprite(21, 21);
		sword.image = game.assets['/assets/swords.png'];
		game.rootScene.addChild(sword);
	};
	game.start();
};