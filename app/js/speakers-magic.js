// ----------------------------------------------------------------------------
// Restructuring the speakers ('.magic')

$(function () {
  var $speakers, $contents, $backdrops, len;

  Harvey.attach('(min-width: 481px)', {
    setup: function () {
      $speakers = $(".speaker");
      $contents = $(".speaker .content:first-child");
      $backdrops = $(".speakers > .bg .item");
      len = $speakers.length;
    },
    on: function () {
      $('.speakers').addClass('magic');
      for (var i=0; i<len; ++i) {
        $contents.eq(i).appendTo($backdrops.eq(i));
        $("<div class='whoisit'>")
          .html($contents.eq(i).find('.info.name').html())
          .appendTo($contents.eq(i));
      }
    },
    off: function () {
      $('.speakers').removeClass('magic');
      for (var i=0; i<len; ++i) {
        $contents.eq(i).appendTo($speakers.eq(i));
      }
      $(".whoisit").remove();
    }
  });
});
