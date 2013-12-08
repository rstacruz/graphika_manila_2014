(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
$(function () {
  $('.fillsize').fillsize('>img');
  $('.backdrop').fillsize('>video');
});


;if (navigator.userAgent.match(/iPad|iPod|iPhone|Android/))
  $('html').addClass('mobile');
else
  $('html').addClass('desktop');

// ----------------------------------------------------------------------------
// Auto-height thing

$(function () {
  Harvey.attach('(min-width: 480px)', {

    on: function () {
      $(window).on('resize.fill', function () {
        $('.title-card').css({ height: Math.max(600, $(window).innerHeight()) });
        // Each of the speakers on big mode
        $('.speakers .item').css({ height: Math.max(600, $(window).innerHeight()) });
        // Scrolling placeholders
        $('.speaker.section').css({ height: Math.max(600, $(window).innerHeight() * 1.4) });
      });
      $(window).trigger('resize.fill');
    },

    off: function () {
      $('.title-card, .speakers .item, .speaker.section').css({ height: '' });
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

;// ----------------------------------------------------------------------------
// Restructuring the speakers ('.magic')

$(function () {
  var $speakers, $contents, $backdrops, len;

  Harvey.attach('(min-width: 480px)', {
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

;// ----------------------------------------------------------------------------
// Speaker scrolling animation

$(function () {
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


;$(function () {
  $('video').each(function () {
    var $video = $(this);
    var vid = $video[0];

    vid.addEventListener('ended', function () {
      console.log("END");
      vid.currentTime = 0.1;
      vid.play();
    }, false);
  });
});

;
//# sourceMappingURL=app.js.map