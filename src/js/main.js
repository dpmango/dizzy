$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  // IE Fixes
  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true
    } else {
      return false
    }
  }

  if ( msieversion() ){
    $('body').addClass('is-ie');
  }

  var media = {
    tablet: 768,
    desktop: 1024
  }

  //////////
  // COMMON
  //////////

  // svg support for laggy browsers
  svg4everybody();

  // viewport buggyfill
  viewportUnitsBuggyfill.init({
    force: true,
    refreshDebounceWait: 250
  });


 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
      var el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
	});

  // FOOTER REVEAL
  function revealFooter() {
    var footer = $('[js-reveal-footer]');
    if (footer.length > 0) {
      var footerHeight = footer.outerHeight();
      var maxHeight = _window.height() - footerHeight > 100;
      if (_window.width() > media.tablet && maxHeight && !msieversion() ) {
        $('body').css({
          'margin-bottom': footerHeight
        });
        footer.css({
          'position': 'fixed',
          'z-index': -10
        });
      } else {
        $('body').css({
          'margin-bottom': 0
        });
        footer.css({
          'position': 'static',
          'z-index': 10
        });
      }
    }
  }
  revealFooter();
  _window.resized(100, revealFooter);

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if ( vScroll > headerHeight ){
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if ( vScroll > heroHeight ){
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // PRELOADER
  // simple fadein 0 to 1 just to prevent elements poping onload
  $('.page').addClass('is-ready')

  // HEADER COLOR CLASS
  if ( $('.inner').length ){
    $('.header').addClass('header--inner');
    $('.navi').addClass('navi--inner');
  }

  // HAMBURGER TOGGLER
  $('[js-hamburger-menu]').on('click', function(){
    $(this).toggleClass('is-active');
    $('.mobile-navi').toggleClass('is-active');
    $('.header').toggleClass('header--showing-menu')
  });

  // MOBILE MENU
  function closeHamburger(){
    $('[js-hamburger-menu]').removeClass('is-active')
    $('.mobile-navi').removeClass('is-active');
    $('.header').removeClass('header--showing-menu')
  }

  $('.page__content').click(function(event) {
    closeHamburger();
  });

  _window.resized(100, function(){
    if (_window.width() > media.tablet){
      closeHamburger();
    }
  })

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.navi__menu li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('is-active');
    } else {
      $(val).removeClass('is-active')
    }
  });

  // HEADER NAVI DROPDOWN
  $('[js-navi-drop]').each(function(i, val){
    var self = $(val);

    var dropTarget = self.data('for');
    var linkedDrop = '[data-drop='+ dropTarget +']'

    $('.navi__menu').on('mouseenter', 'a[data-for='+ dropTarget +']', function(){
      $(linkedDrop).addClass('is-active')
    });

    $(document).on('mouseenter', linkedDrop, function(){
      $(linkedDrop).addClass('is-active')
    });

    $(document).on('mouseleave', linkedDrop, function(){
      $(linkedDrop).removeClass('is-active')
    });

  })

  // HEADER PROFILE DROP
  $('.header__profile').hover(function(){
    $('.header__profile-dropdown').addClass('is-active')
  }, function(){
    $('.header__profile-dropdown').removeClass('is-active')
  });

  // HEADER SEARCH
  $(document).on('click', '[js-header-search]', function(e){
    console.log('clicked');
    if ( $(this).is('is-active') ){

    } else {
      $(this).addClass('is-active')
      e.preventDefault();
    }
  })

  $('[js-header-search]').on('submit', function(e){
    // search submit handler
    e.preventDefault();
  })

  $(document).click(function(event) {
    if ( !$(event.target).closest('[js-header-search]').length ) {
      $('[js-header-search]').removeClass('is-active');
    }
  });



  //////////
  // HOMEPAGE
  //////////

  // BENEFITS
  $('.benefits__card').on('click', function(e){
    if ( _window.width() < media.tablet ){
      $(this).find('.benefits__card-plus').click();
    }
  })



  //////////
  // SLIDERS
  //////////
  function initHeroSlider(){
    $('[js-hero-slider]').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      fade: true,
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      accesability: false,
      variableHeight: false
    });
  }
  initHeroSlider();


  $('[js-slider]').each(function(i, val) {
    var self = $(val);

    // sets current slider
    self.on('init', function(slick) {
      $(slick.target).attr('data-current-slide', 1);
    })

    var slickOptions = {
      autoplay: self.data('slick-autoplay') !== undefined ? self.data('slick-autoplay') : false,
      dots: self.data('slick-dots') !== undefined ? self.data('slick-dots') : false,
      arrows: self.data('slick-arrows') !== undefined ? self.data('slick-arrows') : false,
      infinite: self.data('slick-infinite') !== undefined ? self.data('slick-infinite') : false,
      speed: 300,
      accessibility: false,
      adaptiveHeight: true,
      slidesToShow: self.data('slick-slides') !== undefined ? self.data('slick-slides') : true,
      draggable: self.data('slick-controls') !== undefined ? self.data('slick-controls') : true,
      swipe: self.data('slick-controls') !== undefined ? self.data('slick-controls') : true,
      swipeToSlide: self.data('slick-controls') !== undefined ? self.data('slick-controls') : true,
      touchMove: self.data('slick-controls') !== undefined ? self.data('slick-controls') : true,
      responsive: [
        {breakpoint: 1100,
          settings: {slidesToShow: 5}
        },
        {breakpoint: 992,
          settings: {slidesToShow: 4}
        },
        {breakpoint: 768,
          settings: {slidesToShow: 3}
        },
        {breakpoint: 568,
          settings: {slidesToShow: 2}
        },
        {breakpoint: 414,
          settings: {slidesToShow: 1}
        },
      ]
    }

    self.slick(slickOptions);

    // adds global class
    self.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      slick.$slider.attr('data-current-slide', nextSlide + 1);
    });

  });

  $('[js-slick-next]').on('click', function() {
    $(this).closest('[js-slider]').slick("slickNext");
  });

  $('[js-slick-prev]').on('click', function() {
    $(this).closest('[js-slider]').slick("slicPrev");
  })


  //////////
  // MODALS
  //////////

  // Magnific Popup
  // var startWindowScroll = 0;
  $('[js-popup]').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'popup-buble',
    callbacks: {
      beforeOpen: function() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  $('[js-popup-gallery]').magnificPopup({
		delegate: 'img',
		type: 'image',
    closeOnContentClick: false,
		closeBtnInside: false,
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
      verticalFit: true,
			tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.'
		},
    zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			// opener: function(element) {
			// 	return element.find('img');
			// }
		}
	});


  // TELEPORT PLUGIN
  $('[js-teleport]').each(function(i, val) {
    var self = $(val)
    var objHtml = $(val).html();
    var target = $('[data-teleport-target=' + $(val).data('teleport-to') + ']');
    var conditionMedia = $(val).data('teleport-condition').substring(1);
    var conditionPosition = $(val).data('teleport-condition').substring(0, 1);

    if (target && objHtml && conditionPosition) {
      _window.resized(100, function() {
        teleport()
      })

      function teleport() {
        var condition;

        if (conditionPosition === "<") {
          condition = _window.width() < conditionMedia;
        } else if (conditionPosition === ">") {
          condition = _window.width() > conditionMedia;
        }

        if (condition) {
          target.html(objHtml)
          self.html('')
        } else {
          self.html(objHtml)
          target.html("")
        }

      }

      teleport();
    }
  })

  // TABS PLUGIN
  $('[js-tab]').each(function(i, val) {
    var self = $(val);

    self.on('click', function() {
      var clickedTab = self.data('tab-for');
      var targetTab = $('[data-tab=' + clickedTab + ']');

      if (targetTab) {
        targetTab.siblings().removeClass('is-active');
        self.siblings().removeClass('is-active');

        targetTab.addClass('is-active');
        self.addClass('is-active');
      }

    })
  });

  ////////////
  // UI
  ////////////
  //
  // // handle outside click
  // $(document).click(function (e) {
  //   var container = new Array();
  //   container.push($('.ui-select'));
  //
  //   $.each(container, function(key, value) {
  //       if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
  //           $(value).removeClass('active');
  //       }
  //   });
  // });

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });

  // textarea autoExpand
  $(document).one('focus.js-autoExpand', 'textarea.js-autoExpand', function(){
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  }).on('input.js-autoExpand', 'textarea.js-autoExpand', function(){
    var minRows = this.getAttribute('data-min-rows')|0, rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });


  // Masked input
  $(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});

});

