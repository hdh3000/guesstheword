//globals
var getGuess;
var hints = [];
var guessStack = [];
var guessStackPointer = 0;

//game state
var gameStart = function () {
  //select random word
  var target = words[Math.floor(Math.random()*words.length)];
  //ignores case in match
  var test = new RegExp('^' + target + '$','i');
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
  // keep DOM traversals down
  var $guess = $("#guess");
  setNewGameState();

  //guess
  $( "#guess" ).on('click', function(e) {
    handleGuess($('#game > input').val());
  });

  //give up
  $( "#give-up" ).on('click', function(e) {
    handleGiveUp();
  });

  //new game
  $( "#new-game" ).on('click', function(e) {
    setNewGameState();
  });

  //arrow guess nav and enter functionality
  $(document).keydown(function(e){

    if (e.which == 13){
      if($guess.is(':visible')){
        $guess.click();
      } else if ($('#new-game').is(':visible')){
        $('#new-game').click();
      }
    }
    if (e.which == 38){
      e.preventDefault();
      getPrevGuess();
    }
    if (e.which == 40){
      e.preventDefault();
      getNextGuess();
    }
  });
};




