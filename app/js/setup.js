$(function () {
  $(window).on('resize.fill', function () {
    $('.speakers .item').css({ height: $(window).innerHeight() });
    $('.speaker.section').css({ height: $(window).innerHeight() * 1.5 });
  });
  $(window).trigger('resize.fill');
});

$(function () {
  var $speakers = $(".speaker.section");

  $('.fillsize').fillsize('>img');

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.8; }
  }, function (cid, pid, el, previous) {
    $('html')
      .toggleClass(getClass($(previous)), false)
      .toggleClass(getClass($(el)), true);
  });

  function getClass($el) {
    var isSpeaker = $el.is('.speaker');
    if (isSpeaker) {
      return 'section-speakers section-speaker-'+$speakers.index($el);
    } else
      return 'section-'+$el.attr('id');
  }

  $(document).toggleable('.toggle', { using: '.toggle-button' });
  $(document).toggleable('.faq-list li', { using: 'strong' });
});
