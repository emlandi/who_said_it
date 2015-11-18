var quoteObj;

function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    quoteObj = JSON.parse(data);
    $('#quote').html('"' + quoteObj.quote + '"');
  });
}

function submitAnswer(answer) {
  var data = {
    quoteObj: quoteObj,
    answer: answer
  };
  $.ajax({
    method: 'POST',
    url: 'api/',
    data: JSON.stringify(data)
  });
console.log(JSON.stringify(data));
}

function makeChoice(choice) {
  $('#answer').html(quoteObj.person);
  $('#answer').append('<br><img src="/imgs/' + quoteObj.person + '.jpg" height="300" width="300">');
  if (choice === quoteObj.category) {
      $('#answer').append('<br>Your guess was correct!');
      submitAnswer('correct');
  } else {
      $('#answer').append('<br>Your guess was incorrect.');
      submitAnswer('incorrect');
  }
  $('#overlay').fadeIn(400);
}

$('.choice').click(function() {
  makeChoice(this.id);
});

$('#next').click(function(){
  getQuote();
  $('#overlay').fadeOut(400, function() {
    $('#answer').html("");
  });
});

getQuote();
