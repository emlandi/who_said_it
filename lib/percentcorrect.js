module.exports = function(quoteObj) {
  var correct = quoteObj.correctGuesses;
  var incorrect = quoteObj.incorrectGuesses;
  var total = correct + incorrect;
  var percent = (correct / total) * 100;
  if (isNaN(percent) || !isFinite(percent)) percent = 0;
  return Math.floor(percent);
};
