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

//next button removes border/class/img
$('#next').click(function(){
  $('#person1').attr("src", "").attr("class", "");
  $('#person2').attr("src", "").attr("class", "");
});




