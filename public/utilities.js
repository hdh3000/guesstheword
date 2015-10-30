//utilities
var handleGuess = function(guess) {
  guessObj = getGuess(guess);
  
  // check if winning guess
  if(guessObj.guessedCorrectly){
    giveWin();
  }

  //append the guess object to table
  $('#guesses-table > tbody:last')
    .prepend('<tr><td>'+guessObj.guess+'</td><td>'+guessObj.distance+'</td>');

  //update the turn value
  $('#turn').html("" + guessObj.turn);
  
  //clear form value for next guess
  $('#game > input').val('').focus();
};

var handleGiveUp = function() {
  var target = getGuess('');
  $('#game-loss').html("<span class='game-over'>You quit! The winning word was: <span class='answear'>" + target.target + "</span> </span>");
  $('#game').hide();
  $('#game-loss').show();
};

var giveWin = function(){
  var target = getGuess('');
  $('#game-win').html("<span class='game-over'>You won! The winning word was: <span class='answear'>" + target.target + "</span> </span>");
  $('#game').hide();
  $('#game-win').show();
  $('#game > input').val('').focus();
  return;
};

var getHints = function(word){
  var hints = [];
  var hint;
  var i = 0;

  while(i < 3){
    hint = word[Math.floor(Math.random()*word.length)];
    if(hints.indexOf(hint) === -1) {
      hints.push(hint);
      i++;
    }
  }

  return hints;
};