// YANDEX MAPS
ymaps.ready(initMap);
var myMap, myPlacemark, myMap2, myPlacemark2

function initMap(){
  myMap = new ymaps.Map("footerMap", {
    center: [55.739483, 37.719603],
    zoom: 14
  });

  // myMap.controls.remove('zoomControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('routeEditor');

  myMap.behaviors.disable('scrollZoom');

  myPlacemark = new ymaps.Placemark([55.739483, 37.719603], {
    hintContent: 'Наш офис'
  },
  {
    iconLayout: 'default#image',
    iconImageHref: 'img/el/marker.png',
    iconImageSize: [50, 70],
    iconImageOffset: [-10, -50]
  });

  myMap.geoObjects.add(myPlacemark);

  // CONTACT MAP ::

  if ( $('#contactMap').length ){
    myMap2 = new ymaps.Map("contactMap", {
      center: [55.739483, 37.719603],
      zoom: 14
    });

    // myMap.controls.remove('zoomControl');
    myMap2.controls.remove('trafficControl');
    myMap2.controls.remove('searchControl');
    myMap2.controls.remove('fullscreenControl');
    myMap2.controls.remove('rulerControl');
    myMap2.controls.remove('geolocationControl');
    myMap2.controls.remove('routeEditor');

    myMap2.behaviors.disable('scrollZoom');

    myPlacemark2 = new ymaps.Placemark([55.739483, 37.719603], {
      hintContent: 'Наш офис'
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/el/marker.png',
      iconImageSize: [50, 70],
      iconImageOffset: [-10, -50]
    });

    myMap2.geoObjects.add(myPlacemark2);
  }

}
