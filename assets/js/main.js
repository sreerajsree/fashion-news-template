(function($) {
    "use strict";

    jQuery(document).ready(function($) {

        // JS for rtl
        var rtlEnable = $('html').attr('dir');
        var sliderRtlValue = !(typeof rtlEnable === 'undefined' || rtlEnable === 'ltr');
        var OwlRtlValue = !(typeof rtlEnable === 'undefined' || rtlEnable === 'ltr');

        /*-----------------------------------------
            global slick slicer control
        ------------------------------------------*/
        var globalSlickInit = $('.global-slick-init');

        if (globalSlickInit.length > 0) {
            //todo have to check slider item 

            $.each(globalSlickInit, function(index, value) {

                if ($(this).children('div').length > 1) {
                    //todo configure slider settings object
                    var sliderSettings = {};
                    var allData = $(this).data();


                    var infinite = typeof allData.infinite == 'undefined' ? false : allData.infinite;
                    var slidesToShow = typeof allData.slidestoshow == 'undefined' ? 1 : allData.slidestoshow;
                    var slidesToScroll = typeof allData.slidestoscroll == 'undefined' ? 1 : allData.slidestoscroll;
                    var speed = typeof allData.speed == 'undefined' ? '500' : allData.speed;
                    var dots = typeof allData.dots == 'undefined' ? false : allData.dots;
                    var cssEase = typeof allData.cssease == 'undefined' ? 'linear' : allData.cssease;

                    var prevArrow = typeof allData.prevarrow == 'undefined' ? '' : allData.prevarrow;
                    var nextArrow = typeof allData.nextarrow == 'undefined' ? '' : allData.nextarrow;
                    var centerMode = typeof allData.centermode == 'undefined' ? false : allData.centermode;
                    var centerPadding = typeof allData.centerpadding == 'undefined' ? false : allData.centerpadding;
                    var rows = typeof allData.rows == 'undefined' ? 1 : parseInt(allData.rows);
                    var autoplaySpeed = typeof allData.autoplayspeed == 'undefined' ? 2000 : parseInt(allData.autoplayspeed);
                    var lazyLoad = typeof allData.lazyload == 'undefined' ? false : allData.lazyload; // have to remove it from settings object if it undefined
                    var appendDots = typeof allData.appenddots == 'undefined' ? false : allData.appenddots;
                    var appendArrows = typeof allData.appendarrows == 'undefined' ? false : allData.appendarrows;
                    var asNavFor = typeof allData.asnavfor == 'undefined' ? false : allData.asnavfor;
                    var fade = typeof allData.fade == 'undefined' ? false : allData.fade;
                    var responsive = typeof $(this).data('responsive') == 'undefined' ? false : $(this).data('responsive');

                    //slider settings object setup
                    sliderSettings.infinite = infinite;
                    sliderSettings.slidesToShow = slidesToShow;
                    sliderSettings.slidesToScroll = slidesToScroll;
                    sliderSettings.speed = speed;
                    sliderSettings.dots = dots;
                    sliderSettings.cssEase = cssEase;
                    sliderSettings.prevArrow = prevArrow;
                    sliderSettings.nextArrow = nextArrow;
                    sliderSettings.rows = rows;
                    sliderSettings.autoplaySpeed = autoplaySpeed;

                    if (typeof centerMode != false) {
                        sliderSettings.centerMode = centerMode;
                    }
                    if (typeof centerPadding != false) {
                        sliderSettings.centerPadding = centerPadding;
                    }
                    if (typeof lazyLoad != false) {
                        sliderSettings.lazyLoad = lazyLoad;
                    }
                    if (typeof appendDots != false) {
                        sliderSettings.appendDots = appendDots;
                    }
                    if (typeof appendArrows != false) {
                        sliderSettings.appendArrows = appendArrows;
                    }

                    if (typeof asNavFor != false) {
                        sliderSettings.asNavFor = asNavFor;
                    }
                    if (typeof fade != false) {
                        sliderSettings.fade = fade;
                    }
                    if (typeof responsive != false) {
                        sliderSettings.responsive = responsive;
                    }
                    console.log(sliderSettings)
                    $(this).slick(sliderSettings);
                }
            });
        }


        /* Mobile Navigation
          -------------------------------------------------------*/
        var $sidenav = $('#sidenav'),
            $mainContainer = $('#main-container'),
            $navIconToggle = $('.nav-icon-toggle'),
            $navHolder = $('.nav__holder'),
            $contentOverlay = $('.content-overlay'),
            $htmlContainer = $('html'),
            $sidenavCloseButton = $('#sidenav__close-button');


        $navIconToggle.on('click', function(e) {
            e.stopPropagation();
            $(this).toggleClass('nav-icon-toggle--is-open');
            $sidenav.toggleClass('sidenav--is-open');
            $contentOverlay.toggleClass('content-overlay--is-visible');
            // $htmlContainer.toggleClass('oh');
        });

        function resetNav() {
            $navIconToggle.removeClass('nav-icon-toggle--is-open');
            $sidenav.removeClass('sidenav--is-open');
            $contentOverlay.removeClass('content-overlay--is-visible');
            // $htmlContainer.removeClass('oh');
        }

        function hideSidenav() {
            if (minWidth(992)) {
                resetNav();
                setTimeout(megaMenu, 500);
            }
        }

        $contentOverlay.on('click', function() {
            resetNav();
        });

        $sidenavCloseButton.on('click', function() {
            resetNav();
        });


        var $dropdownTrigger = $('.nav__dropdown-trigger'),
            $navDropdownMenu = $('.nav__dropdown-menu'),
            $navDropdown = $('.nav__dropdown');


        if ($('html').hasClass('mobile')) {

            $('body').on('click', function() {
                $navDropdownMenu.addClass('hide-dropdown');
            });

            $navDropdown.on('click', '> a', function(e) {
                e.preventDefault();
            });

            $navDropdown.on('click', function(e) {
                e.stopPropagation();
                $navDropdownMenu.removeClass('hide-dropdown');
            });
        }


        /* Sidenav Menu
        -------------------------------------------------------*/
        $('.sidenav__menu-toggle').on('click', function(e) {
            e.preventDefault();

            var $this = $(this);

            $this.parent().siblings().removeClass('sidenav__menu--is-open');
            $this.parent().siblings().find('li').removeClass('sidenav__menu--is-open');
            $this.parent().find('li').removeClass('sidenav__menu--is-open');
            $this.parent().toggleClass('sidenav__menu--is-open');

            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show').slideUp(350);
            } else {
                $this.parent().parent().find('li .sidenav__menu-dropdown').removeClass('show').slideUp(350);
                $this.next().toggleClass('show').slideToggle(350);
            }
        });





        /*------------------------------
            Recent Stories Slick Slider
        -------------------------------*/
        $('.popular-stories-index-01-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false,
            slidesToScroll: 1,
            pauseOnHover: true,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="font-size-2-5 las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="font-size-2-5 las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /*------------------------------
            Recent Stories Slick Slider
        -------------------------------*/
        $('.popular-stories-index-02-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            arrows: true,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /*------------------------------
            weekly highlight Slick Slider
        -------------------------------*/
        $('.weekly-highlights-index-01-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            dots: false,
            slidesToScroll: 1,
            pauseOnHover: true,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="font-size-2-5 las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="font-size-2-5 las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });




        /*------------------------------------------------------------------
            latest video index-02 Slick Slider
         -------------------------------------------------------------------*/
        $('.latest-video-index-02-slider-inst, .popular-video-index-04-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 700,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="bx bxs-left-arrow"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="bx bxs-right-arrow"></i></div>',

            responsive: [{
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                }
            }]
        });


        /*------------------------------------------------------------------
            popular stories index-03 Slick Slider
        -------------------------------------------------------------------*/
        $('.popular-stories-index-03-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 500,
            arrows: true,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /*------------------------------------------------------------------
            popular stories index-04 Slick Slider
         -------------------------------------------------------------------*/
        $('.popular-news-index-04-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 500,
            arrows: true,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /*------------------------------------------------------------------
            popular stories index-04 Slick Slider
         -------------------------------------------------------------------*/
        $('.sports-update-news-index-05-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /*------------------------------------------------------------------
            feature news index-04 Slick Slider
         -------------------------------------------------------------------*/
        $('.feature-news-index-04-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            arrows: true,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });

        /*------------------------------------------------------------------
            feature news index-04 Slick Slider
         -------------------------------------------------------------------*/
        $('.header-recent-post-index-05-slider-inst').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            dots: false,
            autoplay: false,
            cssEase: 'linear',
            prevArrow: '<div class="prev-arrow"><i class="las la-arrow-left"></i></div>',
            nextArrow: '<div class="next-arrow"><i class="las la-arrow-right"></i></div>',

            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 451,
                    settings: {
                        slidesToShow: 1,
                    }
                },

            ]
        });

        /*------------------------------------------------------------------
            author feedback
         -------------------------------------------------------------------*/
        $('.authors-feedback-slider').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            dots: true,
            autoplay: true,
            cssEase: 'linear',
        });

        /*------------------------------------------------------------------
            partner with
         -------------------------------------------------------------------*/
        $('.partner-with-slider').slick({
            infinite: true,
            rtl: OwlRtlValue,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 400,
            arrows: false,
            dots: false,
            autoplay: true,
            cssEase: 'linear',

            responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                    }
                },

            ]
        });



    });


    /*------------------------------
           Scroll to top
    -------------------------------*/

    // Go to Top JS
    // Scroll Event
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });

    // Click Event JS
    $('.go-top').on('click', function() {
        $("html, body").animate({ scrollTop: "0" }, 100);
    });


    $(window).on('load', function() {

        /*------------------------------
           Preloader
        -------------------------------*/

        $('.preloader-inner').fadeOut(1000);
    });

}(jQuery));


