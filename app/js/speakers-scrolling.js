// ----------------------------------------------------------------------------
// Speaker scrolling animation

$(function () {
  if ($('html').is('.mobile')) {
    $('html').addClass('section-speakers');
    return;
  }

  var $speakers = $(".speaker.section");

  // Separate scrollagent for menu activation
  $('body > .section[id]').scrollagent(function (cid, pid, el, previous) {
    if (cid) $('a[href="#'+cid+'"]').addClass('active');
    if (pid) $('a[href="#'+pid+'"]').removeClass('active');
  });

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.2; }
  }, function (cid, pid, el, previous) {
    // Fix navigation bar
    var isSpeaker = ($(el).closest('#speakers').length > 0);
    $('.navigation-bar').toggleClass('show-speakers', isSpeaker);
    $(".speaker-link a.active").removeClass('active');
    if (isSpeaker) {
      $('a[href="#'+cid+'"]').addClass('active');
    }

    // Highlight the current class (for whatever reason)
    $(el).addClass('active');
    $(previous).removeClass('active');

    // Update root classname (transitions stuff via CSS)
    $('html')
      .toggleClass(getClass($(previous)), false)
      .toggleClass(getClass($(el)), true);

    // Let others know
    $(document).trigger('section', cid);
  });

  function getClass($el) {
    var isSpeaker = $el.is('.speaker');
    if (isSpeaker) {
      return 'section-speakers section-speaker-'+$speakers.index($el);
    } else
      return 'section-'+$el.attr('id');
  }
});

