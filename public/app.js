var object;
//gets random quote
function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    object = JSON.parse(data);
    $('#quote').html('"' + object.quote + '"');
  });
}

function makeChoice(choice) {
  $('#answer').html(object.person);
  $('#answer').append('<br><img src="/imgs/' + object.person + '.jpg" height="300" width="300">');
  if (choice === object.category) {
      $('#answer').append('<br>Your guess was correct!');
  } else {
      $('#answer').append('<br>Your guess was incorrect.');
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
