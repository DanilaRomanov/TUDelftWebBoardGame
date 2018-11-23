var playBtn = document.getElementById("playBtn");

function loading() {
    var loader = document.getElementById("loader");
    loader.style.visibility = "visible";
    setTimeout(function() { loader.innerHTML = "Loading." }, 1000);
    setTimeout(function() { loader.innerHTML = "Loading.." }, 2000);
    setTimeout(function() { loader.innerHTML = "Loading..." }, 3000);
}
