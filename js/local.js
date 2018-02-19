$(document).ready(function() {
  var docHeight = $(document).height();

  $('.left_backg').height(docHeight-37);
  setTag();
  $('.list-row').click(function(){
    var shopid = $(this).attr("rel");
    console.log(shopid);
    location.href="/main/shoplocal/"+shopid;
  });
});
function onKeyDown()
{
     if(event.keyCode == 13)
     {
       var values = $("#tag_input").val();
       $("#keyword").append("<span class='tag'><b>#"+values+"</b> <img class='delete_btn' src='/images/tag_delete_btn.gif' onclick='removeOp(this);'/></span>");
       $("#tag_input").val("");
       $("#tag_input").focus();
       var tmp = $("#tag_values").val();
       $("#tag_values").val(tmp + "#" + values);
     }
}

function setTag(){
	tag = $("#tag_values").val();
	if(tag!=""){
	var tags = tag.split("#");
	for (var i=1 ; i<tags.length; i++ ) {
		 $("#keyword").append("<span class='tag'><b>#"+tags[i]+"</b> <img class='delete_btn' src='/images/tag_delete_btn.gif' onclick='removeOp(this);'/></span>");
         $("#tag_input").val("");
      }
	}
}
function removeOp(obj){
    	  var tmp = $("#tag_values").val();
    	  var delWord = $(obj).parent().text().trim();

		  var result  = tmp.replace(delWord,"");
		  $("#tag_values").val(result);

		  $(obj).parent().remove();

}
function adact(){
  var id = $("#shopid").val();
  var keyword = $("#tag_values").val();
  var start = $("#start").val();
  var end = $("#end").val();
  $.ajax({
    url: '/main/localAct',                //주소
    dataType: 'json',                  //데이터 형식
    type: 'POST',                      //전송 타입
    data: {
            'id':id,
            'start':start,
            'end':end,
            'keyword':keyword
          },      //데이터를 json 형식, 객체형식으로 전송
    success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴
      console.log(result.rowCount);
      if(result.rowCount==1){
        alert("등록 완료");
        location.href='/main/localList';
      }
    } //function끝
  }); // ------      ajax 끝-----------------
}
