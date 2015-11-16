//gets random quote
function getQuote() {
  $.ajax({
    url: 'api/'
  }).done(function(data) {
    $('#quote').html(JSON.parse(data).quote);
  });
};
//highlights left photo when clicked
$('#person1').click(function(){
  $(this).attr("class", "clicked");
  $('#person2').attr("class", "");
});

//highlights right photo when clicked
$('#person2').click(function(){
  $(this).attr("class", "clicked");
  $('#person1').attr("class", "");
});
//next button removes border/class and gets new quote
$('#next').click(function(){
  getQuote();
  $('#person1').attr("src", "").attr("class", "");
  $('#person2').attr("src", "").attr("class", "");
});

getQuote();
