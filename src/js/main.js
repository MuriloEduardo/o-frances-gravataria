$(document).ready(function() {

    let previousScroll = 0,
        body = $('body'),
        onTop = function(top) {

            if (top < 100) {
                body.addClass('top');
            } else {
                body.removeClass('top');
            }
        };

    onTop($(this).scrollTop());

    $(window).scroll(function() {
        
        let el = $(this),
            top = el.scrollTop();

        if (top > previousScroll) {
            body.addClass('down').removeClass('up');
        } else {
            body.addClass('up').removeClass('down');
        }

        onTop(top);
        previousScroll = top;
    });

    $('.dropdown a').on('click', function(e) {

        console.log(e.target)
        
        let self = $(e.target),
            openeds = $('.dropdown.dropdown-open a');

        self.removeClass('dropdown-open');

        openeds
            .parents('body, .dropdown, nav')
            .removeClass('dropdown-open')
            .find('.dropdown-menu')
            .not('#' + self.data('menu'))
            .slideUp();

        self.parents('body, .dropdown, nav')
            .addClass('dropdown-open')
            .find('#' + self.data('menu'))
            .slideToggle();
    });

    let mmenu = $('#mmenu'),
        icon = $('#toggle-menu');

    mmenu.mmenu({
        navbar: {
            title: 'My photos'
         },
         navbars: [{
            position: 'top'
         }]
    }, {
        offCanvas: {
            pageSelector: '#wraper'
        },
        classNames: {
            vertical: 'expand'
        }
    });

    let API = mmenu.data('mmenu');

    icon.on('click', function() {
        $(this).addClass('menu-is-open');
        API.open();
    });

    $(this).on('click', '.menu-is-open', function() {
        $(this).removeClass('menu-is-open');
        API.close();
    });

    API.bind('open:finish', function() {
        icon.addClass('is-active');
    });

    API.bind('close:finish', function() {
        icon.removeClass('is-active');
    });

    $('nav#primary').mhead();

    new WOW().init();
})
