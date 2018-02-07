$(document).ready(function() {
  var docHeight = $(document).height();

  $('.left_backg').height(docHeight-37);
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
