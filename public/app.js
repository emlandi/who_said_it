var object;
//gets random quote
function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    object = JSON.parse(data)
    $('#quote').html(object.quote);
  });
};
//highlights left photo when clicked
$('#person1').click(function(){
  $(this).attr("class", "clicked");
  $('#person2').attr("class", "");
  $('#answer').html(object.person);
  $('#answer').append('<br><img src="/imgs/' + object.person + '.jpg">');
});

//highlights right photo when clicked
$('#person2').click(function(){
  $(this).attr("class", "clicked");
  $('#person1').attr("class", "");
  $('#answer').html(object.person);
  $('#answer').append('<br><img src="/imgs/' + object.person + '.jpg">');
});
//next button removes border/class and gets new quote
$('#next').click(function(){
  getQuote();
  $('#answer').html("");
  $('#person1').attr("src", "").attr("class", "");
  $('#person2').attr("src", "").attr("class", "");
});

getQuote();
