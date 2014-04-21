var handleRightClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		selected_objs[i].backgroundColor = null;
	}
	if(clickArray.length >= 2) {		
		var target = clickArray[clickArray.length-1];
		for(i=0;i<clickArray.length-1;i++) {
			var selected = clickArray[i];
			if(selected.uuid != target.uuid 
			&& selected.type == 'unit' 
			&& (target.type == 'castle' || target.type == 'unit')) {			
				var fields = {};
				fields.selected = selected.uuid;
				fields.target = target.uuid;
				fields.action = 'moveto';			
				ws.send(JSON.stringify(fields));
			}
		}
	}
	clearUI();
	selected_objs = [];
	clickArray = [];
	event.preventDefault();
	return false;
}

var vert1 = new Sprite(1,1);
var vert2 = new Sprite(1,1);
var hori1 = new Sprite(1,1);
var hori2 = new Sprite(1,1);
var handleMouseMove = function(event) {
	if(clickStart && clickStart.x && clickStart.y) {
		var maxStartY, minStartY, maxStartX, minStartX;	
		maxStartY = Math.max(clickStart.y, event.offsetY);
		minStartY = Math.min(clickStart.y, event.offsetY);
		maxStartX = Math.max(clickStart.x, event.offsetX);
		minStartX = Math.min(clickStart.x, event.offsetX);
		
		vert1.moveTo(minStartX, minStartY);
		vert2.moveTo(minStartX, maxStartY);
		vert1.width = vert2.width = maxStartX - minStartX;
		hori1.moveTo(minStartX, minStartY);
		hori2.moveTo(maxStartX, minStartY);
		hori1.height = hori2.height = maxStartY - minStartY;
		
		if(!clickStart.init) {
			core.rootScene.addChild(vert1);
			core.rootScene.addChild(vert2);
			core.rootScene.addChild(hori1);
			core.rootScene.addChild(hori2);
			clickStart.init = true;
		}
	}
}

var offerAllianceClick = function(event) {
	var request = {};
	request.action = 'offer';
	request.target = this.uuid;
	ws.send(JSON.stringify(request));
}

var breakAllianceClick = function(event) {
	var request = {};
	request.action = 'break';
	request.target = this.uuid;
	ws.send(JSON.stringify(request));
}

var clearUI = function() {		
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
	
	core.rootScene.removeChild(HealGroup);
	core.rootScene.removeChild(UpgradeGroup);
	core.rootScene.removeChild(InfantryGroup);
	core.rootScene.removeChild(CavalryGroup);
	core.rootScene.removeChild(CannonGroup);
	core.rootScene.removeChild(health);
	core.rootScene.removeChild(upgrade);
	core.rootScene.removeChild(allianceCastleOffer);
	core.rootScene.removeChild(allianceCastleBreak);
	
}

var startClick = function(event) {
	clickStart = {};
	clickStart.x = event.x;
	clickStart.y = event.y;
}

var endClick = function(event) {
	selected_objs = [];
	var maxY, minY, maxX, minX;	
		maxY = Math.max(clickStart.y, event.y);
		minY = Math.min(clickStart.y, event.y);
		maxX = Math.max(clickStart.x, event.x);
		minX = Math.min(clickStart.x, event.x);
	for(i=0;i<core.rootScene.childNodes.length;i++) {
		if((minX <= core.rootScene.childNodes[i].x || minX <= core.rootScene.childNodes[i].x + core.rootScene.childNodes[i].width)
		&& (maxX >= core.rootScene.childNodes[i].x || maxX >= core.rootScene.childNodes[i].x + core.rootScene.childNodes[i].width)
		&& (minY <= core.rootScene.childNodes[i].y || minY <= core.rootScene.childNodes[i].y + core.rootScene.childNodes[i].height)
		&& (maxY >= core.rootScene.childNodes[i].y || maxY >= core.rootScene.childNodes[i].y + core.rootScene.childNodes[i].height)
		) {
			if(core.rootScene.childNodes[i].type 
			&& (core.rootScene.childNodes[i].type == 'unit' || core.rootScene.childNodes[i].type == 'castle')) {				
				selected_objs.push(core.rootScene.childNodes[i]);
				clickArray.push(core.rootScene.childNodes[i]);
				core.rootScene.childNodes[i].backgroundColor = "#CCCC00";
			}
		} else {
			core.rootScene.childNodes[i].backgroundColor = null;
		}
	}
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type == 'castle') {
			uiClick(selected_objs[i]);
			break;
		} else if(i+1 >= selected_objs.length) {
			uiClick(selected_objs[i]);
			break;
		}
	}
	if(selected_objs.length <= 0) {		
		clearUI();
	}	
	selectedUnitUI();
	clickStart = {};
	core.rootScene.removeChild(vert1);
	core.rootScene.removeChild(vert2);
	core.rootScene.removeChild(hori1);
	core.rootScene.removeChild(hori2);
}