/*------------------------------
       Shop View Details
-------------------------------*/

var sandwiches = document.querySelectorAll('.zoom-js-handle');

sandwiches.forEach(function(sandwich, index) {
    sandwich.addEventListener('mousemove', function(e) {
        zoomin(e)
    })
    sandwich.addEventListener('mouseleave', function(e) {
        var zoomer = e.currentTarget;
        zoomer.style.backgroundImage = '';
    })
});

function zoomin(e) {
    var zoomer = e.currentTarget;
    zoomer.style.backgroundImage = 'url(' + zoomer.getAttribute('data-src') + ')';
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX / zoomer.offsetWidth * 100
    y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}





/*------------------------------
       Scroll Bar
-------------------------------*/
const scrollProgress = () => {
    return {
        init() {
            window.addEventListener('scroll', () => {
                let winScroll = document.body.scrollTop || document.documentElement.scrollTop
                let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
                this.percent = Math.round((winScroll / height) * 100)
            })
        },
        circumference: 30 * 2 * Math.PI,
        percent: 0,
    }
}


/*------------------------------
       Lazy Load
-------------------------------*/
// $(".lazy").Lazy({
//     scrollDirection: 'vertical',
//     effect: "fadeIn",
//     effectTime: 500,
//     threshold: 0,
//     visibleOnly: false,
//     onError: function(element) {
//         console.log('error loading ' + element.data('src'));
//     }
// });


// $(window).on('load', function() {
//     setTimeout(function() {
//         $('#ex1').modal('show');
//     }, 40000);

// });