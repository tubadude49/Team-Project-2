var host = "ws://localhost:10088";
var host2 = "ws://compute.cse.tamu.edu:10088";
var ws = new WebSocket(host, 'json');

ws.onopen = function() {
	console.log("connection established");
}
ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	//console.log(data);
	if(data.type) {
		if(data.type == 'instance') {
			instance = data;
		} else if(data.type == 'unit') {
			var found = false;
			for(i=0;i<units.length;i++) {
				if(units[i].sprite.uuid == data.uuid) {
					units[i] = unitFromData(units[i],data);
					if(units[i].sprite.health <= 0) {
						core.rootScene.removeChild(units[i].sprite);
						units.splice(i,1);
					}
					found = true;
					break;
				}
			}
			if(!found) {
				var unit = new Unit(data.subtype);
				units.push(unitFromData(unit,data));
			}
		} else if(data.type == 'castle') {			
			console.log(data);
			var found = false;
			for(i=0;i<castles.length;i++) {
				if(castles[i].sprite.uuid == data.uuid) {
					castles[i] = castleFromData(castles[i],data);
					found = true;
					break;
				}
			}
			if(!found) {
				var castle = new Castle();
				castles.push(castleFromData(castle,data));
			}
		}
	}
}
ws.onerror = function(error) {
	if(error.srcElement == WebSocket) {
		console.log("Failed to connect to:" + error.srcElement.URL);
	}
}
ws.onclose = function() {
	console.log("connection closed");
}
