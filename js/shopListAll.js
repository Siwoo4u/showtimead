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
  var shopname= $(this).find(".s_title").text();
  var confirm = $(this).find(".s_confirm").text();
  $('.btn-go').removeClass('display-none');
  $('.btn-local').removeClass('display-none');
  $(".shopinfoplace").html('선택된 샵 : '+shopname);
  $("#localid").val(shopid);
  $("#localcon").val(confirm);
});
$('.btn-go').click(function(){
  var shopid =   $("#localid").val();
  var openNewWindow = window.open("about:blank");
  openNewWindow.location.href = "http://showtime.com/user/booking/preView.do?shopId="+shopid;

});
$('.btn-local').click(function(){
  var shopid =   $("#localid").val();
  var confirm =   $("#localcon").val();
  if(confirm=='N'){
    alert('승인되지 않은 타임샵 입니다.');
    return false;
  }else{
    location.href="/main/shoplocal/"+shopid;
  }

});