var selectedUnitUI = function() {
	core.rootScene.removeChild(castleIcon);
	core.rootScene.removeChild(infantryIcon);
	core.rootScene.removeChild(cavalryIcon);
	core.rootScene.removeChild(armorIcon);
	core.rootScene.removeChild(selectedCastles);
	core.rootScene.removeChild(selectedInfantry);
	core.rootScene.removeChild(selectedCavalry);
	core.rootScene.removeChild(selectedArmor);
	
	var castleCount = 0;
	var infantryCount = 0;
	var cavalryCount = 0;
	var cannonCount = 0;
	
	for(i=0;i<selected_objs.length;i++) {
		//console.log(selected_objs[i]);
		if(selected_objs[i].type == 'castle') {
			castleCount++;
		} else if(selected_objs[i].type == 'unit') {
			if(selected_objs[i].subtype == 'infantry') {
				infantryCount++;
			} else if(selected_objs[i].subtype == 'cavalry') {
				cavalryCount++;
			} else if(selected_objs[i].subtype == 'cannon') {
				cannonCount++;
			}		
		}
	}
	var currentLocation = core.height*5/8;
	
	if(castleCount > 0) {
		castleIcon.image = core.assets['assets/castle.png'];
		castleIcon.x = core.width - coreUISize + 25;
		castleIcon.y = currentLocation;
		currentLocation += castleIcon.height + 25;
		castleIcon.scaleX = 1;
		castleIcon.scaleY = 1;
		castleIcon.frame = 5;
		selectedCastles.text = castleCount;
		selectedCastles.x = core.width - coreUISize + 125;//castleIcon.x + castleIcon.width + 25;
		selectedCastles.y = castleIcon.y;
		selectedCastles.font = "bold 18px ken-vector-future-thin";
		core.rootScene.addChild(castleIcon);
		core.rootScene.addChild(selectedCastles);
	}
	if(infantryCount > 0) {
		infantryIcon.image = core.assets['assets/infantry.png'];
		infantryIcon.x = core.width - coreUISize + 25;
		infantryIcon.y = currentLocation;
		currentLocation += infantryIcon.height + 25;
		selectedInfantry.text = infantryCount;
		selectedInfantry.x = core.width - coreUISize + 125;//infantryIcon.x + infantryIcon.width + 25;
		selectedInfantry.y = infantryIcon.y;
		selectedInfantry.font = "bold 18px ken-vector-future-thin";
		core.rootScene.addChild(infantryIcon);
		core.rootScene.addChild(selectedInfantry);
	}
	if(cavalryCount > 0) {
		cavalryIcon.image = core.assets['assets/cavalry.png'];
		cavalryIcon.x = core.width - coreUISize + 25;
		cavalryIcon.y = currentLocation;
		currentLocation += cavalryIcon.height + 25;
		selectedCavalry.text = cavalryCount;
		selectedCavalry.x = core.width - coreUISize + 125;//cavalryIcon.x + cavalryIcon.width + 25;
		selectedCavalry.y = cavalryIcon.y;
		selectedCavalry.font = "bold 18px ken-vector-future-thin";
		core.rootScene.addChild(cavalryIcon);
		core.rootScene.addChild(selectedCavalry);
	}
	if(cannonCount > 0) {
		armorIcon.image = core.assets['assets/cannon.png'];
		armorIcon.x = core.width - coreUISize + 25;
		armorIcon.y = currentLocation;
		currentLocation += armorIcon.height + 25;
		selectedArmor.text = cannonCount;
		selectedArmor.x = core.width - coreUISize + 125;//armorIcon.x + armorIcon.width + 25;
		selectedArmor.y = armorIcon.y;
		selectedArmor.font = "bold 18px ken-vector-future-thin";
		core.rootScene.addChild(armorIcon);
		core.rootScene.addChild(selectedArmor);
	}	
	
}

