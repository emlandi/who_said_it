//this pulls a random quote, NOT TOP CORRECT DQ
function getTopCorrectDQ() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    person = JSON.parse(data).person;
    quote = JSON.parse(data).quote;
    correct = JSON.parse(data).correctGuesses;
    $('#quote').html('"' + quote + '"');
    $('#person').html("-" + person);
    $('#CG').html(correct + " correct guesses");
    $('#img').append('<img src="imgs/' + person + '.jpg">');
  });
}

getTopCorrectDQ();
