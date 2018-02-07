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

    var name = $("#search").val();
    var op = $("#select_search").val();
    console.log('op--->'+op);
    location.href='/main/userList/1?search='+name+'&op='+op;
}

$(".list-row").click(function(){
  var id= $(this).attr("rel");
  location.href='/main/userView/'+id;
});
