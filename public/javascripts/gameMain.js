var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];

var server = http.createServer(app);
const wss = new websocket.Server({ server });




var battleship = document.getElementById("battleship");
var cruiser = document.getElementById("cruiser");
var destroyer1 = document.getElementById("destroyer1");
var destroyer2 = document.getElementById("destroyer2");

var cellData = document.getElementsByClassName("cellData");

// https://www.html5rocks.com/en/tutorials/dnd/basics/

$(document).ready(function() {
    alert("HELLO");
});