/*var castleClick = function(event) {
	clickArray.push(this);
	this.selected = true;
	if(selected_obj) {
		selected_obj.backgroundColor = null;
	}
	selected_obj = this;
	this.backgroundColor = "#CCCC00";
}*/

/*var unitClick = function(event) {
	clickArray.push(this);
	this.selected = true;
	if(selected_obj) {
		selected_obj.backgroundColor = null;
	}
	selected_obj = this;
	this.backgroundColor = "#CCCC00";	
}*/

/*var reinforceClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		var request = {};
		request.action = 'purchase';
		request.purchase = 'reinforce';
		request.type = selected_objs[i].type;
		request.uuid = selected_objs[i].uuid;
		request.x = selected_objs[i]._x;
		request.y = selected_objs[i]._y;
		ws.send(JSON.stringify(request));
	}
}*/

var upgradeClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		var request = {};
		request.action = 'purchase';
		request.purchase = 'upgrade';
		request.type = selected_objs[i].type;
		request.uuid = selected_objs[i].uuid;
		request.x = selected_objs[i]._x;
		request.y = selected_objs[i]._y;
		ws.send(JSON.stringify(request));
	}
}

var buyInfantryClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type && selected_objs[i].type == 'castle') {
			var request = {};
			request.action = 'purchase';
			request.purchase = 'new';
			request.type = 'infantry';
			request.uuid = instance.uuid;
			request.x = selected_objs[i]._x;
			request.y = selected_objs[i]._y;
			ws.send(JSON.stringify(request));
		}
	}
}

var buyCavalryClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type && selected_objs[i].type == 'castle') {
			var request = {};
			request.action = 'purchase';
			request.purchase = 'new';
			request.type = 'cavalry';
			request.uuid = instance.uuid;
			request.x = selected_objs[i]._x;
			request.y = selected_objs[i]._y;
			ws.send(JSON.stringify(request));
		}
	}
}

var buyArmorClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type && selected_objs[i].type == 'castle') {
			var request = {};
			request.action = 'purchase';
			request.purchase = 'new';
			request.type = 'cannon';
			request.uuid = instance.uuid;
			request.x = selected_objs[i]._x;
			request.y = selected_objs[i]._y;
			ws.send(JSON.stringify(request));
		}
	}
}

var healClick = function(event) {
	for(i=0;i<selected_objs.length;i++) {
		var request = {};
		request.action = 'purchase';
		request.purchase = 'reinforce';
		request.type = selected_objs[i].type;
		request.uuid = selected_objs[i].uuid;
		request.x = selected_objs[i]._x;
		request.y = selected_objs[i]._y;
		ws.send(JSON.stringify(request));
	}
}

