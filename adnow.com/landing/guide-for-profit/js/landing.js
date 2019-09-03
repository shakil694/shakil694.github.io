'use strict';

$(function () {

  var win = $(window);

  var LogoSlider = function ($containers) {
    var i = 1;
    var playing = null;

    var loadLogos = function (container) {
      if (container.data('loaded')) { return; }

      container.find('.logo').each(function () {
        $(this).addClass($(this).data('logo'));
      });

      container.data('loaded', true);
    };

    this.play = function () {
      if (playing) { return; }

      playing = setInterval(function () {
        $containers.eq(0).css('margin-left', (100 * -i) + '%');
        i++;
        loadLogos($containers.eq(i));

        if (i > $containers.length + 1) {
          $containers.eq(0)
            .addClass('unanimate')
            .css('margin-left', 0);

          setTimeout(function () {
            $containers.eq(0)
              .removeClass('unanimate');

            $containers.eq(0).css('margin-left', '-100%');
            i = 2;
          }, 500);
        }
      }, 5000);
    };

    this.pause = function () {
      clearInterval(playing);
      playing = null;
    };

    loadLogos($containers.eq(0));
    loadLogos($containers.eq(1));
    $containers.eq(0).clone().appendTo($containers.parent());
  };

  var logosSlider = new LogoSlider($('.slider-container'));
  var menu = $('.mobile-menu-wrap');

  $('#openMenu').click(function (e) {
    e.preventDefault();
    menu.addClass("open-menu");
  });

  $(document).mouseup(function (e) {
    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
      menu.removeClass("open-menu");
    }
  });

  $('.toggler').on('click', function(){
    var ul = $(this).next('ul');
    ul.slideToggle(300);
  });

  $('.lang').on('click', function(){
    $(this).toggleClass('active');
    $(this).next('ul').toggleClass('active');
  });

  var iMac = $('.imac'),
      iPhone = $('.iphone'),
      iPhoneLayer = $('.iphone-event-layer');

  var iMacAnimation = function(cover){

    var self = cover,
        firstClass = cover.attr('class'),
        timeout1, timeout2, timeout3,
        blocker = 0,
        videoCover = self.find('.video-wrapper'),
        video = videoCover.find('video');

    function reset(){
        self.attr('class', firstClass);
        $('.video-options').find('.option').removeClass('show active');
        iPhone.removeClass('hide');
        video[0].pause();
        video[0].currentTime = 0;
        setTimeout(function(){
          videoCover.show();
        }, 500);
    }

    self.on('mouseover', function(){

      blocker = 0;

      var firstClass = self.attr('class');
      
      iPhone.addClass('hide');
      self.addClass('ready expand active');

      if (blocker != 1) {
        var timeout1 = setTimeout(function(){
          if (blocker == 1) return;
          self.addClass('state-1');

          self.find('.percents').find('.percent').text('40%');
          self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-stop"></div><div class="name">Video Paused</div>');
          self.find('.option').addClass('show active');

          if (blocker != 1) {
            var timeout2 = setTimeout(function(){
              if (blocker == 1) return;
              self.addClass('state-2');

              self.find('.percents').find('.percent').text('60%');
              self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-play"></div><div class="name">Video Starts</div>');
              video[0].play();

              if (blocker != 1) {
                var timeout3 = setTimeout(function(){
                  if (blocker == 1) return;
                  self.addClass('state-3');

                  self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-play"></div><div class="name">Video Plays</div>');
                  self.find('.percents').find('.percent').text('100%');

                  video.on('ended', function(){
                    self.find('.video-options').find('.option').removeClass('show active');
                    videoCover.slideUp(500, function(){
                      reset();
                    });
                  });

                }, 4000);
              }
            }, 3000);
          }
        }, 1000);
      }

    });
    self.on('mouseleave', function(){

        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        blocker = 1;
        reset();        

      });
  }

  iMacAnimation(iMac);

  var iPhoneAnimation = function(cover){

    var self = cover,
        firstClass = cover.attr('class'),
        timeout1, timeout2, timeout3,
        blocker = 0,
        videoCover = self.find('.video-wrapper'),
        video = videoCover.find('video'),
        preventStarting = 0;

    function reset(){
        self.attr('class', firstClass);
        $('.video-options').find('.option').removeClass('show active');
        iPhone.removeClass('hide');
        video[0].pause();
        video[0].currentTime = 0;
        iPhoneLayer.removeClass('active');
        setTimeout(function(){
          videoCover.show();
        }, 500);

    }

    iPhoneLayer.on('click', function(){

      if (preventStarting == 1) return false;

      preventStarting = 1;

      blocker = 0;

      var firstClass = self.attr('class');
      
      iPhone.removeClass('hide');
      self.addClass('active');
      $(this).addClass('active');

      if (blocker != 1) {
        var timeout1 = setTimeout(function(){
          if (blocker == 1) return;
          self.addClass('state-1');

          self.find('.percents').find('.percent').text('40%');
          self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-stop"></div><div class="name">Video Paused</div>');
          self.find('.option').addClass('show active');

          if (blocker != 1) {
            var timeout2 = setTimeout(function(){
              if (blocker == 1) return;
              self.addClass('state-2');

              self.find('.percents').find('.percent').text('60%');
              self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-play"></div><div class="name">Video Starts</div>');
              video[0].play();

              if (blocker != 1) {
                var timeout3 = setTimeout(function(){
                  if (blocker == 1) return;
                  self.addClass('state-3');

                  self.find('.video-state').html('<div class="arrow"></div><div class="icon icon-play"></div><div class="name">Video Plays</div>');
                  self.find('.percents').find('.percent').text('100%');

                  video.on('ended', function(){
                    self.find('.video-options').find('.option').removeClass('show active');
                    videoCover.slideUp(500, function(){
                      reset();
                    });
                  });
                  setTimeout(function(){
                    preventStarting = 0;
                  }, 10000);

                }, 4000);
              }
            }, 3000);
          }
        }, 1000);
      }

    });
    iPhoneLayer.on('mouseleave', function(){

        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        blocker = 1;
        reset();        

        preventStarting = 0;

      });
  }

  iPhoneAnimation(iPhone);

  $('.smartphone, .iph').find('.close').on('click', function(){
    $(this).parent().css('opacity', 0)
  });

  if ($('.media').length > 0) {
    var media = $('.media'),
        mediaTop = media.offset().top;

    $(window).on('scroll', function(){
      if ($(this).scrollTop() > mediaTop) {
        media.find('.block_cover').addClass('animate');
      }
    });
  }

  if (win.width() < 768) {
    $('.replacer').each(function(){
      $(this).attr('src', $(this).data('href'));
    });
  }

  win.on('load', function(){

    if ($('.place_slider .slider').length > 0) {
      var flkty = $('.place_slider .slider').flickity({
          cellAlign: 'center',
          wrapAround: true,
          contain: true,
          pageDots: false,
          arrowShape: { 
              x0: 10,
              x1: 60, y1: 50,
              x2: 65, y2: 45,
              x3: 20
          }
      });
      var flickity = flkty.data('flickity'),
          flktyButton = $('.place .buttons button');

      flkty.on('select.flickity', function(){
        flktyButton.removeClass('active');
        flktyButton.eq(flickity.selectedIndex).addClass('active');
      });

      flktyButton.on('click', function(){
          var self = $(this);

          flktyButton.removeClass('active');
          self.addClass('active');
          flkty.flickity('select', $(this).index());
      });
    }
    
    setTimeout(function(){
      $('.plugin .header .tablet_cover, .plugin .header .title').addClass('animate');

        setTimeout(function(){
          $('.perspective .img').addClass('animate');
          setTimeout(function(){
            $('.perspective .img').addClass('ready');
          }, 4000);
        },1000);
    }, 1000);
    win.on('scroll', function(){
      var scrolled = win.scrollTop();
      if (scrolled > 200) {
        $('.stars, .setup').addClass('animate');
      }
      if (win.width() > 1024) {
        if (scrolled >= $('.setup').offset().top) {
          $('.moon').addClass('animate');
        }
      }
      if (scrolled >= $('.place').offset().top) {
        $('.earth, .moon-2').addClass('animate');
      }
      if (win.scrollTop() >= $('.place').offset().top) {
        $('.earth, .moon-2').addClass('fixed');
      } else {
        $('.earth, .moon-2').removeClass('fixed animate');
      }
      $('.stars').css('transform', 'translateY('+ scrolled * 0.5 + 'px)');
    });
  });

});


































