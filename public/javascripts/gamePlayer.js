var team1Board = document.getElementsByTagName("table")[1];
var team2Board = document.getElementsByTagName("table")[0];
var currentCellX;
var currentCellY;



function player(team, playerNumber, board) {
    this.getCell = function(e) {
        var cell = e.target || window.event.srcElement;
        if ( cell.cellIndex >= 0 ) {
            document.getElementById("cellIndexX").innerHTML = cell.cellIndex;
            document.getElementById("cellIndexY").innerHTML = cell.parentNode.rowIndex;
            currentCellX = cell.cellIndex;
            currentCellY = cell.parentNode.rowIndex;
            return currentCellY + " " + currentCellX;
        }
    }
}



/* PLAYERS AS OBJECTS
function player(team, playerNumber, board) {
    this.team = team;
    this.playerNumber = playerNumber;
    this.board = board;
}

player1 = new player(1, 1, "team1Board");
player2 = new player(1, 2, "team1Board");
player3 = new player(2, 3, "team2Board");
player4 = new player(2, 4, "team2Board");
*/ 
