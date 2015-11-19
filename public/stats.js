function getQuote() {
  $.ajax({
    url: 'api/test'
  }).done(function(data) {
    makeHTML(JSON.parse(data), '#misattributed');
    makeHTML(JSON.parse(data), '#attributed');
  });
}

function percentCorrect(quoteObj) {
  var correct = quoteObj.correctGuesses;
  var incorrect = quoteObj.incorrectGuesses;
  var total = correct + incorrect;
  var percent = (correct / total) * 100;
  if (isNaN(percent) || !isFinite(percent)) percent = 0;
  return Math.floor(percent);
}

function makeHTML(quoteArray, id) {
  for (var i = 0; i < quoteArray.length; i++) {
    var percent = percentCorrect(quoteArray[i]);

    var $li = $('<li></li>');
    var $p = $('<p>' + percent + '% guessed correctly</p>');
    var $span = $('<span>#' + (i + 1) + '</span>');
    var $img = $('<img src="/imgs/' + quoteArray[i].person + '.jpg">');

    $span.append($img);
    $span.append($p);
    $li.append($span);
    $li.append(quoteArray[i].quote + " -" + quoteArray[i].person);

    $(id).append($li);
  }
}
getQuote();
