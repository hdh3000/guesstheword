//globals
var getGuess;
var hints = [];

//game state
var gameStart = function () {
  //select random word
  var target = words[Math.floor(Math.random()*words.length)];
  //ignores case in match
  var test = new RegExp(target,'i');
  //setup hints
  hints = getHints(target);
  
  //set up closure variables
  var turn = 0;
  var gaveUp = false;
  guessedCorrectly = false;

  //returns a function that lets you guess
  return function(guess) {
    turn++;
    if(test.test(guess)){
      guessedCorrectly = true;
    }
    return {
      guess: guess, 
      distance: getEditDistance(target,guess), 
      turn: turn, 
      guessedCorrectly: guessedCorrectly,
      target : target
    };
  };
};

var app = function(){
    getGuess = gameStart();
    $('#game > input').focus();
    $('.hints').append("hint: " + hints.join(' '));

    //guess
    $( "#guess" ).on('click', function(e) {
      handleGuess($('#game > input').val());
    });
    
    $(document).keypress(function(e){
      if (e.which == 13){
          $("#guess").click();
      }
    });
    
    //give up
    $( "#give-up" ).on('click', function(e) {
      handleGiveUp();
    });

    //new game
    $( "#new-game" ).on('click', function(e) {
      location.reload();
    });    

};




