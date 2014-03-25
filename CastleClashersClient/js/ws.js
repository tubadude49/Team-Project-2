var host = "ws://localhost:10088";
var host2 = "ws://compute.cse.tamu.edu:10088";
var ws = new WebSocket(host2, 'json');

ws.onopen = function() {
	console.log("connection established");
}
ws.onmessage = function(event) {
	if(event.data.type) {
		if(event.data.type == 'instance') {
			instance = JSON.parse(event.data);
			console.log(instance);
		} else if(event.data.type == 'unit') {
			console.log(JSON.parse(event.data));
		} else if(event.data.type == 'castle') {			
			console.log(JSON.parse(event.data));
		}
	}

	var data = JSON.parse(event.data);
	console.log(data);
}
ws.onerror = function(error) {
	console.log(error);
}
ws.onclose = function() {
	console.log("connection closed");
}
