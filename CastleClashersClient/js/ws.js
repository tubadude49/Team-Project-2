var host = "ws://localhost:10088";
var ws = new WebSocket(host, 'json');

ws.onopen = function() {
	console.log("connection established");
}
ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	console.log(data);
	var response = {
		'what' : 'does',
		'this' : 'looklike',
		'changing' : 'size'
	};
	ws.send(JSON.stringify(response));
	console.log(response);
}
ws.onerror = function(error) {
	console.log(error);
}
ws.onclose = function() {
	console.log("connection closed");
}