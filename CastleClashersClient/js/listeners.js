var handleRightClick = function(event) {
	if(clickArray.length >= 2) {		
		var selected = clickArray[clickArray.length-2];
		var target = clickArray[clickArray.length-1];
		if(selected.uuid != target.uuid) {			
			var fields = {};
			fields.selected = selected.uuid;
			fields.target = target.uuid;
			fields.action = 'moveto';
			if(selected_obj) {
				selected_obj.backgroundColor = null;
				selected_obj.selected = false;
				selected_obj = null;
			}
			ws.send(JSON.stringify(fields));
		}
		clickArray = [];
	}
	event.preventDefault();
	return false;
}

/*var offerAllianceClick = function(event) {
	var request = {};
	request.action = 'offer';
	request.target = selected_obj.owner;
	ws.send(JSON.stringify(request));
}

var declareWarClick = function(event) {
	var request = {};
	request.action = 'declare';
	request.target = selected_obj.owner;
	ws.send(JSON.stringify(request));
}

var breakAllianceClick = function(event) {
	var request = {};
	request.action = 'break';
	request.target = selected_obj.owner;
	ws.send(JSON.stringify(request));
}*/

var backgroundClick = function(event) {		
		if (selected_obj != null) {
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
			selected_obj = null;
			
			core.rootScene.removeChild(healRegiment);
			core.rootScene.removeChild(upgradeRegiment);
			core.rootScene.removeChild(healthImg);
			core.rootScene.removeChild(health);
			core.rootScene.removeChild(upgradeImg);
			core.rootScene.removeChild(upgrade);
			core.rootScene.removeChild(unitAttackImg);
			core.rootScene.removeChild(unitAttack);
			core.rootScene.removeChild(unitDefenseImg);
			core.rootScene.removeChild(unitDefense);
			core.rootScene.removeChild(unitSpeedImg);
			core.rootScene.removeChild(unitSpeed);
			core.rootScene.removeChild(veterancyImg);
			core.rootScene.removeChild(veterancy);
			core.rootScene.removeChild(unitXPImg);
			core.rootScene.removeChild(unitXP);
			
			core.rootScene.removeChild(healCastle);
			core.rootScene.removeChild(upgradeCastle);
			core.rootScene.removeChild(buyInfantry);
			core.rootScene.removeChild(buyCavalry);
			core.rootScene.removeChild(buyArmor);
			core.rootScene.removeChild(health);
			core.rootScene.removeChild(upgrade);
			/*core.rootScene.removeChild(warCastle);
			core.rootScene.removeChild(allianceCastle);*/
			
		}

}

var castleClick = function(event) {
	clickArray.push(this);
	this.selected = true;
	if(selected_obj) {
		selected_obj.backgroundColor = null;
	}
	selected_obj = this;
	this.backgroundColor = "#CCCC00";
}

