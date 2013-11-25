$(function () {
  $('.fillsize').fillsize('>img');

  $('.section[id], .m-section').scrollagent(function (cid, pid, el) {
    var $el = $(el);
    var isSpeaker = $el.is('.speaker');

    $('html').toggleClass('section-speakers', isSpeaker);
  });

  $(document).toggleable('.toggle', { using: '.toggle-button' });
  $(document).toggleable('.faq-list li', { using: 'strong' });
});
