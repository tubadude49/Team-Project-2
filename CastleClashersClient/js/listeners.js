var backgroundClick = function(event) {
	
		
		if (selected_obj != null) {
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
			selected_obj = null;
			
			core.rootScene.removeChild(reinforceRegiment);
			core.rootScene.removeChild(upgradeRegiment);
			core.rootScene.removeChild(typeLabel);
			core.rootScene.removeChild(unitSubtype);
			core.rootScene.removeChild(health);
			core.rootScene.removeChild(upgrade);
			core.rootScene.removeChild(unitAttack);
			core.rootScene.removeChild(unitDefense);
			core.rootScene.removeChild(unitSpeed);
			core.rootScene.removeChild(veterancy);
			core.rootScene.removeChild(unitXP);
			
			core.rootScene.removeChild(reinforceCastle);
			core.rootScene.removeChild(buyInfantry);
			core.rootScene.removeChild(buyCavalry);
			core.rootScene.removeChild(buyArmor);
			core.rootScene.removeChild(typeLabel);
			core.rootScene.removeChild(health);
			core.rootScene.removeChild(upgrade);
		}

}

/*var selectButtonClick = function(event) {
	this.image = core.assets['assets/button_select_selected.png'];
	attackButton.image = core.assets['assets/button_attack.png'];
	buttonSelected = 0;
}

var attackButtonClick = function(event) {
	this.image = core.assets['assets/button_attack_selected.png'];
	selectButton.image = core.assets['assets/button_select.png'];
	buttonSelected = 1;
}*/

var castleClick = function(event) {
		
	if(this.owner == instance.uuid || selected_obj == null) {
		if(selected_obj != null)
		{
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
		}	
		
		this.selected = true;
		selected_obj = this;
		this.backgroundColor = "#CCCC00";
		
	}
	else if(selected_obj != null && selected_obj.type == 'unit') {
		
		var fields = {};
		fields.selected = selected_obj.uuid;
		fields.target = this.uuid;
		fields.action = 'moveto';
		selected_obj.backgroundColor = null;
		selected_obj.selected = false;
		ws.send(JSON.stringify(fields));
	}
}

var unitClick = function(event) {
		
	if(this.owner == instance.uuid) {
		if(selected_obj != null)
		{
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
		}
		
		this.selected = true;
		selected_obj = this;
		this.backgroundColor = "#CCCC00";
		
	}
	else if(selected_obj != null && selected_obj.type == 'unit' && this.owner != instance.uuid) {
		
		/*selectButton.image = core.assets['assets/button_select_selected.png'];
		attackButton.image = core.assets['assets/button_attack.png'];
		buttonSelected = 0;*/
		
		var fields = {};
		fields.selected = selected_obj.uuid;
		fields.target = this.uuid;
		fields.action = 'moveto';
		selected_obj.backgroundColor = null;
		selected_obj.selected = false;
		ws.send(JSON.stringify(fields));
	}	
}

var battleClick = function(event) {
	//console.log(this);
	//ws.send(this);
	this.viewing = !this.viewing;
}

var upgradeClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'upgrade';
	request.type = selected_obj.type;
	request.uuid = selected_obj.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyInfantryClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'infantry';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyCavalryClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'cavalry';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var buyArmorClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'new';
	request.type = 'cannon';
	request.uuid = instance.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var reinforceClick = function(event) {
	var request = {};
	request.action = 'purchase';
	request.purchase = 'reinforce';
	request.type = selected_obj.type;
	request.uuid = selected_obj.uuid;
	request.x = selected_obj._x;
	request.y = selected_obj._y;
	ws.send(JSON.stringify(request));
}

