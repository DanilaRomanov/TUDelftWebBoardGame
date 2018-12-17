//Set up function that runs when the document is loaded

(function setup(){
    var socket = new WebSocket("ws://localhost:3000");
    
    
    gs = new GameState(socket); //global variable no var

    socket.onmessage = function (message){
        alert("message received");
        console.log(message);
        var msg = JSON.parse(message.data);
        console.log(msg);
        //msg[0] has type of message such as move
        //msg[1] has the contents of the message
        if (msg.type=="move"){

        }
        else if (msg.type=="playerType"){
           
            gs.setPlayerType(msg.data[0]);
            if(msg.data[0]=="1"){
                
                playerTeam = new team(1);
                playerArray = playerTeam.getBoard();
                playerTeam.addEvent();
            }
            if (msg.data[0]=="2"){
                playerTeam = new team(2);
                playerArray = playerTeam.getBoard();
                playerTeam.addEvent();
                
            }
        }
        else if(msg.type=="ready"){
            gs.startGame();
        }
        else if(msg.type=="newMove"){
            gs.update(msg.data[1],msg.data[0]); 
            //switched around, because arrays are down then across
        }
        //Receive response on if the attack was hit or not
        else if(msg.type=="destroyed"){
            playerTeam.board[msg.data[1],msg.data[0]] == "x";
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'red');
            $("#battleshipTeam1").css("text-decoration", "line-through");
            alert("An enemy ship has been destroyed");
            this.playerTurn = true;
        }
        else if(msg.type=="hit"){
            playerTeam.board[msg.data[1],msg.data[0]] == "x";
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'red');
            this.playerTurn = true;
        }
        else if(msg.type=="miss"){
            //array is (y)(x)
            playerTeam.board[msg.data[1],msg.data[0]] == "o";
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'gray');
            this.playerTurn = true;
        }
        else if(msg.type=="winner"){
            alert("The winner is " + msg.data[0]);
        }
        
    }
    socket.onopen = function(){
        
        alert("open");
    }
    socket.onclose = function(){
        alert("close");
    }
    socket.onerror = function(){  
        alert("socket error");
    }
})();



//Functions and not objects
function readyUp() {

    if (gs.shipsPlaced != 3) {
        alert("You have not placed all of your ships yet!");
    }
    else{
        //Needs something to tell the user to wait for the other player
        //which is then hidden in gs.startGame()
        
        document.getElementById("startBtn").style.visibility = "hidden";
        document.getElementById("shipMenu").style.visibility = "hidden";

        team1Board.removeEventListener("click", getCell, false);
        team1Board.removeEventListener("click", giveShips, false);
        gs.readyUp();
        
    } 

}
function move(e){
    gs.move(e);
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


battleshipPlaced = false;
function validBattleship() {
    var errorCheck = false;
    if (battleshipPlaced == false) {
        for (var a = -3; a <=3; a++) {

            if (currentAngle == 1) {
                if (typeof playerArray[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof playerArray[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That battleship cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
            

            
            
        }

        if (errorCheck == false) {
            spawnBattleship();
        }

    } else {
        alert("This battleship has already been placed!");
    }
}

function spawnBattleship() {
    if (currentAngle == 1){
        for (var i = -3; i <= 3; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
            playerArray[currentCellY][(parseInt(currentCellX)+i)] = "b1";
        }
        battleshipPlaced = true;
        gs.shipsPlaced++;
    }
    else{
        for (var i = -3; i <= 3; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
            playerArray[(parseInt(currentCellY)+i)][currentCellX] = "b1";
        }
        battleshipPlaced=true;
        gs.shipsPlaced++;
    } 
}
var cruiserPlaced = false;
function validCruiser() {
    var errorCheck = false;
    if (cruiserPlaced == false) {
        for (var a = -2; a <=2; a++) {

            if (currentAngle == 1) {
                if (typeof playerArray[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof playerArray[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That cruiser cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
    
            
            
        }

        if (errorCheck == false) {
            spawnCruiser();
        }

    } else {
        alert("This battleship has already been placed!");
    }
}

function spawnCruiser() {
    if (currentAngle == 1){
        for (var i = -2; i <= 2; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
            playerArray[currentCellY][(parseInt(currentCellX)+i)] = "c1";
        }
        cruiserPlaced = true;
        gs.shipsPlaced++;
    }
    else{
        for (var i = -2; i <= 2; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
            playerArray[(parseInt(currentCellY)+i)][currentCellX] = "c1";
        }
        cruiserPlaced=true;
        gs.shipsPlaced++;
    } 
}

// ==============================================================================================================================================================================================================================

var destroyerPlaced = false;
function validDestroyer() {
    var errorCheck = false;
    if (destroyerPlaced == false) {
        for (var a = -1; a <= 1; a++) {

            if (currentAngle == 1) {
                if (typeof playerArray[parseInt(currentCellY)][(parseInt(currentCellX)+a)] == "undefined" && currentAngle == 1) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[currentCellY][(parseInt(currentCellX)+a)] != 0) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
                }
                
            } else if (currentAngle == -1) {
                if (typeof playerArray[(parseInt(currentCellY)+a)][currentCellX] == "undefined" && currentAngle == 1) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
    
                } else if (playerArray[(parseInt(currentCellY)+a)][currentCellX] != 0) {
                    alert("That destroyer cannot be placed there!");
                    errorCheck = true;
                    break;
                }
            }
    
            
            
        }

        if (errorCheck == false) {
            spawnDestroyer();
        }

    } else {
        alert("This destroyer has already been placed!");
    }
}

function spawnDestroyer() {
    if (currentAngle == 1){
        for (var i = -1; i <= 1; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[currentCellY].getElementsByTagName("td")[(parseInt(currentCellX)+i)].style.backgroundColor = "purple";
            playerArray[currentCellY][(parseInt(currentCellX)+i)] = "d1";
        }
        destroyerPlaced = true;
        gs.shipsPlaced++;
    }
    else{
        for (var i = -1; i <= 1; i++) {
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundImage = "none";
            playerTeam.myBoard.getElementsByTagName("tr")[(parseInt(currentCellY)+i)].getElementsByTagName("td")[currentCellX].style.backgroundColor = "purple";
            playerArray[(parseInt(currentCellY)+i)][currentCellX] = "d1";
        }
        destroyerPlaced=true;
        gs.shipsPlaced++;
    } 

}
var currentAngle = 1;
function rotateShip() {
    currentAngle = (parseInt(currentAngle) * -1);
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
            gs.shipsPlaced = 0;

        }
    }
}

