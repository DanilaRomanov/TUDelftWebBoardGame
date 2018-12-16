function GameState(socket){
    this.playerType = null;
    this.prepReady = false;
    this.shipsPlaced = 0;
    
    
    this.attack = function(e){
        
    }
    this.setPlayerType = function(player){
        this.playerType = player;
    }
    this.getPlayerType = function(player){
        return this.playerType;
    }
    this.getprepReady = function(player){
        return prepReady;
    }
    
    this.readyUp = function(){
        var newMsg = JSON.stringify(["ready",playerType]);
        socket.send(newMsg);
    }
    this.startGame = function(){
        playerTeam.enemyBoard.addEventListener("click", move, false);

    }
    this.move = function(e){
        var cellIndex = getCell(e);
        var parts = cellIndex.split(" ");
        var cell = e.target || window.event.srcElement;
    
        x = parts[0];
        y = parts[1];
        var newMove = JSON.stringify(["move", parts[0],parts[1]]);
        socket.send(newMove);
        


    }
    this.update = function(x,y){
        var board = playerBoard.giveBoard();
        if (board[x][y]==0){
            board[x][y]="x";
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
    this.myBoard = document.getElementsByTagName("table")[team-1];
    if (team == 2){
        this.enemyBoard = document.getElementsByTagName("table")[0];
    }
    else{
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
    this.giveBoard = function() {
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
    //Make enemy board hittable and then
    this.addAttacks = function(){
        
    }

}