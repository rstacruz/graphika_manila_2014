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
        $('.speakers .item').css({ height: $(window).innerHeight() });
        $('.speaker.section').css({ height: $(window).innerHeight() });
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

$(function () {
  $('.fillsize').fillsize('>img');
  $('.backdrop').fillsize('>video');
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

$.monitorHover({ y: 90 });
$(document).on('over:on', function () {
  if ($(window).scrollTop() > 100)
    $('.navigation').toggleClass('show-links', true);
});
$(document).on('over:off', function () {
  $('.navigation').toggleClass('show-links', false);
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
  $('body > [id]').scrollagent(function (cid, pid, el, previous) {
    if (cid) $('a[href="#'+cid+'"]').addClass('active');
    if (pid) $('a[href="#'+pid+'"]').removeClass('active');
  });

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.8; }
  }, function (cid, pid, el, previous) {
    if (cid) $('a[href="#'+cid+'"]').addClass('active');
    if (pid) $('a[href="#'+pid+'"]').removeClass('active');

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


;
//# sourceMappingURL=app.js.map