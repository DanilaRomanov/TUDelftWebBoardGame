function ship(id, type, team, xCell, yCell) {
    this.type = type;
    this.team = team;
    this.xCell = xCell;
    this.yCell = yCell;
}
/*
// TEAM 1 SHIPS
var battleship1 = new ship({id: "battleship2", type: "battleship", team: 1, xCell: 0, yCell: 0});
var cruiser1 = new ship({id: "cruiser2", type: "cruiser", team: 1, xCell: 0, yCell: 0});
var destroyer1 = new ship({id: "destroyer11", type: "destroyer", team: 1, xCell: 0, yCell: 0});

// TEAM 2 SHIPS
var battleship2 = new ship({id: "battleship2", type: "battleship", team: 1, xCell: 0, yCell: 0});
var cruiser2 = new ship({id: "cruiser2", type: "cruiser", team: 1, xCell: 0, yCell: 0});
var destroyer2 = new ship({id: "destroyer11", type: "destroyer", team: 1, xCell: 0, yCell: 0});
*/

var ship = function (type, rotate, size, cell){
    
    this.getCell = function () {
        return this.cell;
    }
    this.canRotate = function () {
        return this.rotate;
    }

}
$('#shipMenu').on('dblclick', function() {
    if (this.canRotate){

    }
    $('#battleship').css('transform','rotate(' + angle1 + 'deg)');

    if (((angle1 / 90) % 2) == 1) {
        $("#battleship").css('margin', '4% -23% 23% 4%');
        angle1 = 90;
    } else {
        $("#battleship").css('margin', '4% 0% 0% 4%');
        angle1 = 0;
    }
});

//
var enemyBoardArray =  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

var playerBoardArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


var playerBoard = document.getElementsByTagName("table")[1];

//Gives cell coordinates from html
var currentCellX;
var currentCellY;
function getCell(e) {
    var cell = e.target || window.event.srcElement;
    if ( cell.cellIndex >= 0 )
        document.getElementById("cellIndexX").innerHTML = cell.cellIndex;
        document.getElementById("cellIndexY").innerHTML = cell.parentNode.rowIndex;
        currentCellX = cell.cellIndex;
        currentCellY = cell.parentNode.rowIndex;
        return currentCellY + " " + currentCellX;
    }

    if (playerBoard.addEventListener) {
        playerBoard.addEventListener("click", getCell, false);
    } else if (playerBoard.attachEvent) {
        playerBoard.attachEvent("onclick", getCell);
    }

// MENU CLICK
var shipMenu = document.getElementById("shipMenu");
playerBoard.addEventListener("click", giveShips, false);
var showShipMenu = false;

//Ship menu
function giveShips(e) {
    if (showShipMenu == false) {
        var x = e.clientX;
        var y = e.clientY;
       
        shipMenu.style.transform = "translateY(-190%)"
        shipMenu.style.left = (x - 10) + "px";   
        shipMenu.style.visibility = "visible";
        showShipMenu = true;
        
    } else if (showShipMenu == true) {

        shipMenu.style.visibility = "hidden";
        showShipMenu = false;
    }
}

var battleshipPlaced = false;
function spawnBattleship() {

    if (battleshipPlaced == false) {
        var cont = true;
        for (var i = 0; i<=3; i++){
            if(typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)+i)] == "undefined" || typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)-i)] == "undefined"){
                alert("That battleship cannot be placed there!");
                var cont = false; //Do not place ship then
            }
            else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+i)] == 1 || playerBoardArray[currentCellY][(parseInt(currentCellX)-i)] == 1) {
                alert("A ship is already placed at that location!");
                var cont = false;
        }
        if (cont = true){
            //Place ship
            var rotate = true;
            for (var i = 0; i <= 3; i++) {
                document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)-i)].style.backgroundImage = "none";
                document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)-i)].style.backgroundColor = "purple";
                playerBoardArray[currentCellY][(parseInt(currentCellX)+i)] = 1;
                playerBoardArray[currentCellY][(parseInt(currentCellX)-i)] = 1;
                if (typeof playerBoardArray[parseInt(currentCellY)+i][(parseInt(currentCell))] == "undefined" || typeof playerBoardArray[parseInt(currentCellY)-i][(parseInt(currentCellX))] == "undefined"){
                    var rotate = false;
                }
            }
            battleshipPlaced = true;
            var battleship = new ship("battleship",rotate, 7, )
            
        }

        /*
        for (var a = -3, b = 3; a = b; a++, b--) {
            if (typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" || typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == "undefined") {
                alert("That battleship cannot be placed there!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 1 || playerBoardArray[currentCellY][(parseInt(currentCellX)-b)] == 1) {
                // alert("A ship is already placed at that location!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 0) {
                for (var i = -3; i <= 3; i++) {
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    playerBoardArray[currentCellY][(parseInt(currentCellX)+i)] = 1;
                }
                //Check for rotate
                if (typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCell)+a)] == "undefined" || typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == "undefined"){

                }
                battleshipPlaced = true;
            }

        }
    } else if (battleshipPlaced == true) {
        alert("Battleship has already been placed!");
    }  
    */     
}

