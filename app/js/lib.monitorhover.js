(function ($) {

  $.monitorHover = function (options) {
    var y = options.y || 10;
    var mercy = options.mercy || 10;
    var over = false;
    $(document).on('mousemove', function (e) {
      if (e.clientY < y && !over) {
        over = true;
        $(document).trigger('over:on');
      } else if (e.clientY > (y + mercy) && over) {
        over = false;
        $(document).trigger('over:off');
      }
    });
  };

})(jQuery);