var unitClick = function(event) {
	clickArray.push(this);
	this.selected = true;
	if(selected_obj) {
		selected_obj.backgroundColor = null;
	}
	selected_obj = this;
	this.backgroundColor = "#CCCC00";	
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

var healClick = function(event) {
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
	core.rootScene.removeChild(healRegiment);
	core.rootScene.removeChild(upgradeRegiment);
	core.rootScene.removeChild(healthImg);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgradeImg);
	core.rootScene.removeChild(upgrade);
	core.rootScene.removeChild(unitAttackImg);
	core.rootScene.removeChild(unitAttack);
	core.rootScene.removeChild(unitDefenseImg);
	core.rootScene.removeChild(unitDefense);
	core.rootScene.removeChild(unitSpeedImg);
	core.rootScene.removeChild(unitSpeed);
	core.rootScene.removeChild(veterancyImg);
	core.rootScene.removeChild(veterancy);
	core.rootScene.removeChild(unitXPImg);
	core.rootScene.removeChild(unitXP);
	
	core.rootScene.removeChild(healCastle);
	core.rootScene.removeChild(upgradeCastle);
	/*core.rootScene.addChild(warCastle);
	core.rootScene.addChild(allianceCastle);*/
	core.rootScene.removeChild(buyInfantry);
	core.rootScene.removeChild(buyCavalry);
	core.rootScene.removeChild(buyArmor);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgrade);
	
	//  USED FOR CASTLE IF STATEMENT 
		
	healCastle.text = "Heal";
	healCastle.x = core.width-coreUISize+25;
	healCastle.y = 20;
	healCastle.addEventListener(enchant.Event.TOUCH_START, healClick);
	healCastle.font = "bold 24px ken-vector-future-thin";
	
	upgradeCastle.text = "Upgrade";
	upgradeCastle.x = core.width-coreUISize+25;
	upgradeCastle.y = healCastle.y + 50; //healCastle.height;
	upgradeCastle.addEventListener(enchant.Event.TOUCH_START, upgradeClick);
	upgradeCastle.font = "bold 24px ken-vector-future-thin";
	
 	buyInfantry.text = "Buy Infantry";
 	buyInfantry.x = core.width-coreUISize+25;
	buyInfantry.y = upgradeCastle.y+50;
	buyInfantry.addEventListener(enchant.Event.TOUCH_START, buyInfantryClick);
	buyInfantry.font = "bold 24px ken-vector-future-thin";	
	
 	buyCavalry.text = "Buy Cavalry";
 	buyCavalry.x = core.width-coreUISize+25;
	buyCavalry.y = buyInfantry.y + 50;
	buyCavalry.addEventListener(enchant.Event.TOUCH_START, buyCavalryClick);
	buyCavalry.font = "bold 24px ken-vector-future-thin";
	
 	buyArmor.text = "Buy Armor";
 	buyArmor.x = core.width-coreUISize+25;
	buyArmor.y = buyCavalry.y + 50;
	buyArmor.addEventListener(enchant.Event.TOUCH_START, buyArmorClick);
	buyArmor.font = "bold 24px ken-vector-future-thin";
	
	/*warCastle.image = core.assets['assets/war.png'];
	warCastle.x = core.width-coreUISize;
	warCastle.addEventListener(enchant.Event.TOUCH_START, declareWarClick);
 	
	allianceCastle.image = core.assets['assets/alliance.png'];
	allianceCastle.x = core.width-coreUISize;
	allianceCastle.y = warCastle.height;
	warCastle.addEventListener(enchant.Event.TOUCH_START, offerAllianceClick)*/
 	//--------------------------------------
 	
	//    UNIT IF STATEMENT 
	
 	healRegiment.text = "Heal";
 	healRegiment.x = core.width-coreUISize+25;
	healRegiment.y = 20;
	healRegiment.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
	healRegiment.font = "bold 24px ken-vector-future-thin";
	
	
 	upgradeRegiment.text = "Upgrade";
 	upgradeRegiment.x = core.width-coreUISize+25;
	upgradeRegiment.y = healRegiment.y + 50;
	upgradeRegiment.addEventListener(enchant.Event.TOUCH_START, upgradeClick);
	upgradeRegiment.font = "bold 24px ken-vector-future-thin";
 	
 	
 	//    CASTLE STATS SETUP	
	
	healthImg.image = core.assets['assets/redcross.png'];
	healthImg.x = 0;
	healthImg.y = 9;
	
 	health.text = this.health;
 	health.x = 40;
 	health.y = healthImg.y;
 	
	upgradeImg.image = core.assets['assets/upgrade.png'];
	upgradeImg.x = healthImg.x + healthImg.width + 65 + 16;
	upgradeImg.y = healthImg.y;
	
 	upgrade.text = this.upgrade;
 	upgrade.x = upgradeImg.x + 40;
 	upgrade.y = healthImg.y;
 	
	//     UNIT STATS SETUP
		
	unitAttackImg.image = core.assets['assets/attack2.png'];
	unitAttackImg.x = upgradeImg.x + upgradeImg.width + 55 + 16;
	unitAttackImg.y = healthImg.y;
	
	unitAttack.text = this.attack;
	unitAttack.x = unitAttackImg.x + 40;
	unitAttack.y = healthImg.y;
	
	unitDefenseImg.image = core.assets['assets/defense.png'];
	unitDefenseImg.x = unitAttackImg.x + unitAttackImg.width + 55 + 16;
	unitDefenseImg.y = healthImg.y;
	
	unitDefense.text = this.defense;
	unitDefense.x = unitDefenseImg.x + 40;
	unitDefense.y = healthImg.y;
	
	unitSpeedImg.image = core.assets['assets/speed.png'];
	unitSpeedImg.x = unitDefenseImg.x + unitDefenseImg.width + 55 + 16;
	unitSpeedImg.y = healthImg.y;
	
	unitSpeed.text = this.speed;
	unitSpeed.x = unitSpeedImg.x + 40;
	unitSpeed.y = healthImg.y;
	
	veterancyImg.image = core.assets['assets/veterancy.png'];
	veterancyImg.x = unitSpeedImg.x + unitSpeedImg.width + 55 + 16;
	veterancyImg.y = healthImg.y;
	
	veterancy.text = this.veterancy;
	veterancy.x = veterancyImg.x + 40;
	veterancy.y = healthImg.y;
	
	unitXPImg.image = core.assets['assets/xp.png'];
	unitXPImg.x = veterancyImg.x + veterancyImg.width + 55 + 16;
	unitXPImg.y = healthImg.y;
	
	unitXP.text = this.xp;	
	unitXP.x = unitXPImg.x + 40;
	unitXP.y = healthImg.y;
	
	if(this.type == "castle" && this.owner == instance.uuid) {
		//   BUTTONS 
 		core.rootScene.addChild(healCastle);
		core.rootScene.addChild(upgradeCastle);
		core.rootScene.addChild(buyInfantry);
		core.rootScene.addChild(buyCavalry);
		core.rootScene.addChild(buyArmor);
		
		//   LABELS
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);
 	}
	else if (this.type == "castle" && this.owner != instance.uuid){
		//BUTTONS
		/*core.rootScene.addChild(warCastle);
		core.rootScene.addChild(allianceCastle);*/
		//   LABELS
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);	
	}
	else if (this.type == "unit" && this.owner == instance.uuid) {		
		//   BUTTONS
		core.rootScene.addChild(healRegiment);
		core.rootScene.addChild(upgradeRegiment);
		
		// LABELS
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);
		core.rootScene.addChild(unitAttackImg);
		core.rootScene.addChild(unitAttack);
		core.rootScene.addChild(unitDefenseImg);
		core.rootScene.addChild(unitDefense);
		core.rootScene.addChild(unitSpeedImg);
		core.rootScene.addChild(unitSpeed);
		core.rootScene.addChild(veterancyImg);
		core.rootScene.addChild(veterancy);
		core.rootScene.addChild(unitXPImg);
		core.rootScene.addChild(unitXP);
	}
	else if (this.type == "unit" && this.owner != instance.uuid) {
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);
		core.rootScene.addChild(unitAttackImg);
		core.rootScene.addChild(unitAttack);
		core.rootScene.addChild(unitDefenseImg);
		core.rootScene.addChild(unitDefense);
		core.rootScene.addChild(unitSpeedImg);
		core.rootScene.addChild(unitSpeed);
		core.rootScene.addChild(veterancyImg);
		core.rootScene.addChild(veterancy);
		core.rootScene.addChild(unitXPImg);
		core.rootScene.addChild(unitXP);
	}
 }