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
			core.rootScene.removeChild(buyInfantry);
			core.rootScene.removeChild(buyCavalry);
			core.rootScene.removeChild(buyArmor);
			core.rootScene.removeChild(health);
			core.rootScene.removeChild(upgrade);
		}

}

var castleClick = function(event) {
		
	if(selected_obj == null || (this.owner == instance.uuid && selected_obj.type != 'unit') ) {
		if(selected_obj != null)
		{
			selected_obj.backgroundColor = null;
			selected_obj.selected = false;
		}	
		
		this.selected = true;
		selected_obj = this;
		this.backgroundColor = "#CCCC00";
		
	}
	else{
		
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
	core.rootScene.removeChild(buyInfantry);
	core.rootScene.removeChild(buyCavalry);
	core.rootScene.removeChild(buyArmor);
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
	var imgYoffset = 9;
	
	healthImg.image = core.assets['assets/redcross.png'];
	healthImg.x = 0;
	healthImg.y = imgYoffset;
	
 	health.text = this.health;
 	health.x = 40;
 	health.y = imgYoffset;
 	
	upgradeImg.image = core.assets['assets/upgrade.png'];
	upgradeImg.x = healthImg.x + healthImg.width + 55 + 16;
	upgradeImg.y = imgYoffset;
	
 	upgrade.text = this.upgrade;
 	upgrade.x = upgradeImg.x + 40;
 	upgrade.y = imgYoffset;
 	
	//     UNIT STATS SETUP
		
	unitAttackImg.image = core.assets['assets/attack2.png'];
	unitAttackImg.x = upgradeImg.x + upgradeImg.width + 55 + 16;
	unitAttackImg.y = imgYoffset;
	
	unitAttack.text = this.attack;
	unitAttack.x = unitAttackImg.x + 40;
	unitAttack.y = imgYoffset;
	
	unitDefenseImg.image = core.assets['assets/defense.png'];
	unitDefenseImg.x = unitAttackImg.x + unitAttackImg.width + 55 + 16;
	unitDefenseImg.y = imgYoffset;
	
	unitDefense.text = this.defense;
	unitDefense.x = unitDefenseImg.x + 40;
	unitDefense.y = imgYoffset;
	
	unitSpeedImg.image = core.assets['assets/speed.png'];
	unitSpeedImg.x = unitDefenseImg.x + unitDefenseImg.width + 55 + 16;
	unitSpeedImg.y = imgYoffset;
	
	unitSpeed.text = this.speed;
	unitSpeed.x = unitSpeedImg.x + 40;
	unitSpeed.y = imgYoffset;
	
	veterancyImg.image = core.assets['assets/veterancy.png'];
	veterancyImg.x = unitSpeedImg.x + unitSpeedImg.width + 55 + 16;
	veterancyImg.y = imgYoffset;
	
	veterancy.text = this.veterancy;
	veterancy.x = veterancyImg.x + 40;
	veterancy.y = imgYoffset;
	
	unitXPImg.image = core.assets['assets/xp.png'];
	unitXPImg.x = veterancyImg.x + veterancyImg.width + 55 + 16;
	unitXPImg.y = imgYoffset;
	
	unitXP.text = this.xp;	
	unitXP.x = unitXPImg.x + 40;
	unitXP.y = imgYoffset;
	
	if(this.type == "castle" && this.owner == instance.uuid) {
		//   BUTTONS 
 		core.rootScene.addChild(reinforceCastle);
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