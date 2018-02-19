$(document).ready(function() {
  var docHeight = $(document).height();

  $('.left_backg').height(docHeight-37);
  $('.list-row').click(function(){
    var shopid = $(this).attr("rel");
    console.log(shopid);
    location.href="/main/shoplocal/"+shopid;
  });

});
