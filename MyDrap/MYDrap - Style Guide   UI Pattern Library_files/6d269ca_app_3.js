/*
 * MyDrap.com
 *
 * Created: January 2014.
 * Authors: The "BaseEcommerce" team.
 *
 */


/* The document ready event executes already when the HTML-Document is loaded
   and the DOM is ready, even if all the graphics haven’t loaded yet.
 */
$(document).ready(function() {

    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    $('#stage').find('.carousel').carousel({ interval: 6000 });


    // DYNAMIC CENTERING
    // ==========================
    $('#content').find('.wrap-media-overlap .btn-info').each(function() {
        
        var $this = $(this),
            width = $this.outerWidth(),
            height = $this.outerHeight();

        $this.css({
            'margin-left': -(Math.round(width / 2)),
            'margin-top': -(Math.round(height / 2))
        });
        
    });


    // SLIDE TOGGLE EFFECT
    // ==========================
    $('.js-slide-toggle').find('.js-slide-toggle-trigger').click(function (event){

        // Caching variables
        var $this = $(this),
            arrow_icon = $this.find('i[class^="icon"]'),
            wrapper = $this.closest('.js-slide-toggle'),
            content = wrapper.find('.js-slide-toggle-content');

        if (!$this.is(':input')) {
            event.preventDefault();
        }

        // Slide toggle
        content.slideToggle();

        // Arrow switch
        if (arrow_icon.hasClass('icon-chevron-down-green-sm')) {
            arrow_icon
                .removeClass('icon-chevron-down-green-sm')
                .addClass('icon-chevron-right-green-sm');
        }
        else {
            arrow_icon
                .removeClass('icon-chevron-right-green-sm')
                .addClass('icon-chevron-down-green-sm');
        }
    });


    // UPDATE CHANGED QUANTITY OF PRODUCT IN CART
    // ============================================
    $('.js-item-cart-amount').on('change', function() {
        $(this).prop('disabled', true);
        var url = $(this).data('seturl');
        var value = $(this).val();
        $.post(url, { quantity: value } )
            .done(function() {
                location.reload();
            });
    });


    // REGISTER PAGE
    // ============================================
    $('input[id$="_deliveryInvoiceAddressAreSame"]').change(function(){

        var state = $(this).is(':checked');

        if (true == state) {
            $('#invoice-address')
                .removeClass('cart-delivery-data')
                .addClass('cart-delivery-data hidden');
        }
        else {
            $('#invoice-address')
                .removeClass('cart-delivery-data hidden')
                .addClass('cart-delivery-data');
        }
    });


    // HOTSPOTS with POPOVERS
    // ============================================
    $('[id^="hotspot-"]').click(function (event){

        // 1. Prevent default anchor behavior
        event.preventDefault();

        // 2. Caching variables        
        var $this = $(this),
            wrapper = $this.closest('.wrap-media'),
            wrapper_width = parseInt(wrapper.width()),
            wrapper_height = parseInt(wrapper.height()),
            this_x_pos = parseInt($this.css('left')),
            this_y_pos = parseInt($this.css('top')),
            this_width = parseInt($this.outerWidth()),
            this_height = parseInt($this.outerHeight()),
            this_icon = $this.find('.icon'),
            popover = $this.next('.brick-popover'),
            popover_width = parseInt(popover.outerWidth()),
            popover_height = parseInt(popover.outerHeight()),
            popover_x_offset = 25,
            popover_y_offset_top = 46,
            popover_y_offset_mid = 112,
            popover_y_offset_bot = 174;

        // 3. Popover positioning
        //
        //    Depending on trigger button initial position,
        //    the popover will be positioned and styled accordingly.
        //
        // VERTICAL positioning
        // If trigger button is on the TOP part of the image...
        if (parseInt(this_y_pos) < Math.round(wrapper_height / 2)) {
            popover
                .removeClass('brick-popover-t brick-popover-m brick-popover-b')
                .addClass('brick-popover-t')
                .css('top', parseInt(this_y_pos - popover_y_offset_top));
        // If trigger button is on the BOTTOM part of the image...
        } else if (parseInt(this_y_pos) > Math.round(wrapper_height / 2)) {
            popover
                .removeClass('brick-popover-t brick-popover-m brick-popover-b')
                .addClass('brick-popover-b')
                .css('top', parseInt(this_y_pos - popover_y_offset_bot));
        // If trigger button is on the MIDDLE part of the image...
        } else {
            popover
                .removeClass('brick-popover-t brick-popover-m brick-popover-b')
                .addClass('brick-popover-m')
                .css('top', parseInt(this_y_pos - popover_y_offset_mid));
        }
        //
        // HORIZONTAL positioning
        // If trigger button is on the LEFT part of the image...
        if (parseInt(this_x_pos) < Math.round(wrapper_width / 2)) {
            popover
                .removeClass('brick-popover-l brick-popover-r')
                .addClass('brick-popover-r')
                .css('left', parseInt(this_x_pos + this_width + popover_x_offset));
        // If trigger button is on the RIGHT part of the image...
        } else {
            popover
                .removeClass('brick-popover-l brick-popover-r')
                .addClass('brick-popover-l')
                .css('left', parseInt(this_x_pos - popover_width - popover_x_offset));
        }

        // 4. Popover visibility
        //
        //    4.1. Show/Hide the popover (which is invisible by default).
        //    4.2. Initially, popovers should be placed underneath
        //         trigger buttons, with 'z-index:-1', to allow
        //         trigger buttons to be pressed.
        //    4.3. Change trigger button icon.
        //    4.4. Disable non active trigger buttons.
        //
        if (this_icon.hasClass('icon-plus-sign-white')) {
            popover
                .css({
                    'opacity': 1, // 4.1
                    'z-index': 20 // 4.2
                });
            this_icon
                 // 4.3
                .removeClass('icon-plus-sign-white')
                .addClass('icon-minus-sign-white');
            $this
                // 4.4
                .siblings('[id^="hotspot-"]')
                .addClass('disabled');
        } else {
            popover
                .css({
                    'opacity': 0, // 4.1
                    'z-index': -1 // 4.2
                });
            this_icon
                // 4.3
                .removeClass('icon-minus-sign-white')
                .addClass('icon-plus-sign-white');
            $this
                // 4.4
                .siblings('[id^="hotspot-"]')
                .removeClass('disabled');
        }
        
    });

});


/* The window load event executes a bit later when the complete page
   is fully loaded, including all frames, objects and images.
 */
$(window).load(function() {

    //console.log('Window load!');

});
