var object;
//gets random quote
function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    object = JSON.parse(data);
    $('#quote').html('"' + object.quote + '"');
    console.log(data);
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

  $('#answer').append
  $('#overlay').fadeIn(400);

}

$('.choice').click(function() {
  makeChoice(this.id);
  console.log(this.id);
});

$('#next').click(function(){
  $('#answer').html("");
  $('#overlay').fadeOut();
  getQuote();
});

getQuote();
