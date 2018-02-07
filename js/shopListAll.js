$(document).ready(function() {
  var docHeight = $(document).height();

  $('.left_backg').height(docHeight-37);
});

function onKeyDown()
{
     if(event.keyCode == 13)
     {
          search();
     }
}
function search(){
    var s_val = $("#search").val();
    var op = $("#select_search").val();
    location.href='/main/shopListWait/1?search='+s_val+'&op='+op;
}
$('.list-row').click(function(){
  var shopid = $(this).attr("rel");
  var openNewWindow = window.open("about:blank");
  openNewWindow.location.href = "http://showtime.com/user/booking/preView.do?shopId="+shopid;

});
