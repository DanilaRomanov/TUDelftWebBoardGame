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
var connectionID = 0;
wss.on("connection", function connection(ws){  
    let con  = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame; 
    var sendPlayer = JSON.stringify(["playerType",playerType]);
    con.send(sendPlayer);
    con.on("message", function incoming(message){
         let msg = JSON.parse(message);
         console.log(msg);
         if (msg[0]=="ready"){
             currentGame.playerReady(msg[1]);
             if(currentGame.bothPlayersReady()){
                var newMsg = JSON.stringify(["ready",true]);
                //send message to the 2nd connected player
                con.send(newMsg);
                //send message to the 1st connected player
                if (currentGame.player1 == con){
                    currentGame.playerB.send(newMsg);
                }
                else{
                    currentGame.playerA.send(newMsg);
                }

             }
             
         }
         //send move to other player
         if (msg[0]=="move"){
             var responseMsg = JSON.stringify("newMove",msg[1],msg[2]);
             //send to the other player
             if (currentGame.player1 == con){
                currentGame.playerB.send(responseMsg);
            }
            else{
                currentGame.playerA.send(responseMsg);
            }
         }
    })
});