var uiClick = function(event) {
		
	core.rootScene.removeChild(reinforceRegiment);
	core.rootScene.removeChild(upgradeRegiment);
	core.rootScene.removeChild(typeLabel);
	core.rootScene.removeChild(unitSubtype);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgrade);
	core.rootScene.removeChild(unitAttack);
	core.rootScene.removeChild(unitDefense);
	core.rootScene.removeChild(unitSpeed);
	core.rootScene.removeChild(veterancy);
	core.rootScene.removeChild(unitXP);
	
	core.rootScene.removeChild(reinforceCastle);
	core.rootScene.removeChild(buyInfantry);
	core.rootScene.removeChild(buyCavalry);
	core.rootScene.removeChild(buyArmor);
	core.rootScene.removeChild(typeLabel);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgrade);
	
	//  USED FOR CASTLE IF STATEMENT 
	
 	reinforceCastle.image = core.assets['assets/reinforceCastle.png'];
 	reinforceCastle.x = core.width-coreUISize;
	reinforceCastle.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
		
 	buyInfantry.image = core.assets['assets/buyInfantry.png'];
 	buyInfantry.x = core.width-coreUISize;
	buyInfantry.y = reinforceCastle.height;
	buyInfantry.addEventListener(enchant.Event.TOUCH_START, buyInfantryClick)
	
	
 	buyCavalry.image = core.assets['assets/buyCavalry.png'];
 	buyCavalry.x = core.width-coreUISize;
	buyCavalry.y = buyInfantry.y + buyCavalry.height;
	buyCavalry.addEventListener(enchant.Event.TOUCH_START, buyCavalryClick);
	
	
 	buyArmor.image = core.assets['assets/buyArmor.png'];
 	buyArmor.x = core.width-coreUISize;
	buyArmor.y = buyCavalry.y + buyArmor.height;
	buyArmor.addEventListener(enchant.Event.TOUCH_START, buyArmorClick);
 	//--------------------------------------
 	
	//    UNIT IF STATEMENT 
	
 	reinforceRegiment.image = core.assets['assets/reinforceRegiment.png'];
 	reinforceRegiment.x = core.width-coreUISize;
	reinforceRegiment.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
	
	
 	upgradeRegiment.image = core.assets['assets/upgradeRegiment.png'];
 	upgradeRegiment.x = core.width-coreUISize;
	upgradeRegiment.y = reinforceRegiment.height;
	upgradeRegiment.addEventListener(enchant.Event.TOUCH_START, upgradeClick);
 	
 	
 	//    CASTLE STATS SETUP 
 	typeLabel.text = this.type;
 	typeLabel.x = core.width-150;
 	typeLabel.y = core.height / 2;
	 	
 	health.text = 'Health: ' + this.health;
 	health.x = typeLabel.x-49;
 	health.y = typeLabel.y+50;
 	
 	upgrade.text = 'Upgrade lvl: ' + this.upgrade;
 	upgrade.x = typeLabel.x-49;
 	upgrade.y = typeLabel.y+75;
 	
	//     UNIT STATS SETUP
	unitSubtype.text = this.type + ':' + this.subtype;
	unitSubtype.x = core.width-150;
	unitSubtype.y = typeLabel.y;
	typeLabel.y = core.height / 2;
	
	unitAttack.text = 'Attack: ' + this.attack;
	unitAttack.x = health.x;
	unitAttack.y = upgrade.y + 25;
	
	unitDefense.text = 'Defence: ' + this.defense;
	unitDefense.x = health.x + 75;
	unitDefense.y = upgrade.y + 25;
	
	unitSpeed.text = 'Speed: ' + this.speed;
	unitSpeed.x = health.x;
	unitSpeed.y = unitDefense.y + 25;
	
	veterancy.text = 'Veterancy: ' + this.veterancy;
	veterancy.x = health.x;
	veterancy.y = unitSpeed.y + 25;
	
	unitXP.text = 'XP: ' + this.xp;
	unitXP.x = health.x;
	unitXP.y = veterancy.y + 25;
	
	if(this.type == "castle" && this.owner == instance.uuid) {
		//   BUTTONS 
 		core.rootScene.addChild(reinforceCastle);
		core.rootScene.addChild(buyInfantry);
		core.rootScene.addChild(buyCavalry);
		core.rootScene.addChild(buyArmor);
		
		//   LABELS
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);
 	}
	else if (this.type == "castle" && this.owner != instance.uuid){
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);	
	}
	else if (this.type == "unit" && this.owner == instance.uuid) {		
		//   BUTTONS
		core.rootScene.addChild(reinforceRegiment);
		core.rootScene.addChild(upgradeRegiment);
		
		// LABELS
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(unitSubtype);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);
		core.rootScene.addChild(unitAttack);
		core.rootScene.addChild(unitDefense);
		core.rootScene.addChild(unitSpeed);
		core.rootScene.addChild(veterancy);
		core.rootScene.addChild(unitXP);	
	}
	else if (this.type == "unit" && this.owner != instance.uuid) {
		core.rootScene.addChild(typeLabel);
		core.rootScene.addChild(unitSubtype);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgrade);
		core.rootScene.addChild(unitAttack);
		core.rootScene.addChild(unitDefense);
		core.rootScene.addChild(unitSpeed);
		core.rootScene.addChild(veterancy);
		core.rootScene.addChild(unitXP);
	}
 }