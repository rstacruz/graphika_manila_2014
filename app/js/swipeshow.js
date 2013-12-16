$(function() {
  if ($('html').is('desktop')) {
    $('.swipeshow').each(function () {
      $(this).append('<div class="dots">');
    });
    $('.swipeshow').swipeshow({
      autostart: false
    });
  } else {
    $(".swipeshow .slide + .slide").remove();
  }
});
