const h4Elements = document.querySelectorAll('.lm-info-block h4');

function resizeText() {
    h4Elements.forEach(h4 => {
        const parentWidth = h4.parentElement.clientWidth;
        let fontSize = parseInt(window.getComputedStyle(h4).fontSize);

        h4.style.fontSize = fontSize + "px";

        while (h4.scrollWidth > parentWidth && fontSize > 10) {
            fontSize -= 1;
            h4.style.fontSize = fontSize + "px";
        }
    });
}

function onSubmit() {
     $("#contact_form").submit();
}

window.addEventListener('load', resizeText);
window.addEventListener('resize', resizeText);

(function($) {
"use strict";

    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 1025) {
            siteHeader.addClass('mobile-menu-hide');
            $('.menu-toggle').removeClass('open');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }

    function customScroll() {
        var windowWidth = $(window).width();
        if (windowWidth > 1024) {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar();
            });
        } else {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar('destroy');
            });
        }
    }

    $(function () {
      var myForm = $('#contact_form');

      myForm.on('submit', function (e) {
        e.preventDefault(); // empêche l'envoi classique

        grecaptcha.ready(function() {
          grecaptcha.execute('6Les66kUAAAAANyLrgkl7iuN4JUpNlB5upaMovI4', {action: 'submit'}).then(function(token) {
            $('#g-recaptcha-response').val(token);

            // envoi AJAX vers Basin
            $.ajax({
              type: "POST",
              url: "https://usebasin.com/f/d3e2b3499d06",
              data: myForm.serialize(),
              dataType: "json",
              headers: { "Accept": "application/json" },
              success: function () {
                var alertBox = '<div class="alert alert-success">' +
                               '✅ Votre message a bien été envoyé, merci !' +
                               '</div>';
                myForm.find('.messages').html(alertBox);
                myForm[0].reset();
              },
              error: function () {
                var alertBox = '<div class="alert alert-danger">' +
                               '❌ Une erreur est survenue. Veuillez réessayer plus tard.' +
                               '</div>';
                myForm.find('.messages').html(alertBox);
              }
            });
          });
        });
      });
    });


    $(window)
        .on('load', function() {
            $(".preloader").fadeOut( 800, "linear" );

            var ptPage = $('.animated-sections');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.main-menu',
                });
            }
        })
        .on('resize', function() {
             mobileMenuHide();
             $('.animated-section').each(function() {
                $(this).perfectScrollbar('update');
            });
            customScroll();
        });

    $(document).ready(function () {
        var movementStrength = 23;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();
        $("body").on('mousemove', function(e){
            var pageX = e.pageX - ($(document).width() / 2),
                pageY = e.pageY - ($(document).height() / 2),
                newvalueX = width * pageX * -1,
                newvalueY = height * pageY * -1,
                elements = $('.lm-animated-bg');

            elements.addClass('transition');
            elements.css({
                "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
            });

            setTimeout(function() {
                elements.removeClass('transition');
            }, 300);
        })

        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
            $('.menu-toggle').toggleClass('open');
        });

        $('.main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        customScroll();

        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'animated-section-scaleDown',
            animateIn: 'animated-section-scaleUp'
        });


        $(".organizations.owl-carousel").imagesLoaded().owlCarousel({
            nav: true,
            items: 2,
            loop: false,
            navText: false,
            margin: 10,
            autoHeight: true,
            responsive : {
                0 : {
                    items: 2,
                },
                768 : {
                    items: 4,
                },
                1200 : {
                    items: 5,
                }
            }
        });

        $('.form-control')
            .val('')
            .on("focusin", function(){
                $(this).parent('.form-group').addClass('form-group-focus');
            })
            .on("focusout", function(){
                if($(this).val().length === 0) {
                    $(this).parent('.form-group').removeClass('form-group-focus');
                }
            });

        $('.messages').on('click', '.close', function(){
            $(this).parent().remove();
        });
    });

})(jQuery);
