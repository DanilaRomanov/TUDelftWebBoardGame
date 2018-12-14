//Set up function that runs when the document is loaded

(function setup(){
    var socket = new WebSocket("ws://localhost:3000");

    var team1 = new team(1);
    var team2 = new team(2);

    var team1Array = team1.setBoard();
    var team2Array = team2.setBoard();
    //Ship placement phase
    team1.addEvent(); 
    team2.addEvent();
    //make game objects, probably bad code
    var gs = new GameState(team1Array, team2Array, socket);

    socket.onmessage = function (message){
        var msg = JSON.parse(message);
        //msg[0] has type of message such as move
        //msg[1] has the contents of the message
        if (msg[0]=="move"){

        }
        if (msg[0]=="playerType"){
            gs.setPlayerType(msg[1]);
            if(msg[1]=="A"){

            }
            if (msg[1]=="B"){

            }
        }
    }
})

// INITIALIZE ARRAY
function team(team) {
    this.team = team;
    this.board = null;
    this.myBoard = document.getElementsByTagName("table")[team-1];
    
    //Make the array
    this.setBoard = function() {
        this.board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

        return this.board;
    }
    //Allow ships to be placed
    this.addEvent = function(){
        this.htmlBoard.addEventListener("click", giveShips, false);
    }
    //Remove events once setup is finished
    this.removeEvent = function(){
        this.htmlBoard.removeEventListener();
    }
    //Make enemy board hittable and then
    this.addAttacks = function(){
        if (team==2){
            document.getElementsByTagName("table")[0].addEventListener("click",gs.attack(),false);
        }
    }

}

function chooseTeam() {
    document.getElementsByTagName("h1")[0].style.visibility = "hidden";
    document.getElementById("team1_Btn").style.visibility = "hidden";
    document.getElementById("team2_Btn").style.visibility = "hidden";
}

var team1Board = document.getElementsByTagName("table")[1];
var team2Board = document.getElementsByTagName("table")[0];


var shipsPlaced = 0;
function startGame() {

    if (shipsPlaced >= 3) {

        randomizeBattleship();
        randomizeCruiser();
        randomizeDestroyer();
    
        document.getElementById("startBtn").style.visibility = "hidden";
        document.getElementById("shipMenu").style.visibility = "hidden";
    
        team2Board.addEventListener("click", hit, false);

        team1Board.removeEventListener("click", getCell, false);
        team1Board.removeEventListener("click", giveShips, false);

        // TEAM 1 SHIPS
        var battleship1 = new ship(7);
        var cruiser1 = new ship(5);
        var destroyer1 = new ship(3);

        // TEAM 2 SHIPS
        var battleship2 = new ship(7);
        var cruiser2 = new ship(5);
        var destroyer2 = new ship(3);

        for (x = 0; x < team2Array.length; x++) {
            for (y = 0; y < team2Array[x].length; y++) {
                console.log(team2Array[x][y]);
            }
        }

    } else {
        alert("Not enough ships have been placed!");
    } 

}

function restartGame() {
    team1Board.addEventListener("click", getCell, false);
    team1Board.addEventListener("click", giveShips, false);
    team2Board.removeEventListener("click", hit, false);

    for (x = 0; x < team2Array.length; x++) {
        for (y = 0; y < team2Array[x].length; y++) {
            team1Array[x][y] = 0;
            team2Array[x][y] = 0;
            document.getElementById("team1Board").getElementsByTagName("tr")[y].getElementsByTagName("td")[x].style.backgroundColor = "none";
            document.getElementById("team1Board").getElementsByTagName("tr")[y].getElementsByTagName("td")[x].style.backgroundImage = "url(https://i.gifer.com/GPyH.gif)";
            
            document.getElementById("team2Board").getElementsByTagName("tr")[y].getElementsByTagName("td")[x].style.backgroundColor = "none";
            document.getElementById("team2Board").getElementsByTagName("tr")[y].getElementsByTagName("td")[x].style.backgroundImage = "url(https://i.gifer.com/GPyH.gif)";
            
        }
    }

}


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

// SHIP CONSTRUCTOR
function ship(size) {
    this.size = size;
}

// SHIPS SPAWNER
var currentAngle = 1;
function rotateShip() {
    currentAngle = (parseInt(currentAngle) * -1);
}

