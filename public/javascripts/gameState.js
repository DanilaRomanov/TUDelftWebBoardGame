function GameState(team1Board, team2Board, socket){
    this.playerType = null;
    
    this.attack = function(e){
        
    }
    this.setPlayerType = function(player){
        this.playerType = player;
    }
    this.getPlayerType = function(player){
        return this.playerType;
    }
}