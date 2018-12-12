var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");


var port = process.argv[2];
var app = express();

var Game = require("./game");

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/play", indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};

var currentGame =  new Game();

wss.on("connection", function connection(ws){  
    let con  = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame; 
});