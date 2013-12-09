$(function() {
  $('.swipeshow').each(function () {
    $(this).append('<div class="dots">');
  });
  $('.swipeshow').swipeshow({
    autostart: false
  });
});