var cruiserPlaced = false;
function spawnCruiser() {
    if (player.team == 1) {
        
    }
    if (cruiserPlaced == false) {
        for (var a = -2, b = 2; a = b; a++, b--) {
            if (typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == 'undefined' || typeof playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == 'undefined') {
                alert("That cruiser cannot be placed there!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 1 || playerBoardArray[currentCellY][(parseInt(currentCellX)-b)] == 1) {
                // alert("A ship is already placed at that location!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 0) {
                for (var i = -2; i <= 2; i++) {
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    playerBoardArray[currentCellY][(parseInt(currentCellX)+i)] = 1;
                }
                cruiserPlaced = true;
            }

        }
    } else if (cruiserPlaced == true) {
        alert("Cruiser has already been placed!");
    }       
} 

var destroyerPlaced = false;
function spawnDestroyer() {
    
    if (destroyerPlaced == false) {
        for (var a = -1, b = 1; a = b; a++, b--) {
            if (typeof playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] === 'undefined' || typeof playerBoardArray[currentCellY][(parseInt(currentCellX)-b)] === 'undefined') {
                alert("That destroyer cannot be placed there!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 1 || playerBoardArray[currentCellY][(parseInt(currentCellX)-b)] == 1) {
                // alert("A ship is already placed at that location!");
                break;

            } else if (playerBoardArray[currentCellY][(parseInt(currentCellX)+a)] == 0) {
                for (var i = -1; i <= 1; i++) {
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("playerBoard").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    playerBoardArray[currentCellY][(parseInt(currentCellX)+i)] = 1;
                }
                destroyerPlaced = true;
            }

        }
    } else if (destroyerPlaced == true) {
        alert("Destroyer has already been placed!");
    }       
} 


function startGame() {
    
}


function hit(e) {
    var cellIndex = getCell(e);
    var parts = cellIndex.split(" ");
    var cell = e.target || window.event.srcElement;

    x = parts[0];
    y = parts[1];

    if (enemyBoardArray[x][y] == 5) {

    } else if (enemyBoardArray[x][y] == 1) {
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'red');
    } else {
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'gray');
    }
}

if ( enemyBoard.addEventListener ) {
    enemyBoard.addEventListener("click", hit, false);
} else if ( enemyBoard.attachEvent ) {
    enemyBoard.attachEvent("onclick", hit);
}


// DRAG AND DROP 
/*
var currentCell = 0;
var id = 0;
document.getElementById("playerBoard").addEventListener("dragover", dragOver, false);
document.getElementById("playerBoard").addEventListener("dragleave", dragLeave, false);
document.getElementById("playerBoard").addEventListener("drop", onDrop, false);
document.addEventListener("drop", onDrop, false);

function getCell(cell) {
    currentCell = cell;
}

function dragOver(e) {
    e.preventDefault();
    e.target.style.border = "2px dashed black";
}

function dragLeave(e) {
    e.target.style.border = "1px solid black"
}

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function onDrop(e) {
    e.preventDefault();

    $(e.target).css("background-image", "none");
    $(e.target).css("background-color", "purple");

    // e.target.append(document.getElementById(id));
}
*/
}}
