var game = function(gameID){
    this.player1 = null;
    this.player2 = null;
    //Players are then randomly assorted in to teams. Maybe.
    this.id = gameID;
    this.gameState = "0 Joined";
    this.player1Ready = false;
    this.player2Ready = false;

};

/* 
States 
0,1,2,3,4 Joined, Aborted.
*/

game.prototype.abort = function(){
    this.gameState = "Aborted";
}
game.prototype.isFull = function(){
    return (this.gameState == "2 Joined");
}
game.prototype.addPlayer = function(p){
    if(this.gameState != "2 Joined" || this.gameState != "Aborted"){
        //Add player
        if (this.player1==null){
            this.Player1 = p;
            this.gameState = "1 Joined";
            return "1"; //Team 1
        }
        else if (this.player2 == null){
            this.player2 = p;
            this.gameState = "2 Joined";
            return "2"; //Team 2
        }
        
    }
    else{
        alert("Something went wrong. Game is full.");
        return null;
    }
    
}
game.prototype.playerReady = function(player){
    if(player==1){
        this.player1Ready = true;
    }
    if(player==2){
        this.player2Ready = true;
    }
}

game.prototype.bothPlayersReady = function(){
    return (player1Ready && player2Ready);
}