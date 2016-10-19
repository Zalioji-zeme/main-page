//gallery script
var checkbox = document.getElementById('menu-state');

(function(window, document, undefined) {

  'use strict';

  var gallery = document.querySelector('.gallery'),
      picture = gallery.querySelector('.touchInterface'),
      dot = gallery.querySelectorAll('.dot'),
      next = gallery.querySelector('.next'),
      prev = gallery.querySelector('.prev'),
      list = gallery.querySelectorAll('.figure-wrapper'),
      dots = document.querySelectorAll('.dot'),
      counter = 0,
      amount = list.length,
      currentX = list[0],
      currentY = dots[0];
  var x;
  var y;
  var deltax = 0;
  var deltay = 0;
  var l;
  var touched = false;
  var date = document.getElementById('date');
  var hamburger = document.querySelector('.menu-hamburger');



  date.innerHTML = new Date().getFullYear();

  function navigate(direction) {
    currentX.classList.remove('active');
    currentY.classList.remove('active');
    counter = counter + direction;

    if(direction === -1 && counter < 0) {
      counter = amount - 1;
    }

    if(direction === 1 && !list[counter]) {
      counter = 0;
    }
    currentX = list[counter];
    currentY = dots[counter];
    currentX.classList.add('active');
    currentY.classList.add('active');
  }

  function arrowNav(e) {
    if(e.key === 'ArrowLeft') {
      e.preventDefault();
      navigate(-1);
    }
    if(e.key === 'ArrowRight') {
      e.preventDefault();
      navigate(1);
    }
  }

  function checkCheckbox() {
    if (checkbox.classList.contains('active-state') === true) {
      checkbox.classList.remove('active-state');
    } else {
      checkbox.classList.add('active-state');
    }
  }


  picture.addEventListener('touchstart', function(e) {
  	deltax = 0;
  	deltay = 0;
  	x = e.touches[0].clientX;
  	y = e.touches[0].clientY;
  	l = e.touches.length;
  }, false);

  picture.addEventListener('touchmove', function(e) {

  	deltax = x - e.touches[0].clientX;
  	deltay = y - e.touches[0].clientY;

  	e.preventDefault();

  	touched = true;

  }, false);

  picture.addEventListener('touchend', function(e) {

  	if (deltax > 10 && Math.abs(deltay) < 50) {
  		e.preventDefault();
  		navigate(-1);
  	}
  	if (deltax < -10 && Math.abs(deltay) < 50) {
  		e.preventDefault();
  		navigate(1);
  	}

  }, false);

  next.addEventListener('click', function(e) {
    navigate(1);
  });
  prev.addEventListener('click', function(e){
    navigate(-1);
  });

  gallery.addEventListener('keydown', arrowNav, false);

  hamburger.addEventListener('click', checkCheckbox, false);

  navigate(0);

})(window, document);

$(function(){
  $('nav li a').on('click', function() {
    var $section = $(this).attr('href');
    var $checkbox = $('.checkbox-toggle-state');
    $('html, body').animate({
      scrollTop: $($section).offset().top -60
    }, 1000);
    checkbox.classList.remove('active-state');
  });
});
