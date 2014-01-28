/*jshint devel:true */
/*global $:false */

$(function() {
  var headerHeight  = $('.site-header').outerHeight(true);
  var windowHeight  = $(window).outerHeight();
  var windowWidth   = $(window).outerWidth();
  var sliderHeight  = windowHeight - headerHeight;

  // // Remove last image and place it first
  // $('.myCarousel-wrapper img:first').before($('.myCarousel-wrapper img:last'));


  function carouselSetHeight() {
    windowHeight = $(window).outerHeight();
    windowWidth  = $(window).outerWidth();
    sliderHeight = windowHeight - headerHeight - 50;

    $('#myCarousel').height(sliderHeight);
    if (sliderHeight >= 400) {
      $('#myCarousel a[class^="slide"]').css({
        "top" : sliderHeight / 2 - 50
      });
    } else if (sliderHeight > 250 && sliderHeight < 400) {
      $('#myCarousel a[class^="slide"]').css({
        "width"   : 50,
        "height"  : 50,
        "top"     : sliderHeight / 2 - 25
      });
    } else if (sliderHeight <= 250) {
      $('#myCarousel a[class^="slide"]').css({
        "width"   : 30,
        "height"  : 30,
        "top"     : $('.myCarousel-wrapper').height()/2 - 15
      });
      $('#myCarousel a[class*="slide-right"]').css({
        "right" : 30
      });
      $('#myCarousel a[class*="slide-left"]').css({
        "left" : 30
      });
    }
  }
  carouselSetHeight();
  $(window).smartresize(carouselSetHeight);

  function carouselCenterFirstImage() {
    windowWidth  = $(window).outerWidth();
    var firstImage = $('.myCarousel-wrapper img:first');
    // var currentImage = $('.myCarousel-wrapper img.current');
    // var currentImageWidth = $('.myCarousel-wrapper img.current').outerWidth(true);
    $('.myCarousel-wrapper').css({
      "paddingLeft"  : (windowWidth - firstImage.width())/2
      // "left"  : -(firstImage.outerWidth(true) - ((firstImage.outerWidth(true) - currentImageWidth)/2))
    });
  }
  carouselCenterFirstImage();
  $(window).smartresize(carouselCenterFirstImage);

  function carouselSlideRight() {
    $('#myCarousel a.slide-right').click(function(e) {
      e.preventDefault();
      var currentImage = $('.myCarousel-wrapper img.current');
      var currentImageWidth = $('.myCarousel-wrapper img.current').outerWidth(true);
      var nextImageWidth = currentImage.next().outerWidth(true);
      $('.myCarousel-wrapper').animate({
        left: '-=' + (currentImageWidth - ((currentImageWidth - nextImageWidth)/2))
      });
      currentImage.removeClass("current").next().addClass("current");
    });
  }
  function carouselSlideLeft() {
    $('#myCarousel a.slide-left').click(function(e) {
      e.preventDefault();
      var currentImage = $('.myCarousel-wrapper img.current');
      var currentImageWidth = $('.myCarousel-wrapper img.current').outerWidth(true);
      var previousImageWidth = currentImage.prev().outerWidth(true);
      $('.myCarousel-wrapper').animate({
        left: '+=' + (currentImageWidth - ((currentImageWidth - previousImageWidth)/2))
      });
      currentImage.removeClass("current").prev().addClass("current");
    });
  }
  carouselSlideRight();
  carouselSlideLeft();

  // Bug Tracking
  // console.log("Window height: " + windowHeight + "px");
  // console.log("Header height: " + headerHeight + "px");
  // console.log("Carousel height " + sliderHeight + "px");
});