var uiClick = function(event) {
	
	clearUI();
	
	//  USED FOR CASTLE IF STATEMENT 		
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HEAL GROUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	healCastle.text = "Heal";
	healCastle.x = core.width-coreUISize+25;
	healCastle.y = 20;
	healCastle.font = "bold 24px ken-vector-future-thin";
	
	healGold.image = core.assets['assets/gold.png'];
	healGold.frame = 10;
	healGold.x = healCastle.x;
	healGold.y = healCastle.y + healCastle._boundHeight + 2;
		
	// calculate cost based on selected object array
	var cost = 0;
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type == 'castle') {
			cost += 50;
		} else if(selected_objs[i].type == 'unit') {
			cost += 10;		
		}
	}
	healCost.text = cost;
	healCost.font = "24px ken-vector-future-thin";
	healCost.x = healGold.x + healGold.width + 5;
	healCost.y = healGold.y;
	
	healBackground.x = healCastle.x;
	healBackground.y = healCastle.y;
	
	HealGroup.addChild(healBackground);
	HealGroup.addChild(healCastle);
	HealGroup.addChild(healGold);
	HealGroup.addChild(healCost);
	HealGroup.addEventListener(enchant.Event.TOUCH_START, healClick);
	HealGroup.addEventListener(enchant.Event.TOUCH_START, function() {
		if(instance.gold > cost) {
			healBackground.backgroundColor = "#CCCC00";
			healBackground.tl.delay(250).then(function() {
				healBackground.backgroundColor = null;
			});			
		}
	});
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UPGRADE GROUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	upgradeCastle.text = "Upgrade";
	upgradeCastle.x = core.width-coreUISize+25;
	upgradeCastle.y = healCastle.y + 80; //healCastle.height;
	upgradeCastle.font = "bold 24px ken-vector-future-thin";
	
	upgradeGold.image = core.assets['assets/gold.png'];
	upgradeGold.frame = 10;
	upgradeGold.x = upgradeCastle.x;
	upgradeGold.y = upgradeCastle.y + upgradeCastle._boundHeight + 2;
	
	// calculate cost based on selected object array
	cost = 0;
	for(i=0;i<selected_objs.length;i++) {
		if(selected_objs[i].type == 'castle') {
			cost += 100;
		} else if(selected_objs[i].type == 'unit') {
			cost += 15;		
		}
	}	
	
	upgradeCost.text = cost;
	upgradeCost.font = "24px ken-vector-future-thin";
	upgradeCost.x = upgradeGold.x + upgradeGold.width + 5;
	upgradeCost.y = upgradeGold.y;
	
	upgradeBackground.x = upgradeCastle.x;
	upgradeBackground.y = upgradeCastle.y;
	
	UpgradeGroup.addChild(upgradeBackground);
	UpgradeGroup.addChild(upgradeCastle);
	UpgradeGroup.addChild(upgradeGold);
	UpgradeGroup.addChild(upgradeCost);
	UpgradeGroup.addEventListener(enchant.Event.TOUCH_START, upgradeClick);
	UpgradeGroup.addEventListener(enchant.Event.TOUCH_START, function() {
		if(instance.gold > cost) {
			upgradeBackground.backgroundColor = "#CCCC00";
			upgradeBackground.tl.delay(250).then(function() {
				upgradeBackground.backgroundColor = null;
			});			
		}
	});
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INFANTRY GROUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 	buyInfantry.text = "Infantry";
	buyInfantry.x = core.width-coreUISize+25;
	buyInfantry.y = upgradeCastle.y + 80;
	my_font = 24;
	buyInfantry.font = "bold " + my_font + "px ken-vector-future-thin";	
	while(buyInfantry._boundWidth > 150) {
		buyInfantry.font = "bold " + --my_font + "px ken-vector-future-thin";
	}
	
	infantryGold.image = core.assets['assets/gold.png'];
	infantryGold.frame = 10;
	infantryGold.x = buyInfantry.x;
	infantryGold.y = buyInfantry.y + buyInfantry._boundHeight + 2;
	
	infantryCost.text = '25';
	infantryCost.font = "24px ken-vector-future-thin";
	infantryCost.x = infantryGold.x + infantryGold.width + 5;
	infantryCost.y = infantryGold.y;
	
	infantryBackground.x = buyInfantry.x;
	infantryBackground.y = buyInfantry.y;
	
	InfantryGroup.addChild(infantryBackground);
	InfantryGroup.addChild(buyInfantry);
	InfantryGroup.addChild(infantryGold);
	InfantryGroup.addChild(infantryCost);
	InfantryGroup.addEventListener(enchant.Event.TOUCH_START, buyInfantryClick);
	InfantryGroup.addEventListener(enchant.Event.TOUCH_START, function() {
		if(instance.gold > 25) {
			infantryBackground.backgroundColor = "#CCCC00";
			infantryBackground.tl.delay(250).then(function() {
				infantryBackground.backgroundColor = null;
			});			
		}
	});
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CAVALRY GROUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 	buyCavalry.text = "Cavalry";
	buyCavalry.x = core.width-coreUISize+25;
	buyCavalry.y = buyInfantry.y + 80;
	buyCavalry.font = "bold 24px ken-vector-future-thin";
	my_font = 24;
	buyCavalry.font = "bold " + my_font + "px ken-vector-future-thin";	
	while(buyCavalry._boundWidth > 150) {
		buyCavalry.font = "bold " + --my_font + "px ken-vector-future-thin";
	}
	
	cavalryGold.image = core.assets['assets/gold.png'];
	cavalryGold.frame = 10;
	cavalryGold.x = buyCavalry.x;
	cavalryGold.y = buyCavalry.y + buyCavalry._boundHeight + 2;
	
	cavalryCost.text = '25';
	cavalryCost.font = "24px ken-vector-future-thin";
	cavalryCost.x = cavalryGold.x + cavalryGold.width + 5;
	cavalryCost.y = cavalryGold.y;
	
	cavalryBackground.x = buyCavalry.x;
	cavalryBackground.y = buyCavalry.y;
	
	CavalryGroup.addChild(cavalryBackground);
	CavalryGroup.addChild(buyCavalry);
	CavalryGroup.addChild(cavalryGold);
	CavalryGroup.addChild(cavalryCost);
	CavalryGroup.addEventListener(enchant.Event.TOUCH_START, buyCavalryClick);
	CavalryGroup.addEventListener(enchant.Event.TOUCH_START, function() {
		if(instance.gold > 25) {
			cavalryBackground.backgroundColor = "#CCCC00";
			cavalryBackground.tl.delay(250).then(function() {
				cavalryBackground.backgroundColor = null;
			});			
		}
	});
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CANNON GROUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 	buyArmor.text = "Cannon";
	buyArmor.x = core.width-coreUISize+25;
	buyArmor.y = buyCavalry.y + 80;
	buyArmor.font = "bold 24px ken-vector-future-thin";
	my_font = 24;
	buyArmor.font = "bold " + my_font + "px ken-vector-future-thin";	
	while(buyArmor._boundWidth > 150) {
		buyArmor.font = "bold " + --my_font + "px ken-vector-future-thin";
	}
	
	cannonGold.image = core.assets['assets/gold.png'];
	cannonGold.frame = 10;
	cannonGold.x = buyArmor.x;
	cannonGold.y = buyArmor.y + buyArmor._boundHeight + 2;
	
	cannonCost.text = '25';
	cannonCost.font = "24px ken-vector-future-thin";
	cannonCost.x = cannonGold.x + cannonGold.width + 5;
	cannonCost.y = cannonGold.y;
	
	cannonBackground.x = buyArmor.x;
	cannonBackground.y = buyArmor.y;
	
	CannonGroup.addChild(cannonBackground);
	CannonGroup.addChild(buyArmor);
	CannonGroup.addChild(cannonGold);
	CannonGroup.addChild(cannonCost);
	CannonGroup.addEventListener(enchant.Event.TOUCH_START, buyArmorClick);
	CannonGroup.addEventListener(enchant.Event.TOUCH_START, function() {
		if(instance.gold > 25) {
			cannonBackground.backgroundColor = "#CCCC00";
			cannonBackground.tl.delay(250).then(function() {
				cannonBackground.backgroundColor = null;
			});			
		}
	});
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ALLIANCES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	allianceCastleOffer.x = core.width-coreUISize+25;
	allianceCastleOffer.y = 500;
	allianceCastleOffer.font = "bold 24px ken-vector-future-thin";
	allianceCastleBreak.x = core.width-coreUISize+25;
	allianceCastleBreak.y = 500;
	allianceCastleBreak.font = "bold 24px ken-vector-future-thin";
 	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CASTLE STATS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	healthImg.image = core.assets['assets/redcross.png'];
	healthImg.x = 0;
	healthImg.y = 9;
	
 	health.text = event.health;
 	health.x = 40;
 	health.y = healthImg.y;
 	
	upgradeImg.image = core.assets['assets/upgrade.png'];
	upgradeImg.x = healthImg.x + healthImg.width + 65 + 16;
	upgradeImg.y = healthImg.y;
	
 	upgrade.text = event.upgrade;
 	upgrade.x = upgradeImg.x + 40;
 	upgrade.y = healthImg.y;
 	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UNIT STATS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	unitAttackImg.image = core.assets['assets/attack2.png'];
	unitAttackImg.x = upgradeImg.x + upgradeImg.width + 55 + 16;
	unitAttackImg.y = healthImg.y;
	
	unitAttack.text = event.attack;
	unitAttack.x = unitAttackImg.x + 40;
	unitAttack.y = healthImg.y;
	
	unitDefenseImg.image = core.assets['assets/defense.png'];
	unitDefenseImg.x = unitAttackImg.x + unitAttackImg.width + 55 + 16;
	unitDefenseImg.y = healthImg.y;
	
	unitDefense.text = event.defense;
	unitDefense.x = unitDefenseImg.x + 40;
	unitDefense.y = healthImg.y;
	
	unitSpeedImg.image = core.assets['assets/speed.png'];
	unitSpeedImg.x = unitDefenseImg.x + unitDefenseImg.width + 55 + 16;
	unitSpeedImg.y = healthImg.y;
	
	unitSpeed.text = event.speed;
	unitSpeed.x = unitSpeedImg.x + 40;
	unitSpeed.y = healthImg.y;
	
	veterancyImg.image = core.assets['assets/veterancy.png'];
	veterancyImg.x = unitSpeedImg.x + unitSpeedImg.width + 55 + 16;
	veterancyImg.y = healthImg.y;
	
	veterancy.text = event.veterancy;
	veterancy.x = veterancyImg.x + 40;
	veterancy.y = healthImg.y;
	
	unitXPImg.image = core.assets['assets/xp.png'];
	unitXPImg.x = veterancyImg.x + veterancyImg.width + 55 + 16;
	unitXPImg.y = healthImg.y;
	
	unitXP.text = event.xp;	
	unitXP.x = unitXPImg.x + 40;
	unitXP.y = healthImg.y;
	
	// display interface objects based on type and ownership
	if(event.type == "castle" && event.owner == instance.uuid) {
		// UI for an owned castle
		
		//   Purchase options 
 		core.rootScene.addChild(HealGroup);
		core.rootScene.addChild(UpgradeGroup);
		core.rootScene.addChild(InfantryGroup);
		core.rootScene.addChild(CavalryGroup);
		core.rootScene.addChild(CannonGroup);
		
		//   Statistics
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);
 	}
	else if (event.type == "castle" && event.owner != instance.uuid){
		// UI for an unowned castle
		
		// Alliance options
		if(event.owner != -1 && instance.alliance == event.owner) {
			allianceCastleBreak.text = "Break Alliance";
			allianceCastleBreak.width = 140;
			allianceCastleBreak.uuid = event.owner;
			allianceCastleBreak.on(enchant.Event.TOUCH_START, breakAllianceClick);
			core.rootScene.removeChild(allianceCastleOffer);
			core.rootScene.addChild(allianceCastleBreak);
		} else if(event.owner != -1){
			allianceCastleOffer.text = "Request Alliance";
			allianceCastleOffer.width = 140;
			allianceCastleOffer.uuid = event.owner;
			allianceCastleOffer.on(enchant.Event.TOUCH_START, offerAllianceClick);
			core.rootScene.removeChild(allianceCastleBreak);
			core.rootScene.addChild(allianceCastleOffer);			
		}
		//	Statistics
		core.rootScene.addChild(healthImg);
		core.rootScene.addChild(health);
		core.rootScene.addChild(upgradeImg);
		core.rootScene.addChild(upgrade);	
		
	} else if (event.type == "unit") {		
		
		if(event.owner == instance.uuid) {
			//	Purchase options for owned unit
			core.rootScene.addChild(HealGroup);
			core.rootScene.addChild(UpgradeGroup);
		}
		
		// Statistics
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
