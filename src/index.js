import Game from "./scripts/game"

console.log("Webpack init check"); 

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("moon_game");
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx); 

});

