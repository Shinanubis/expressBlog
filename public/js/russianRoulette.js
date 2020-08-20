// set a random integer number
function randomNb(Players) {
  return Math.floor(Math.random() * Math.floor(Players.length));
}

// choose a players and display it easy way
function chooseName(){
    let listPlayers = ['eric', 'nicolas', 'philippe', 'guillaume', 'anthony'];
    $("#iconePlayer").attr('src', '/img/' + listPlayers[randomNb(listPlayers)] +'.png ');
}


function debug(){
    let masterCase = document.getElementById('masterCase')
    masterCase.style.setProperty("visibility", "visible");
}
