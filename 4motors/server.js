var app = require("http").createServer(handler);
var io = require("socket.io").listen(app);
var fs = require("fs");
var rpio = require("rpio");
var port = 8080;
var motorId = 0;

rpio.open(31, rpio.OUTPUT);
console.log("GPIO 31 opened");
rpio.open(32, rpio.OUTPUT);
console.log("GPIO 32 opened");
rpio.open(33, rpio.OUTPUT);
console.log("GPIO 33 opened");
rpio.open(35, rpio.OUTPUT);
console.log("GPIO 35 opened");
rpio.open(36, rpio.OUTPUT);
console.log("GPIO 36 opened");
rpio.open(37, rpio.OUTPUT);
console.log("GPIO 37 opened");
rpio.open(38, rpio.OUTPUT);
console.log("GPIO 38 opened");
rpio.open(40, rpio.OUTPUT);
console.log("GPIO 40 opened");

function writePin(pin, state) {
	rpio.write(pin, state);
	console.log("Pin " + pin + ": " + state);
}

app.listen(port);
console.log("start listening at port " + port);

function handler (req, res) {
	fs.readFile("index.html", function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end("Error loading index.html");
		}
		
		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on("connection", function (socket) {
	console.log("Connected");
	socket.emit("message", "Connected");
	
	socket.on("button", function (data) {
		console.log("Received: " + data);
		
		if(data === "stop") {
			socket.emit("message", "Emergency Stop received");
			writePin(31, 0);
			writePin(32, 0);
			writePin(33, 0);
			writePin(35, 0);
			writePin(36, 0);
			writePin(37, 0);
			writePin(38, 0);
			writePin(40, 0);
		}
		if(data === "1on") {
			socket.emit("message", "1on received");
			writePin(31, 1);
			writePin(33, 0);
		}
		if(data === "1off") {
			socket.emit("message", "1off received");
			writePin(31, 0);
			writePin(33, 0);
		}
		if(data === "1back") {
			socket.emit("message", "1back received");
			writePin(31, 0);
			writePin(33, 1);
		}
		if(data === "2on") {
			socket.emit("message", "2on received");
			writePin(32, 1);
			writePin(36, 0);
		}
		if(data === "2off") {
			socket.emit("message", "2off received");
			writePin(32, 0);
			writePin(36, 0);
		}
		if(data === "2back") {
			socket.emit("message", "2back received");
			writePin(32, 0);
			writePin(36, 1);
		}
		if(data === "3on") {
			socket.emit("message", "3on received");
			writePin(35, 1);
			writePin(37, 0);
		}
		if(data === "3off") {
			socket.emit("message", "3off received");
			writePin(35, 0);
			writePin(37, 0);
		}
		if(data === "3back") {
			socket.emit("message", "3back received");
			writePin(35, 0);
			writePin(37, 1);
		}
		if(data === "4on") {
			socket.emit("message", "4on received");
			writePin(38, 1);
			writePin(40, 0);
		}
		if(data === "4off") {
			socket.emit("message", "4off received");
			writePin(38, 0);
			writePin(40, 0);
		}
		if(data === "4back") {
			socket.emit("message", "4back received");
			writePin(38, 0);
			writePin(40, 1);
		}
	});
});
