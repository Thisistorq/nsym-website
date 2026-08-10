document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prev = carousel.querySelector('.carousel-btn.prev');
    var next = carousel.querySelector('.carousel-btn.next');
    if (!track) return;
    function scrollByCard(dir) {
      var card = track.querySelector('img');
      var amount = card ? card.getBoundingClientRect().width + 14 : 300;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { scrollByCard(-1); });
    if (next) next.addEventListener('click', function () { scrollByCard(1); });
  });
});
