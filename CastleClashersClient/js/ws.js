var host = "ws://localhost:10088";
var host2 = "ws://compute.cse.tamu.edu:10088";
var ws = new WebSocket(host, 'json');

ws.onopen = function() {
	console.log("connection established");
}
ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	if(data.type) {
		if(data.type == 'instance') {
			instance = data;
			//console.log(instance);
		} else if(data.type == 'unit') {
			var found = false;
			for(i=0;i<units.length;i++) {
				if(units[i].uuid == data.uuid) {
					units[i] = unitFromData(units[i],data);
					found = true;
					console.log("unit updated");
					break;
				}
			}
			if(!found) {
				var unit = new Unit(data.subtype);
				units.push(unitFromData(unit,data));
				console.log("unit added");
			}
		} else if(data.type == 'castle') {			
			console.log(data);
		}
	}
}
ws.onerror = function(error) {
	console.log(error);
}
ws.onclose = function() {
	console.log("connection closed");
}