var battleshipPlaced = false;
function validBattleship() {
    var errorCheck = false;
    if (battleshipPlaced == false && errorCheck == false) {
        for (var a = -3; a <=3; a++) {

            if (currentAngle == 1) {
                if (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof team1Array[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
            

            errorCheck = false;
            
        }

        if (errorCheck == false) {
            spawnBattleship();
        }

    } else {
        alert("This battleship has already been placed!");
    }
}


function spawnBattleship() {
    for (var a = -3, b = 3; a = b; a++, b--) {
        if (team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) {

            for (var i = -3; i <= 3; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                team1Array[currentCellY][(parseInt(currentCellX)+i)] = "b1";
            }

            battleship1.xCell = currentCellX;
            battleship1.yCell = currentCellY;
            battleshipPlaced = true;
            shipsPlaced++;


        } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

            for (var i = -3; i <= 3; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                team1Array[(parseInt(currentCellY)+i)][currentCellX] = "b1";
            }

            battleship1.xCell = currentCellX;
            battleship1.yCell = currentCellY;
            battleshipPlaced = true;
            shipsPlaced++;

        }
    } 
}

// ==============================================================================================================================================================================================================================

var cruiserPlaced = false;
function validCruiser() {
    var errorCheck = false;
    if (cruiserPlaced == false && errorCheck == false) {
        for (var a = -2; a <=2; a++) {

            if (currentAngle == 1) {
                if (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof team1Array[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
    
            errorCheck = false;
            
        }

        if (errorCheck == false) {
            spawnCruiser();
        }

    } else {
        alert("This battleship has already been placed!");
    }
}

function spawnCruiser() {
    for (var a = -2, b = 2; a = b; a++, b--) {
        if ((team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) && (team1Array[currentCellY][(parseInt(currentCellX)-b)] == 0 && currentAngle == 1)) {

            for (var i = -2; i <= 2; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                team1Array[currentCellY][(parseInt(currentCellX)+i)] = "c1";
            }

            cruiserPlaced = true;
            shipsPlaced++;


        } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

            for (var i = -2; i <= 2; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                team1Array[(parseInt(currentCellY)+i)][currentCellX] = "c1";
            }

            cruiserPlaced = true;
            shipsPlaced++;

        }
    } 
}

// ==============================================================================================================================================================================================================================

var destroyerPlaced = false;
function validDestroyer() {
    var errorCheck = false;
    if (destroyerPlaced == false && errorCheck == false) {
        for (var a = -1; a <= 1; a++) {

            if (currentAngle == 1) {
                if (typeof team1Array[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof team1Array[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (team1Array[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
    
            errorCheck = false;
            
        }

        if (errorCheck == false) {
            spawnDestroyer();
        }

    } else {
        alert("This destroyer has already been placed!");
    }
}

function spawnDestroyer() {
    for (var a = -1, b = 1; a = b; a++, b--) {
        if ((team1Array[currentCellY][(parseInt(currentCellX)+a)] == 0 && currentAngle == 1) && (team1Array[currentCellY][(parseInt(currentCellX)-b)] == 0 && currentAngle == 1)) {

            for (var i = -1; i <= 1; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
                team1Array[currentCellY][(parseInt(currentCellX)+i)] = "c1";
            }

            destroyerPlaced = true;
            shipsPlaced++;


        } else if ((team1Array[(parseInt(currentCellY)+a)][(parseInt(currentCellX))] == 0 && currentAngle == -1) && (team1Array[(parseInt(currentCellY)-b)][(parseInt(currentCellX))] == 0 && currentAngle == -1)) {

            for (var i = -1; i <= 1; i++) {
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
                document.getElementById("team1Board").getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
                team1Array[(parseInt(currentCellY)+i)][currentCellX] = "c1";
            }

            destroyerPlaced = true;
            shipsPlaced++;

        }
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
            shipsPlaced = 0;

        }
    }
}


var team1ShipsDestroyed = 0;
function hit(e) {
    if (team1ShipsDestroyed == 3) {
        team1Board.removeEventListener("click", hit, false);
        document.getElementById("winnerScreen").style.visibility = "visible";

    } else {
        var cellIndex = getCell(e);
        var parts = cellIndex.split(" ");
        var cell = e.target || window.event.srcElement;
    
        x = parts[0];
        y = parts[1];
    
        if (team2Array[x][y] == -1) {

        } else if (team2Array[x][y] == "b2") {
            battleship2.size--;
            team2Array[x][y] = -1;
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'red');
    
            if (battleship2.size == 0) {
                team1ShipsDestroyed++;
    
                $("#battleshipTeam1").css("text-decoration", "line-through");
                alert("The enemy battleship has been destroyed");
            }

    
        } else if (team2Array[x][y] == "c2") {
            cruiser2.size--;
            team2Array[x][y] = -1;
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'red');
    
            if (cruiser2.size == 0) {
                team1ShipsDestroyed++;
    
                $("#cruiserTeam1").css("text-decoration", "line-through");
                alert("The enemy cruiser has been destroyed");
            }

    
        } else if (team2Array[x][y] == "d2") {
            destroyer2.size--;
            team2Array[x][y] = -1;
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'red'); 
    
            if (destroyer2.size == 0) {
                team1ShipsDestroyed++;
    
                $("#destroyerTeam1").css("text-decoration", "line-through");
                alert("The enemy destroyer has been destroyed!")
            }

    
        } else {
            team2Array[x][y] = -1;
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'gray');
        }
    

        
    }
    
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
