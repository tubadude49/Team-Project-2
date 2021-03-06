var host = "ws://localhost:8787";
var host2 = "ws://compute.cse.tamu.edu:10088";
var host3 = "ws://25.10.234.5:10088";
var ws;

var establishWS = function () {
	ws = new WebSocket(host, 'json');
	
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
				for(i=0;i<selected_objs.length;i++) {
					if(selected_objs[i].type == 'castle') {
						uiClick(selected_objs[i]);
						break;
					}
				}
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
						if (selected_objs.length > 0) {
							for(i=0;i<selected_objs.length;i++) {
								if(selected_objs[i].type == 'castle' && selected_objs[i].uuid == data.uuid) {
									uiClick(selected_objs[i]);
									break;
								} else if(i+1 >= selected_objs.length && selected_objs[i].uuid == data.uuid) {
									uiClick(selected_objs[i]);
									break;
								}
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
				var found = false;
				for(i=0;i<castles.length;i++) {
					if(castles[i].sprite.uuid == data.uuid) {
						castles[i] = castleFromData(castles[i],data);
						updateCastle(castles[i].sprite);
						found = true;
						if (selected_objs.length > 0) {
							for(i=0;i<selected_objs.length;i++) {
								if(selected_objs[i].type == 'castle' && selected_objs[i].uuid == data.uuid) {
									uiClick(selected_objs[i]);
									break;
								} else if(i+1 >= selected_objs.length  && selected_objs[i].uuid == data.uuid) {
									uiClick(selected_objs[i]);
									break;
								}
							}
						}
						break;
					}
				}
				if(!found) {
					var castle = new Castle(data.x, data.y);
					castles.push(castleFromData(castle,data));
				}
			} else if(data.type == 'battle') {	
				drawBattle(data);
			} else if(data.type == 'siege') {
				drawSiege(data);
			} else if(data.type == 'start') {
				initGameboard();
			} else if(data.type == 'message') {
				console.log(data.message);
				drawMessage(data.message, '#f00');
			} else if(data.type == 'win') {
				if(data.player1 == instance.uuid || data.player2 == instance.uuid) {
					drawMessage('YOU WIN!', '#000000'); //tmp color
				} else {
					drawMessage('YOU LOSE!', '#ffff00'); // tmp color
				}
				setTimeout(clearGame, 3000);
			}
		}
	};
	ws.onerror = function(error) {
		if(error.srcElement == WebSocket) {
			console.log("Failed to connect to:" + error.srcElement.URL);
		}
	};
	ws.onclose = function(event) {
		console.log("connection closed");
		drawMessage('connection lost to server', '#f00');
		setTimeout(clearGame, 3000);
	};
}
