function ship(type, team, size, angle, xCell, yCell) {
    this.type = type;
    this.team = team;
    this.size = size;
    this.angle = angle;
    this.xCell = xCell;
    this.yCell = yCell;
}

// TEAM 1 SHIPS
var battleship1 = new ship("battleship", 1, 7, 1, 5, 5);
var cruiser1 = new ship("cruiser", 1, 5, 1, 5, 5);
var destroyer1 = new ship("destroyer", 1, 3, 1, 5, 5);


// TEAM 2 SHIPS
var battleship2 = new ship("battleship", 2, 7, 0, 0, 0);
var cruiser2 = new ship("cruiser", 2, 5, 0, 0, 0);
var destroyer2 = new ship("destroyer", 2, 3, 0, 0, 0);

function chooseTeam() {
    document.getElementsByTagName("h1")[0].style.visibility = "hidden";
    document.getElementById("team1_Btn").style.visibility = "hidden";
    document.getElementById("team2_Btn").style.visibility = "hidden";
}

// INITIALIZE ARRAY
function teamArray(gameID, team) {
    this.gameID = gameID;
    this.team = team;

    for (x = 0; x < 20; x++) {
        this[x] = new Array(9).fill(1, 0, 9);
    }
}

var team2Array =       [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, "b1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

var team1Array =       [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


var team1Board = document.getElementsByTagName("table")[1];

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

    if (team1Board.addEventListener) {
        team1Board.addEventListener("click", getCell, false);
    } else if (team1Board.attachEvent) {
        team1Board.attachEvent("onclick", getCell);
    }

// MENU CLICK
var shipMenu = document.getElementById("shipMenu");
team1Board.addEventListener("click", giveShips, false);
team1Board.addEventListener("dblclick",rotate,false);
var showShipMenu = false;

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


function rotate(e){
    if (playerBoardArray[parseInt(currentCellY)][(parseInt(currentCellX)+1)] == 1 ){
        
    }

}

// SHIPS SPAWNER
var currentAngle = 1;
function rotateShip() {
    currentAngle = (parseInt(currentAngle) * -1);
}

var ship = function (type, rotate, size){
    
    this.getCell = function () {
        return this.cell;
    }
    this.canRotate = function () {
        return this.rotate;
    }
    this.hit = function () {
        size--;
    }
    
    this.rotateShip = function () {
        if (this.canRotate){
            currentAngle = (parseInt(currentAngle) * -1);
        }
    }
}


var battleshipPlaced = false;
function spawnBattleship() {

    /*
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
            // var battleship = new ship("battleship",rotate, 7,)
            
        }
        */
    
    if (battleshipPlaced == false) {
        for (var a = -3, b = 3; a = b; a++, b--) {
            if ((typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) || (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == "undefined"  && currentAngle == 1)) {
                alert("That battleship cannot be placed there!");
                break;
                //Instead of checking for b1, check for not 0                                                                                
            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                // alert("A ship is already placed at that location!");
                break;

            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) {

                for (var i = -3; i <= 3; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    
                    team1Array[currentCellY][(parseInt(currentCellX)+i)] = "b" + player.getPlayerNumber;
                }

                battleship1.xCell = currentCellX;
                battleship1.yCell = currentCellY;
                battleshipPlaced = true;


            } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

                for (var i = -3; i <= 3; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                    team1Array[(parseInt(currentCellY)+i)][currentCellX] = "b1";
                }

                battleship1.xCell = currentCellX;
                battleship1.yCell = currentCellY;
                battleshipPlaced = true;
            }
        } 
        
    } else {
        alert("This battleship has already been placed!");
    }
          
}



var cruiserPlaced = false;
function spawnCruiser() {

    if (cruiserPlaced == false) {
        for (var a = -2, b = 2; a = b; a++, b--) {
            if ((typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) || (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == "undefined"  && currentAngle == 1)) {
                alert("That battleship cannot be placed there!");
                break;

            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "b1" ||
                       team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "c1" ||
                       team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "d1") {
                // alert("A ship is already placed at that location!");
                break;

            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) {

                for (var i = -2; i <= 2; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    team1Array[currentCellY][(parseInt(currentCellX)+i)] = "c1";
                }

                cruiser1.xCell = currentCellX;
                cruiser1.yCell = currentCellY;
                cruiserPlaced = true;


            } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

                for (var i = -2; i <= 2; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                    team1Array[(parseInt(currentCellY)+i)][currentCellX] = "c1";
                }

                cruiser1.xCell = currentCellX;
                cruiser1.yCell = currentCellY;
                cruiserPlaced = true;
            }
        } 
    } else {
        alert("This battleship has already been placed!");
    }    
} 

var destroyerPlaced = false;

