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

  function setTouchClass() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          $('html').addClass('touch-device');
      }
      else {
        $('html').addClass('no-touch-device');
      }
  }
  setTouchClass();


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

    // Top

    $('[js-up]').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1200);
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
    }).on('mouseleave', 'a[data-for='+ dropTarget +']', function(){
      $(linkedDrop).removeClass('is-active')
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


  // --------------------------------------------------------------------------
  // Tabs
  // --------------------------------------------------------------------------

  $('.js-tabs__menu').on('click', 'li:not(.active)', function() {
      $(this).addClass('is-active').siblings().removeClass('is-active')
      .closest('.js-tabs').find('.js-tabs__panel').removeClass('is-active').eq($(this).index()).addClass('is-active');
  });

  // --------------------------------------------------------------------------
  // Lk
  // --------------------------------------------------------------------------

  $('.lk__orders-group').on('click', '.lk__orders-group-trigger', function() {
      if ($(this).closest('.lk__orders-group').is('.is-open')) {
        $(this).closest('.lk__orders-group').removeClass('is-open').find('.lk__orders-group-content').hide();
      }
      else {
        $('.lk__orders-group').removeClass('is-open').find('.lk__orders-group-content').hide();
        $(this).closest('.lk__orders-group').addClass('is-open').find('.lk__orders-group-content').show()
      }

  });

  // --------------------------------------------------------------------------
  // Sorting
  // --------------------------------------------------------------------------

  $('.sorting__select').on('click', '.sorting__select-trigger', function(event) {
      event.preventDefault();
      if ($(this).is('.is-active')) {
          $(this).removeClass('is-active').closest('.sorting__select').removeClass('is-open');
      }
      else {
          $(this).addClass('is-active').closest('.sorting__select').addClass('is-open');
      }
  });

  $('.sorting__select').on('click', '.sorting__select-option', function(event) {
      event.preventDefault();
      $('.sorting__select-option').removeClass('is-active');
      $(this).addClass('is-active');
      var selected = $(this).text();

      $('.sorting__select-trigger').text(selected);
      alert(selected)
  });

  $('body').on( 'click', function(event) {

    if($(event.target).closest('.sorting__select').length==0) {

      $('.sorting__select, .sorting__select-trigger').removeClass('is-open is-active');

    }
  });

  // --------------------------------------------------------------------------
  // Filter
  // --------------------------------------------------------------------------

  $('.filter').on('click', '.filter__toggle', function(event) {
      event.preventDefault();
      if ($(this).is('.is-active') ) {
          $(this).removeClass('is-active').text('Показать фильтр');
          $('.filter__dropdown').slideUp('fast')
      }
      else {
          $(this).addClass('is-active').text('Скрыть фильтр');
          $('.filter__dropdown').slideDown('fast')
      }
  });


  $('.filter-group').on('change', 'input', function(event) {

        var group = $(this).closest('.filter-group'),
            groupLength = group.find('input:checked').length;
        if(groupLength >= 1)
            group.addClass('is-change');
        else {
            group.removeClass('is-change');
        }


  });

  $('.filter-group').on('change', 'input[type=range]', function(event) {

        var group = $(this).closest('.filter-group');

        group.addClass('is-change');

  });

  $('.filter-group').on('click', '.filter-group__reset', function(event) {
        event.preventDefault();

        var group = $(this).closest('.filter-group');

        group.removeClass('is-change').find('input:checked').prop('checked', false);
        group.find('input[type=range]').data("ionRangeSlider").update({
            from: 3000,
            to: 25000
        });
        group.removeClass('is-change');
  });

  $('.filter-group').on('click', '.filter-group__btn', function(event) {
      event.preventDefault();
      if ($(this).closest('.filter-group').find('.filter-group__content').is(':hidden') ) {
          $(this).closest('.filter-group').removeClass('is-open').find('.filter-group__content').slideDown('fast');
      }
      else {
          $(this).closest('.filter-group').addClass('is-open').find('.filter-group__content').slideUp('fast');
      }
  });

  $('.filter').on('click', '.btn-reset', function(event) {
    $('.filter-group').find('input[type=range]').data("ionRangeSlider").update({
        from: 3000,
        to: 25000
    });
    $('.filter-group').removeClass('is-change');
  });

  // benefits-slides
  $('[data-benefits-slides]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    dots: true
  });

  // c-card-slides
  $('[data-card]').each(function(){

      var card = $(this),
          cardSlides = card.find('[data-card-slides]'),
          cardThumbs = card.find('[data-card-thumbs]');

      cardSlides.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: cardThumbs,
        infinite: true,
         responsive: [
          {breakpoint: 767,
            settings: {fade: false}
          }
        ]
      });
      cardThumbs.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: cardSlides,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        vertical: true,
        arrows: true,
        centerPadding: '80px',
      });
    });


  $('[data-gallery]').each(function(){

      var gallery = $(this),
          gallerySlides = gallery.find('[data-gallery-slides]'),
          galleryThumbs = gallery.find('[data-gallery-thumbs]');

      gallerySlides.on('init afterChange', function(event, slick, currentSlide, nextSlide){
        $('[data-color]').removeClass('is-active').eq(slick.currentSlide).addClass('is-active');
      });

      gallerySlides.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: galleryThumbs,
        infinite: true,
        mobileFirst: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 568,
            settings: {
              fade: true
            }
          },
          {
            breakpoint: 992,
            settings: {
              fade: true,
              adaptiveHeight: false
            }
          }
        ]
      });

      galleryThumbs.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: gallerySlides,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        vertical: false,
        arrows: true,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 568,
            settings: {
              vertical: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              vertical: false
            }
          },
          {
            breakpoint: 992,
            settings: {
              vertical: true
            }
          }
        ]
      });
  });


  $('[data-color]').on('click', function(event) {
    event.preventDefault();

    var dataColor = $(this).data('color'),
        dataIndex = $(this).index();

      if(dataColor === '') dataColor = 'Цвет не указан'

      $('[data-color]').removeClass('is-active').eq(dataIndex).addClass('is-active');
      $('[data-color-selected]').text(dataColor);
      $('[data-gallery-slides]').slick('slickGoTo', dataIndex);

  });


  // elevate zoom

  function initElevateZoom(){
    var zoomObj = $('[data-zoom-image]');
    var zoomOpt = {
        zoomActivation: "hover",
        zoomEnabled: true,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: false,
        scrollZoomIncrement: 0.1,
        minZoomLevel: false,
        maxZoomLevel: false,
        easing: false,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: false,
        lensFadeOut: false,
        debug: false,
        zoomWindowFadeIn: false,
        zoomWindowFadeOut: false,
        zoomWindowAlwaysShow: false,
        zoomTintFadeIn: false,
        zoomTintFadeOut: false,
        borderSize: 2,
        showLens: true,
        borderColour: "#FF8F5B",
        lensBorderSize: 1,
        lensBorderColour: "#FF8F5B",
        lensShape: "round",
        zoomType: "lens",
        containLensZoom: false,
        lensColour: "white", //colour of the lens background
        lensOpacity: 0.4, //opacity of the lens
        lenszoom: false,
        tint: false, //enable the tinting
        tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
        tintOpacity: 0.4, //opacity of the tint
        gallery: false,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: false,
        constrainType: false,  //width or height
        constrainSize: false,  //in pixels the dimensions you want to constrain on
        loadingIcon: false, //http://www.example.com/spinner.gif
        cursor:"pointer",
        responsive: true
    }

    if ( _window.width() > 768 ){
      zoomObj.elevateZoom(zoomOpt);
    } else {
      $('.zoomContainer').remove();
      zoomObj.removeData('elevateZoom');
      zoomObj.removeData('zoomImage');
    }
  }

  initElevateZoom();

  _window.resized(300, initElevateZoom)


  $('[data-gallery-slides]').on('mouseover', '[data-slick-index]', function(event) {
      event.preventDefault();
      var dataIndex = $(this).data('slick-index');

      $('.zoomContainer').removeClass('is-visible').eq(dataIndex).addClass('is-visible')
  });


  $(document).on('click', '.zoomContainer', function(event) {
      event.preventDefault();
      var zoomIndex = $(this).index() -3;

      $('[data-slick-index="' + zoomIndex + '"]').find('[data-mfp-galllery]').trigger('click');

  });


  $('[data-mfp-galllery]').magnificPopup({
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    tLoading: 'Загрузка #%curr%...',
    mainClass: 'mfp-with-scale',
    removalDelay: 300,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1],
      tPrev: 'Назад', // title for left button
      tNext: 'Вперед', // title for right button
      tCounter: '<span class="mfp-counter"><span>%curr%</span> из %total%</span>'
    },
    image: {
      verticalFit: true,
      tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.'
    }
  });





  // --------------------------------------------------------------------------
  // Formstyler
  // --------------------------------------------------------------------------

  $('.ui-select, .ui-number').styler({
      selectSmartPositioning: false,
      selectSearch: false,
      selectVisibleOptions: 0,
      selectSearchLimit: 6
  });

  // --------------------------------------------------------------------------
  // Range
  // --------------------------------------------------------------------------

  $('.ui-range__input').ionRangeSlider({
      type: "double",
      from: 0,
      step: 1,
      hide_min_max: true,
      hide_from_to: true,
      force_edges: true,
      grid: false
  });


  $('.ui-range__input').on('change', function(event) {
      event.preventDefault();

      var range = $(this),
          rangeData = range.data("ionRangeSlider"),
          rangeDataFrom = range.data("from"),
          rangeDataTo = range.data("to");

      range.closest('.ui-range').find('.ui-range__from').text(rangeDataFrom)
      range.closest('.ui-range').find('.ui-range__to').text(rangeDataTo)
      // .closest('.app-range').find('.app-range-data').text(rangeDataFrom + ' - ' + rangeDataTo)

  });

  $('.card__details').find('dt:first-child').addClass('is-active').next('dd').show();

  $('.card__details').on('click', 'dt', function(event) {
    event.preventDefault();
    if ($(this).is('.is-active')) {
        $(this).removeClass('is-active').next('dd').slideUp('fast');
    }
    else {
        $('.card__details').find('dt').removeClass('is-active').next('dd').slideUp('fast');

        $(this).addClass('is-active').next('dd').slideDown('fast');
    }
  });



  //////////
  // MODALS
  //////////

  // Magnific Popup
  // var startWindowScroll = 0;
  $('[js-popup]').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'scroll',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'popup-buble',
    // gallery: {
    //   enabled: true,
    //   navigateByImgClick: true,
    //   preload: [0,1],
    //   tPrev: 'Назад', // title for left button
    //   tNext: 'Вперед', // title for right button
    //   tCounter: '<span class="mfp-counter"><span>%curr%</span> из %total%</span>'
    // },
    callbacks: {

      beforeOpen: function() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
        $('[data-benefits-slides]').slick('slickGoTo', $.magnificPopup.instance.index );
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  $('[js-popup-gallery]').magnificPopup({
		delegate: 'a',
		type: 'image',
    closeOnContentClick: false,
		closeBtnInside: false,
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-with-zoom mfp-img-mobile',
    removalDelay: 300,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [1,1]
		},
		image: {
      verticalFit: true,
			tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.',
      tCounter: '<span class="mfp-counter"><span>%curr%</span> из %total%</span>'
		},
    zoom: {
			enabled: true,
			duration:300,
      easing: 'ease-out', // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
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
