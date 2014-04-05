var host = "ws://localhost:10088";
var host2 = "ws://compute.cse.tamu.edu:10088";
var host3 = "ws://25.10.234.5:10088";
var ws;

var establishWS = function () {
	ws = new WebSocket(host2, 'json');
	
	ws.onopen = function(event) {
		console.log("connection established");
	};
	ws.onmessage = function(event) {
		if(event.data.substr(0,1) != '{') { return; }
		var data = JSON.parse(event.data);
		if(data.type) {
			if(data.type == 'instance') {
				instance = data;
				updateGold(instance);
			} else if(data.type == 'unit') {				
				var found = false;
				for(i=0;i<units.length;i++) {
					if(units[i].sprite.uuid == data.uuid) {
						units[i] = unitFromData(units[i],data);
						if(units[i].sprite.health <= 0) {
							core.rootScene.removeChild(units[i].sprite);
							core.rootScene.removeChild(units[i].hsprite);
							units.splice(i,1);
						}
						found = true;
						if (selected_obj != null) {
							if (selected_obj.uuid == data.uuid) {
								units[i].sprite.dispatchEvent(new Event(enchant.Event.TOUCH_START));
							}
						}	
						break;
					}
				}
				if(!found) {
					var unit = new Unit(data.subtype, data.x, data.y);
					units.push(unitFromData(unit,data));
				}
			} else if(data.type == 'castle') {			
				//console.log(data);
				var found = false;
				for(i=0;i<castles.length;i++) {
					if(castles[i].sprite.uuid == data.uuid) {
						castles[i] = castleFromData(castles[i],data);
						updateCastle(castles[i].sprite);
						found = true;
						if (selected_obj != null) {
							if (selected_obj.uuid == data.uuid) {
								castles[i].sprite.dispatchEvent(new Event(enchant.Event.TOUCH_START));
							}
						}	
						break;
					}
				}
				if(!found) {
					var castle = new Castle(data.x, data.y);
					castles.push(castleFromData(castle,data));
				}
			} /*else if(data.type == 'win') {
				console.log(data);
			}*/
		}
	};
	ws.onerror = function(error) {
		if(error.srcElement == WebSocket) {
			console.log("Failed to connect to:" + error.srcElement.URL);
		}
	};
	ws.onclose = function(event) {
		console.log("connection closed");
	};
}