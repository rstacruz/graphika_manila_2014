if (navigator.userAgent.match(/iPad|iPod|iPhone|Android/))
  $('html').addClass('mobile');
else
  $('html').addClass('desktop');

// ----------------------------------------------------------------------------
// Auto-height thing

$(function () {
  Harvey.attach('(min-width: 480px)', {

    on: function () {
      $(window).on('resize.fill', function () {
        // Each of the speakers on big mode
        $('.speakers .item').css({ height: Math.max(600, $(window).innerHeight()) });
        // Scrolling placeholders
        $('.speaker.section').css({ height: Math.max(600, $(window).innerHeight() * 1.4) });
      });
      $(window).trigger('resize.fill');
    },

    off: function () {
      $('.speakers .item').css({ height: '' });
      $('.speaker.section').css({ height: '' });
      $(window).off('resize.fill');
    }
  });
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

ScrollMonitor({
  if: function (y) {
    return y < 90;
  },
  enter: function () {
    $('.navigation').toggleClass('show-links', false);
  },
  exit: function () {
    $('.navigation').toggleClass('show-links', true);
  }
});
