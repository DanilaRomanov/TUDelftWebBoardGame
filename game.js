var game = function(gameID){
    this.playerA = null;
    this.playerB = null;
    this.playerC = null;
    this.playerD = null;
    //Players are then randomly assorted in to teams.
    this.id = gameID;
    this.gameState = "0 Joined";

};

/* 
States 
0,1,2,3,4 Joined, Aborted.
*/

game.prototype.abort = function(){
    this.gameState = "Aborted";
}
game.prototype.isFull = function(){
    return (this.gameState == "4 Joined");
}
game.prototype.addPlayer = function(p){
    if(this.gameState != "4 Joined" || this.gameState != "Aborted"){
        //Add player
        if (this.playerA==null){
            this.PlayerA = p;
            this.gameState = "1 Joined";
            return "A";
        }
        else if (this.playerB == null){
            this.playerB = p;
            this.gameState = "2 Joined";
            return "B";
        }
        else if (this.playerC == null){
            this.playerC = p;
            this.gameState = "3 Joined";
            return "C";
        }
        else{
            this.playerD = p;
            this.gameState = "4 Joined";
            return "D";
        }
        
    }
    else{
        alert("Something went wrong");
        return null;
    }
    
}