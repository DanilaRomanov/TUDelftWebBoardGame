function GameState(socket){
    this.playerType = null;
    this.prepReady = false;
    this.shipsPlaced = 0;
    this.shipsLeft = 3;
    this.playerTurn = false;
    
    
    this.setPlayerType = function(player){
        console.log(player);
        this.playerType = player;
    }
    this.getPlayerType = function(player){
        return this.playerType;
    }
    this.getprepReady = function(player){
        return prepReady;
    }
    
    this.readyUp = function(){
        //var newMsg = JSON.stringify(["ready",playerType]);
        console.log(this.playerType);
        var newMsg = '{"type":"ready","data":{"0":'+this.playerType+'}}';
        socket.send(newMsg);
    }
    this.startGame = function(){
        alert("Start phase 2");
        if (this.playerType==1){
            this.playerTurn = true;
        }
        playerTeam.enemyBoard.addEventListener("click", move, false);
        var battleship = new ship(7);
        var cruiser = new ship(5);
        var destroyer = new ship(3);
        

    }
    this.move = function(e){
        if (this.playerTurn){
            console.log("move");
            var cellIndex = getCell(e);
            var parts = cellIndex.split(" ");
            var cell = e.target || window.event.srcElement;
    
            x = parts[0];
            y = parts[1];

            if (playerTeam.board2[x][y]=="o" || playerTeam.board2[x][y]=="x"){
                alert("this has already been attacked!");
            }
            else{
                this.playerTurn = false;
                var newMove = '{"type":"move","data":{"0":"'+parts[0]+'","1":"'+parts[1]+'"}}';
                socket.send(newMove);
            }
        }
        else{
            alert("It is not your turn");
        }
        
        


    }

    this.update = function(x,y){
        //Update the OP's board with the opponent's turn
        var board = playerBoard.giveBoard();
        if (board[x][y]==0){
            board[x][y]="o";
            //var newMsg = JSON.stringify(["miss",x,y]);
            var newMsg = '{"type":"miss","data":{"0":"'+x+'","1":"'+y+'"}}';
        }
        else if (board[x][y]=="o"){
            alert("Error, same place has been attacked");
        }
        else{
            alert("Your ship has been hit!");
            if(board[x][y]=="b1"){
                battleship.hit();
                if(battleship.size==0){
                    this.shipsLeft--;
                    if(this.shipsLeft==0){
                        //var newMsg = JSON.stringify(["lost",this.playerType]);
                        var newMsg = '{"type":"lost","data":{"0":'+this.playerType+' }}';
                        socket.send(newMsg);
                    }
                    //var newMsg = JSON.stringify(["destroyed","battleship",x,y]);
                    var newMsg = '{"type":"destroyed","data":{"0":"battleship","1":"'+x+'","2":"'+y+'"}}';
                    socket.send(newMsg);
                }
                else{
                    //var newMsg = JSON.stringify(["hit",x,y]);
                    var newMsg = '{"type":"hit","data":{"0":"'+x+'","1":"'+y+'"}}';
                    socket.send(newMsg);
                }
            }
            else if(board[x][y]=="c1"){
                cruiser.hit();
                if(cruiser.size==0){
                    this.shipsLeft--;
                    if(this.shipsLeft==0){
                        //var newMsg = JSON.stringify(["lost",this.playerType])
                        var newMsg = '{"type":"lost","data":{"0":'+this.playerType+' }}';
                        socket.send(newMsg);
                    }
                    else{
                        //var newMsg = JSON.stringify(["destroyed","cruiser",x,y]);
                        var newMsg = '{"type":"destroyed","data":{"0":"cruiser","1":"'+x+'","2":"'+y+'"}}';

                        socket.send(newMsg);
                    }
                }
                else{
                    //var newMsg = JSON.stringify(["hit",x,y]);
                    var newMsg = '{"type":"hit","data":{"0":"'+x+'","1":"'+y+'"}}';
                    socket.send(newMsg);

                }
            }
            else{
                destroyer.hit();
                if(destroyer.size==0){
                    this.shipsLeft--;
                    if(this.shipsLeft==0){
                        //var newMsg = JSON.stringify(["lost",this.playerType])
                        var newMsg = '{"type":"lost","data":{"0":'+this.playerType+' }}';
                        socket.send(newMsg);
                    }
                    else{
                        //var newMsg = JSON.stringify(["destroyed","destroyer",x,y]);
                        var newMsg = '{"type":"destroyed","data":{"0":"destroyer","1":"'+x+'","2":"'+y+'"}}';
                        socket.send(newMsg);
                    }
                }
                else{
                    //var newMsg = JSON.stringify(["hit",x,y]);
                    var newMsg = '{"type":"hit","data":{"0":"'+x+'","1":"'+y+'"}}';
                    socket.send(newMsg);

                }
                this.playerTurn = true;
                alert("You can make your turn now!");

            }
        }
    }
}
//----------------------------------
function ship(size) {
    this.size = size;
    

    this.hit = function() {
        this.size--;
    }
}
//--------------------------------
function team(team) {
    this.team = team;
    this.ready = null;
    if (team == 1) {
        this.myBoard = document.getElementsByTagName("table")[1];
    } else if (team == 2) {
        this.myBoard = document.getElementsByTagName("table")[0];
    }

    if (team == 2){
        this.enemyBoard = document.getElementsByTagName("table")[0];
    } else{
        this.enemyBoard = document.getElementsByTagName("table")[1];
    }
    
    this.board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    
    //Enemy board from the pov of the player
    this.board2 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    
    //Make the array
    this.getBoard = function() {
        return this.board;
    }
    this.setBoard = function(newBoard){
        this.board = newBoard;
    }
    //Allow ships to be placed
    this.addEvent = function(){
        this.myBoard.addEventListener("click", giveShips, false);
    }
    //Remove events once setup is finished
    this.removeEvent = function(){
        this.myBoard.removeEventListener();
    }
    

}
