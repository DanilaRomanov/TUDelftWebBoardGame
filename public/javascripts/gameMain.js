var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];

var server = http.createServer(app);
const wss = new websocket.Server({ server });




var gameBoard = document.getElementById("board");
var rows = 20;
var columns = 18;

for (x = 0; x < rows; x++) {
    for (y = 0; y < columns; y++) {
        var tile = document.createElement("div");
        gameBoard.appendChild(tile);

        tile.id = "T(" + x + ", " + y + ")";
    }
}

function ship(tileSize, position) {
    this.tileSize = tileSize;
    this.position = tile;
}

function startGame() {
    battleship = new ship(7, T(1, 18));
    battleship.style.innerHTML = "hello";

    cruiser = new ship(5, T(2, 17));
    destroyer1 = new ship(3, T(3, 16));
    destroyer2 = new ship(3, T(3, 15));
}



// JQuery ---------------------

$(document).ready(function() {
    $("#battleship").draggable( {containment: "#board", snap: ".cellData"} );
});

$(document).ready(function() {
    $("#cruiser").draggable( {containment: "#board", snap: ".cellData"} );
});

$(document).ready(function() {
    $("#destroyer1").draggable( {containment: "#board", snap: ".cellData"} );
});

$(document).ready(function() {
    $("#destroyer2").draggable( {containment: "#board", snap: ".cellData"} );
});




var angle1 = 0;
var angle2 = 0;
var angle1 = 0;

/*

$('#battleship').on('dblclick', function() {
    angle1 += 90;
    $('#battleship').css('transform','rotate(' + angle1 + 'deg)');

    if (((angle1 / 90) % 2) == 1) {
        $("#battleship").css('margin', '4% -23% 23% 4%');
        angle1 = 90;
    } else {
        $("#battleship").css('margin', '4% 0% 0% 4%');
        angle1 = 0;
    }
});

$('#cruiser').on('dblclick', function() {
    angle2 += 90;
    $('#cruiser').css('transform','rotate(' + angle2 + 'deg)');
    
    if (((angle2 / 90) % 2) == 1) {
        $("#cruiser").css('margin', '4% -16% 15% 4%');
        angle2 = 90;
    } else {
        $("#cruiser").css('margin', '4% 0% 0% 4%');
        angle2 = 0;
    }
});

$('#destroyer1').on('dblclick', function() {
    var angle = 0;
    angle += 90;
    $('#destroyer1').css('transform','rotate(' + angle + 'deg)');

    if (((angle / 90) % 2) == 1) {
        $("#cruiser").css('margin', '4% -4% 0% 0%');
    } else {
        $("#cruiser").css('margin', '4% 0% 4% 4%');
    }
});

$('#destroyer2').on('dblclick', function() {
    angle += 90;
    $('#destroyer2').css('transform','rotate(' + angle + 'deg)');

    if (((angle / 90) % 2) == 1) {
        $("#cruiser").css('margin', '4% -4% 0% 0%');
    } else {
        $("#cruiser").css('margin', '4% 0% 4% 4%');
    }  
});

*/

var check = false;

function enableIslandCreator() {
    if (check == false) {
        check = true;
        document.getElementById("islandBtn").value = "Island Creator: ON";
    } else {
        check = false;
        document.getElementById("islandBtn").value = "Island Creator: OFF";
    }
}

var islandCount = 10;
function createIsland(cell) {

    if (check == true) {
        var islandCounter = document.getElementById("islandCounter");
        
        if ($(cell).css('background-image') == 'none') {
            
        } else if (islandCount == 0) {
            $(".cellData").prop("onclick", null).off("click");
        } else {
            islandCount--; 
            $(cell).css('background-image', 'none');
            $(cell).css('background-color', 'green');
            islandCounter.innerHTML = islandCount;
        }  
    }
        
}

var gameBoardArray =   [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


// ======== Copied code from https://jsbin.com/isedel/2/edit?html,js =========
var tbl = document.getElementsByTagName("table")[0];

function getCellIndex (e) {
    var cell = e.target || window.event.srcElement;
    if ( cell.cellIndex >= 0 )
        return cell.cellIndex + " " + cell.parentNode.rowIndex;
    }
  
    if ( tbl.addEventListener ) {
        tbl.addEventListener("click", getCellIndex, false);
    } else if ( tbl.attachEvent ) {
        tbl.attachEvent("onclick", getCellIndex);
    }
// ===========================================================================


var cellIndex = 0;
function hit(e) {

    

    var cellIndex = getCellIndex(e);
    var parts = cellIndex.split(" ");
    var cell = e.target || window.event.srcElement;

    x = parts[0];
    y = parts[1];

    if (gameBoardArray[y][x] == 1) {
        document.getElementById("hitStatus").innerHTML = "HIT: YES";
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'red');
    } else {
        document.getElementById("hitStatus").innerHTML = "HIT: NO";
        $(cell).css('background-image', 'none');
        $(cell).css('background-color', 'gray');
    }
}

if ( tbl.addEventListener ) {
    tbl.addEventListener("click", hit, false);
} else if ( tbl.attachEvent ) {
    tbl.attachEvent("onclick", hit);
}








