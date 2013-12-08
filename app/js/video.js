$(function () {
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
