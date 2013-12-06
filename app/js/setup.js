// ----------------------------------------------------------------------------
// Auto-height thing

$(function () {
  Harvey.attach('(min-width: 480px)', {

    on: function () {
      $(window).on('resize.fill', function () {
        $('.speakers .item').css({ height: $(window).innerHeight() });
        $('.speaker.section').css({ height: $(window).innerHeight() });
      });
      $(window).trigger('resize.fill');
    },

    off: function () {
      $('.speakers .item').css({ height: null });
      $('.speaker.section').css({ height: null });
      $(window).off('resize.fill');
    }
  });
});

// ----------------------------------------------------------------------------
// Restructuring the speakers

$(function () {
  var $speakers, $contents, $backdrops, len;

  Harvey.attach('(min-width: 1024px)', {
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
// ----------------------------------------------------------------------------
// Speaker animation

$(function () {
  var $speakers = $(".speaker.section");

  $('.fillsize').fillsize('>img');

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.8; }
  }, function (cid, pid, el, previous) {
    $(el).addClass('active');
    $(previous).removeClass('active');
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

$.monitorHover({ y: 70 });
$(document).on('over:on', function () {
  $('.navigation').toggleClass('show-links', true);
});
$(document).on('over:off', function () {
  $('.navigation').toggleClass('show-links', false);
});
