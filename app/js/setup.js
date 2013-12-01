// ----------------------------------------------------------------------------
// Auto-height thing

$(function () {
  $(window).on('resize.fill', function () {
    $('.speakers .item').css({ height: $(window).innerHeight() });
    $('.speaker.section').css({ height: $(window).innerHeight() * 1.5 });
  });
  $(window).trigger('resize.fill');
});

// ----------------------------------------------------------------------------
// Speaker animation

$(function () {
  var $speakers = $(".speaker.section");

  $('.fillsize').fillsize('>img');

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.8; }
  }, function (cid, pid, el, previous) {
    $(document).trigger('section', cid);
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
});

// ----------------------------------------------------------------------------
// Toggleable

$(function () {
  $(document).toggleable('.toggle', { using: '.toggle-button' });
  $(document).toggleable('.faq-list li', { using: 'strong' });
});

// ----------------------------------------------------------------------------
// Auto-replace

$(document).on('section', function (e, id) {
  if (id === 'top') $.replaceHash(null);
  else $.replaceHash(id);
});

// ----------------------------------------------------------------------------
// Replace hash helper

if (window.history && window.history.replaceState) {
  $.replaceHash = function (hash) {
    window.history.replaceState(null, null, hash ? "#"+hash : location.pathname);
  };
} else {
  $.replaceHash = function(){};
}

// ----------------------------------------------------------------------------
$.monitorHover = function (options) {
  var y = options.y || 10;
  var mercy = options.mercy || 10;
  var over = false;
  $(document).on('mousemove', function (e) {
    console.log(e.clientY, y, over);
    if (e.clientY < y && !over) {
      over = true;
      $(document).trigger('over:on');
    } else if (e.clientY > (y + mercy) && over) {
      over = false;
      $(document).trigger('over:off');
    }
  });
};

// ----------------------------------------------------------------------------

$.monitorHover({ y: 70 });
$(document).on('over:on', function () {
  $('.navigation').toggleClass('show-links', true);
});
$(document).on('over:off', function () {
  $('.navigation').toggleClass('show-links', false);
});