function spawnDestroyer() {
    
    if (destroyerPlaced == false) {
        for (var a = -1, b = 1; a = b; a++, b--) {
            if ((typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) || (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)-b)] == "undefined"  && currentAngle == 1)) {
                alert("That battleship cannot be placed there!");
                break;

            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "b1" ||
                       team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "c1" ||
                       team1Array[currentCellY][(parseInt(currentCellX)+a)] == "b1" || team1Array[currentCellY][(parseInt(currentCellX)-b)] == "d1") {
                // alert("A ship is already placed at that location!");
                break;

            } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) {

                for (var i = -1; i <= 1; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                    team1Array[currentCellY][(parseInt(currentCellX)+i)] = "d1";
                }

                destroyer1.xCell = currentCellX;
                destroyer1.yCell = currentCellY;
                destroyerPlaced = true;


            } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

                for (var i = -1; i <= 1; i++) {
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                    document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                    team1Array[(parseInt(currentCellY)+i)][currentCellX] = "d1";
                }

                destroyer1.xCell = currentCellX;
                destroyer1.yCell = currentCellY;
                destroyerPlaced = true;
            }
        } 
    } else {
        alert("This battleship has already been placed!");
    }      
} 

function reset() {
    for (var x = 0; x < team1Array.length; x++) {
        for (var y = 0; y < team1Array[x].length; y++) {
            team1Array[x][y] = 0;

            document.getElementById("team1Board").getElementsByTagName("tr")[x].getElementsByTagName("td")[y].style.backgroundImage = "url(https://i.gifer.com/GPyH.gif)";
            document.getElementById("team1Board").getElementsByTagName("tr")[x].getElementsByTagName("td")[y].style.backgroundColor = "none";

            battleshipPlaced = false;
            cruiserPlaced = false;
            destroyerPlaced = false;
        }
    }
}



function hit(e) {
    var cellIndex = getCell(e);
    var parts = cellIndex.split(" ");
    var cell = e.target || window.event.srcElement;

    x = parts[0];
    y = parts[1];

    if (team2Array[x][y] == 5) {
        
    } else if (team2Array[x][y] == "b1") {
        battleship1.size -= 1;
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'red');

        if (battleship1.size == 0) {
            $("#battleshipTeam1").css("text-decoration", "line-through");
            alert("The battleship of team " + battleship1.team + " has been destroyed!")
        }

    } else if (team2Array[x][y] == "c1") {
        cruiser1.size -= 1;
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'red');

        if (cruiser1.size == 0) {
            $("#cruiserTeam1").css("text-decoration", "line-through");
            alert("The cruiser of team " + battleship1.team + " has been destroyed!")
        }

    } else if (team2Array[x][y] == "d1") {
        destroyer1.size -= 1;
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'red'); 

        if (destroyer1.size == 0) {
            $("#destroyerTeam1").css("text-decoration", "line-through");
            alert("The destroyer of team " + battleship1.team + " has been destroyed!")
        }

    } else {
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'gray');
    }
}

if ( team2Board.addEventListener ) {
    team2Board.addEventListener("click", hit, false);
} else if ( team2Board.attachEvent ) {
    team2Board.attachEvent("onclick", hit);
}


//EVENT LISTENERS (MISC)
document.getElementById("battleshipBtn").addEventListener("mouseover", function() {
    if (currentAngle == 1) {
        for (var i = -3; i <= 3; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "0 0 10px #000000 inset";
        }
    } else {
        for (var i = -3; i <= 3; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "0 0 10px #000000 inset";
        }
    }
    
})

document.getElementById("battleshipBtn").addEventListener("mouseleave", function() {
    if (currentAngle == 1) {
        for (var i = -3; i <= 3; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "none";
        }
    } else {
        for (var i = -3; i <= 3; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "none";
        }
    }
})

document.getElementById("cruiserBtn").addEventListener("mouseover", function() {
    if (currentAngle == 1) {
        for (var i = -2; i <= 2; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "0 0 10px #000000 inset";
        }
    } else {
        for (var i = -2; i <= 2; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "0 0 10px #000000 inset";
        }
    }
    
})

document.getElementById("cruiserBtn").addEventListener("mouseleave", function() {
    if (currentAngle == 1) {
        for (var i = -2; i <= 2; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "none";
        }
    } else {
        for (var i = -2; i <= 2; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "none";
        }
    }
})

document.getElementById("destroyerBtn").addEventListener("mouseover", function() {
    if (currentAngle == 1) {
        for (var i = -1; i <= 1; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "0 0 10px #000000 inset";
        }
    } else {
        for (var i = -1; i <= 1; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "0 0 10px #000000 inset";
        }
    }
    
})

document.getElementById("destroyerBtn").addEventListener("mouseleave", function() {
    if (currentAngle == 1) {
        for (var i = -1; i <= 1; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.boxShadow = "none";
        }
    } else {
        for (var i = -1; i <= 1; i++) {
            document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.boxShadow = "none";
        }
    }
})



// DRAG AND DROP 
/*
var currentCell = 0;
var id = 0;
document.getElementById("team1Board").addEventListener("dragover", dragOver, false);
document.getElementById("team1Board").addEventListener("dragleave", dragLeave, false);
document.getElementById("team1Board").addEventListener("drop", onDrop, false);
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

