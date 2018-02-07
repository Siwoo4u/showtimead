$(document).ready(function() {
  var docHeight = $(document).height();

  $('.left_backg').height(docHeight-37);
});
$('.list-row').click(function(){
    var id = $(this).attr("rel");
    var shop_name = $(this).find(".s_title").text();
    var filepath = $(this).find(".list-hide").text();
    var u_name =  $(this).find(".s_name").text();
    var tel =  $(this).find(".s_tel").text();
    var pay =  $(this).find(".s_pay").text();



    $("#modal-title").text(shop_name);
    $("#modalbodytop").html("<span class='modal-line'>대표자: "+u_name+"</span>");
    $("#modalbodytop").append("<span class='modal-line'>연락처: "+tel+"</span>");
    $("#modalbodytop").append("<button class='btn-view' ref='"+id+"' onclick='openView(this);'>미리보기</button>");
    if(pay=='Y'){
      $("#btn-pay").removeClass('display-none');
      $("#modalbodybottom").html("<a href='http://showtime.com"+filepath+"' target='_blank'>첨부파일 다운로드</a>");
    }else{
      $("#modalbodybottom").remove();
    }

    if(pay=='Y'&&filepath==''){
      $("#btn-ok").remove();
      $("#modalbodybottom").html("첨부파일이 등록되지 않았습니다.");
    }
    $("#modal_id").val(id);
    $('#modal').modal('show');

});
$('.btn-primary').click(()=>{
  var id = $("#modal_id").val();
  $.ajax({
    url: '/main/shopconfirm',                //주소
    dataType: 'json',                  //데이터 형식
    type: 'POST',                      //전송 타입
    data: {'id':id},      //데이터를 json 형식, 객체형식으로 전송
    success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴
      console.log(result.rowCount);
      if(result.rowCount==1){
        alert("인증이 완료되었습니다.");
        $("#modal").modal('hide');
        location.reload();
      }
    } //function끝
  }); // ------      ajax 끝-----------------
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
function openView(obj){
  var shopid = $(obj).attr("ref");
  var openNewWindow = window.open("about:blank");
  openNewWindow.location.href = "http://showtime.com/user/booking/preView.do?shopId="+shopid;

}
