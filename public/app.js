var object;
//gets random quote
function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    object = JSON.parse(data)
    $('#quote').html('"' + object.quote + '"');
  })
};
//left button clicked adds border & shows pic/name
$('#person1').click(function(){
  $(this).attr("class", "clicked");
  $('#person2').attr("class", "");
  $('#answer').html(object.person);
  $('#answer').append('<br><img src="/imgs/' + object.person + '.jpg">');
});
//right button clicked adds border & shows pic/name
$('#person2').click(function(){
  $(this).attr("class", "clicked");
  $('#person1').attr("class", "");
  $('#answer').html(object.person);
  $('#answer').append('<br><img src="/imgs/' + object.person + '.jpg">');
});
//next button clicked removes border/pic/name and gets new quote
$('#next').click(function(){
  getQuote();
  $('#answer').html("");
  $('#person1').attr("src", "").attr("class", "");
  $('#person2').attr("src", "").attr("class", "");
});

getQuote();
