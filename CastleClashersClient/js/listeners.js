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
			
			core.rootScene.removeChild(reinforceRegiment);
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
			
			core.rootScene.removeChild(reinforceCastle);
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
		
	if(selected_obj == null || selected_obj.type != 'unit') {
		if(selected_obj != null)
		{
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
		}	
		
		this.selected = true;
		selected_obj = this;
		this.backgroundColor = "#CCCC00";
		
	}
	else {
		
		var fields = {};
		fields.selected = selected_obj.uuid;
		fields.target = this.uuid;
		fields.action = 'moveto';
		selected_obj.backgroundColor = null;
		selected_obj.selected = false;
		selected_obj = null;
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
	this.viewing = !this.viewing;
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
	
	core.rootScene.removeChild(reinforceCastle);
	/*core.rootScene.addChild(warCastle);
	core.rootScene.addChild(allianceCastle);*/
	core.rootScene.removeChild(buyInfantry);
	core.rootScene.removeChild(buyCavalry);
	core.rootScene.removeChild(buyArmor);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgrade);
	
	//  USED FOR CASTLE IF STATEMENT 
	
 	reinforceCastle.image = core.assets['assets/reinforceCastle.png'];
 	reinforceCastle.x = core.width-coreUISize;
	reinforceCastle.addEventListener(enchant.Event.TOUCH_START, reinforceClick);
	
	upgradeCastle.image = core.assets['assets/upgradeCastle.png'];
	upgradeCastle.x = core.width-coreUISize;
	upgradeCastle.y = reinforceCastle.height;
	upgradeCastle.addEventListener(enchant.Event.TOUCH_START, upgradeClick)
	
 	buyInfantry.image = core.assets['assets/buyInfantry.png'];
 	buyInfantry.x = core.width-coreUISize;
	buyInfantry.y = upgradeCastle.y + buyInfantry.height;
	buyInfantry.addEventListener(enchant.Event.TOUCH_START, buyInfantryClick)
	
	
 	buyCavalry.image = core.assets['assets/buyCavalry.png'];
 	buyCavalry.x = core.width-coreUISize;
	buyCavalry.y = buyInfantry.y + buyCavalry.height;
	buyCavalry.addEventListener(enchant.Event.TOUCH_START, buyCavalryClick);
	
	
 	buyArmor.image = core.assets['assets/buyArmor.png'];
 	buyArmor.x = core.width-coreUISize;
	buyArmor.y = buyCavalry.y + buyArmor.height;
	buyArmor.addEventListener(enchant.Event.TOUCH_START, buyArmorClick);
	
	/*warCastle.image = core.assets['assets/war.png'];
	warCastle.x = core.width-coreUISize;
	warCastle.addEventListener(enchant.Event.TOUCH_START, declareWarClick);
 	
	allianceCastle.image = core.assets['assets/alliance.png'];
	allianceCastle.x = core.width-coreUISize;
	allianceCastle.y = warCastle.height;
	warCastle.addEventListener(enchant.Event.TOUCH_START, offerAllianceClick)*/
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
	
	healthImg.image = core.assets['assets/redcross.png'];
	healthImg.x = 0;
	healthImg.y = 9;
	
 	health.text = this.health;
 	health.x = 40;
 	health.y = healthImg.y;
 	
	upgradeImg.image = core.assets['assets/upgrade.png'];
	upgradeImg.x = healthImg.x + healthImg.width + 55 + 16;
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
 		core.rootScene.addChild(reinforceCastle);
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
		core.rootScene.addChild(reinforceRegiment);
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