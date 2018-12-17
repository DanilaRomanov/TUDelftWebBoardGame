var express = require("express");
var http = require("http");
var websocket = require("ws");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var session = require("express-session");

var indexRouter = require("./routes/index");


var port = process.argv[2];
var app = express();

var Game = require("./game");

var server = http.createServer(app);
const wss = new websocket.Server({ server });

app.use(express.static(__dirname + "/public"));

app.get("/", indexRouter);
app.get("/play", indexRouter);

var websockets = {};
var connectionID = 0;
var currentGame =  new Game(connectionID);

app.use(cookieParser());

app.get('/splash', function(req, res){
    if(req.session.views){
        req.session.views++;
        res.cookie('name', 'cookie_name').send('<p>You have visited this webpage ' + req.session.views + ' times!</p>');
    } else {
       req.session.views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

wss.on("connection", function connection(ws){  
    console.log(ws);
    let con  = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame; 
    //var sendPlayer = JSON.stringify(["playerType",playerType]);
    var sendPlayer = '{"type":"playerType","data":{"0":'+playerType+'}}';
    con.send(sendPlayer);
    if (currentGame.isFull()){
        currentGame = new Game (gamesStarted++);
    }
    con.on("message", function incoming(message){
         let msg = JSON.parse(message);
         let players = websockets[con.id];
         console.log(msg);
         if (msg.type=="ready"){
             
             players.playerReady(msg.data[0]);
             if(players.bothPlayersReady()){
                //var newMsg = JSON.stringify(["ready",true]);
                var newMsg = '{"type":"ready"}';
                //send message to the 2nd connected player
                con.send(newMsg);
                //send message to the 1st connected player
                console.log(players.player1);
                console.log(players.player2);
                console.log(players.player1==players.player2);
                if (players.player1 == con){
                    players.player2.send(newMsg);
                }
                else{
                    players.player1.send(newMsg);
                }

             }
             
         }
         //send move to other player
         else if (msg.type=="move"){
             //var newMsg = JSON.stringify("newMove",msg[1],msg[2]);
            var newMsg = '{"type":"newMove","data":{"0":"'+msg[1]+'","1":"'+msg[2]+'"}}';
             //send to the other player
            if (players.player1 == con){
                players.player2.send(newMsg);
            }
            else{
                players.player1.send(newMsg);
            }
         }
         else if (msg.type=="destroyed" || msg.type=="hit"){
             //Forward to the other player
             if (players.player1 == con){
                players.player2.send(message);
            }
            else{
                players.player1.send(message);
            }
         }
         else if(msg.type=="lost"){
            if (msg.data[0]==1){
                var winner = 0;
            }
            else{
                var winner = 1;
            }
            //var newMsg = JSON.stringify(["winner",winner]);
            var newMsg = '{"type":"winner","data":{"0":'+winner+'}}';
            players.player2.send(newMsg);
            players.player1.send(newMsg);
            
        }
    });
    
});
server.listen(port);
