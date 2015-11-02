//utilities
var handleGuess = function(guess) {
  guessObj = getGuess(guess);

  // check if winning guess
  if(guessObj.guessedCorrectly){
    giveWin();
  }

  guessStack.unshift(guess);

  //reset position of pointer to top of stack
  guessStackPointer = 0;

  //append the guess object to table
  $('#guesses-table > tbody:last')
    .prepend('<tr><td>'+guessObj.guess+'</td><td>'+guessObj.distance+'</td>');

  //update the turn value
  $('#turn').html("" + guessObj.turn);

  //clear form value for next guess
  $('#game > input').val('').focus();
};

var setNewGameState = function() {
  //reset state variables
  getGuess = gameStart();
  guessStackPointer = 0;
  guessStack = [];

  //set html back to blank
  $('.hints').html('');
  $('.hints').append(hints);
  $('#turn').html("0");
  $('#guesses-table > tbody:last').html('');
  $('#game > input').val('');

  $('#game').show();
  $('#game-loss').hide();
  $('#game-win').hide();
  $('#new-game').hide();
  
  //set focus last
  $('#game > input').focus();
};

var handleGiveUp = function() {
  var target = getGuess('');
  $('#game-loss').html("<span class='game-over'>You quit! The winning word was: <span class='answear'>" + target.target + "</span> </span>");
  $('#game').hide();
  $('#game-loss').show();
  $('#new-game').show();
};

var giveWin = function(){
  var target = getGuess('');
  $('#game-win').html("<span class='game-over'>You won! The winning word was: <span class='answear'>" + target.target + "</span> </span>");
  $('#game').hide();
  $('#game-win').show();
  $('#game > input').val('').focus();
  $('#new-game').show();
};

var getHints = function(word){
  var hints = [];
  var hint;
  var i = 0;

  //if we ever have short words, this has to know to stop
  while(i < 3 && word.length-hints.length > 0){
    hint = word[Math.floor(Math.random()*word.length)].toLowerCase();
    if(hints.indexOf(hint) === -1) {
      hints.push(hint);
      i++;
    }
  }

  return hints.join(' , ');
};

var getPrevGuess = function(){
  $('#game > input').val(guessStack[guessStackPointer]);
  if(guessStackPointer < guessStack.length - 1){
    guessStackPointer++;
  }
};

var getNextGuess = function(){
  if(guessStackPointer > 0) {
    guessStackPointer--;
    $('#game > input').val(guessStack[guessStackPointer]);
  } else {
    $('#game > input').val('');
  }
};
