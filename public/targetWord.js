var targetWord = function (target) {
  //ignores case in match
  var test = new RegExp(target,'i');
  var prevGuesses = {};
  var turn = 0;
  var gaveUp = false;
  guessedCorrectly = false;

  //returns a function that lets you guess
  return function(guess) {
    turn++;
    if(test.test(guess)){
      guessedCorrectly = true;
    } else if(guess === 'i give up'){
      gaveUp = true;
    }
    return {
      guess: guess, 
      distance: getEditDistance(target,guess), 
      turn: turn, 
      gaveUp: gaveUp, 
      guessedCorrectly: guessedCorrectly,
      target : target
    };
  };
};
