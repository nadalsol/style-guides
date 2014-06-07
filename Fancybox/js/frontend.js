// **********************************
// Frontend - FancyBox
// **********************************

/*
function hideCheckoutSteps()
{
    $('#js-checkout-steps > div').each(function() {
        if (!$(this).hasClass('active')) {
            $(this).find('.content').hide();
        }
    });
}*/

/*
function createCheckoutStepsBindings()
{
    $('#js-checkout-steps').find('.title').click(function (event) {
        event.preventDefault();

        ///If Terms&Conditions checkbox is not CHECKED, avoid unfold of more checkout sections
        if(!$("#cgv").is(":checked")) {
            $(".js-terms-agreement").fadeOut(function() {
                $(this).fadeIn();
            });
            return false;
        }

        var current_step = $(this).parents('.step');
        // If current step is inactive we can make click on it
        if (!current_step.hasClass('active')) {
            // Converts active step in inactive step, hiding its content
            $('#js-checkout-steps > div').each(function() {
                if ($(this).hasClass('active')) {
                    $(this).find('.content').hide();
                    $(this).removeClass('active');
                }
            });
            // Converts inactive step in active step, showing its content
            current_step.addClass('active').find('.content').slideToggle('slow');
        }
   //  });
}
*/

/*
function bindCheckoutNextStepButtons()
{
    //first unbind to avoid binding two times
    $('#js-submit-step1, #js-submit-step2, #js-submit-step3, #js-submit-step4').unbind('click');

    $('#js-submit-step1, #js-submit-step2, #js-submit-step3, #js-submit-step4').click(function (event) {
        event.preventDefault();


        if(!$("#cgv").is(":checked")) {
            return false;
        }

        // if user press last step button, first check if payment gateway is selected
        if ($(this).attr('id') == 'js-submit-step4')
        {
            var url = $('input[type=radio][name=paymentgateway]:checked').val();
            if (url == undefined || url == '')
                return;
        }

        var currentStep = $(this).parents('.step');
        currentStep.find('.content').hide();
        currentStep.removeClass('active').addClass('completed');

        if ($(this).attr('id') == 'js-submit-step1')
        {
            if ($("#checkout_step_2").is(":visible") || $("#opc_new_account").is(":visible"))
            {
                $("#js-submit-step2").parents('.step').addClass('active').find('.content').slideToggle('slow');
                $("#submitAccount").parents('.step').addClass('active').find('.content').slideToggle('slow');
            }
            else if ($("#carrier_area").is(":visible"))//if user is logged and cart is virtual, step 3 is hidden
            {
                $("#js-submit-step3").parents('.step').addClass('active').find('.content').slideToggle('slow');
            }
            else
            {
                $("#js-submit-step4").parents('.step').addClass('active').find('.content').slideToggle('slow');
            }
        }
        else if ($(this).attr('id') == 'js-submit-step2')
        {
            if ($("#carrier_area").is(":visible"))//if user is logged and cart is virtual, step 3 is hidden
                $("#js-submit-step3").parents('.step').addClass('active').find('.content').slideToggle('slow');
            else
                $("#js-submit-step4").parents('.step').addClass('active').find('.content').slideToggle('slow');
        }
        else if ($(this).attr('id') == 'js-submit-step3')
            $("#js-submit-step4").parents('.step').addClass('active').find('.content').slideToggle('slow');
        else if ($(this).attr('id') == 'js-submit-step4')//last step
        {
            var url = $('input[type=radio][name=paymentgateway]:checked').val();
            if (url != "free")
                window.location.href = url;
            else
            {
                confirmFreeOrder();
            }
        }
    });
}
*/

//copy voucher code to input
function copyCoucherCode()
{
    $('#display_cart_vouchers > a').click(function(event) {
        event.preventDefault();
        $('#discount_name').val($(this).data('code'));
    });
}

/*** Toggle asterisks visibility in Checkout mandatory phone fields ***/
function toggleCheckoutAsterisksVisibility ()
{
    var phone_input = $('#opc_account_form #phone');
    var phone_mobile_input = $('#opc_account_form #phone_mobile');
    var phone_asterisk = $('#opc_account_form label[for="phone"] b');
    var phone_mobile_asterisk = $('#opc_account_form label[for="phone_mobile"] b');

    phone_input.blur(function () {
        if (phone_input.val() != '' && phone_mobile_input.val() == '') {
            phone_asterisk.css('display', 'inline');
            phone_mobile_asterisk.css('display', 'none');
        }
    });
    phone_mobile_input.blur(function () {
        if (phone_mobile_input.val() != '' && phone_input.val() == '') {
            phone_asterisk.css('display', 'none');
            phone_mobile_asterisk.css('display', 'inline');
        }
    });
}

$(document).ready(function() {

    /************** Subscribe to Newsletter - Header Input Toggler **************/
    $('#js-newsletter-subscribe-btn-header').click(function (event) {
        event.preventDefault();
        var newsletter_input_text = $('#headerNlForm').find('#js-newsletter-subscribe-input-header');
        if ($('#headerNlForm').hasClass('hidden')) {
            $('#headerNlForm').fadeIn('fast'); //200ms
            $('#headerNlForm').removeClass('hidden');
            $(this).addClass('expanded');
            $(this).text('Suscribirse');
            $('#nl_info_message').hide();
            newsletter_input_text.focus();
        } else {
            $('#headerNlForm').submit();
            //setTimeout(function() {$('#nl_info_message').fadeOut();}, 2000);
        }
        /*else {
            $('#headerNlForm').fadeOut(1); //very fast hiding (1ms)
            $('#headerNlForm').addClass('hidden');
            $(this).removeClass('expanded');
        }*/
    });

    /************** Checkout Steps **************/
    /* Hiding inactive steps content by default */
    // hideCheckoutSteps();
    /* Showing confirmation step content */
    $('#js-checkout-steps > div').each(function() {
        if ($(this).hasClass('confirmation')) {
            $(this).find('.content').show();
        }
    });

    /* Showing/hiding steps */
    //createCheckoutStepsBindings();
    /* Stylizing completed steps */
    //bindCheckoutNextStepButtons();



    /************** Dynamic Centering **************/
    $('.js-dynamic-centering').each(function() {
        //Forcing parent relative positioning
        $(this).parent().css('position', 'relative');
        //Getting element dimensions
        element_width = $(this).width();
        element_height = $(this).height();
        //Setting element negative margins to achieve centering
        $(this).css('margin-left', -1*element_width/2);
        $(this).css('margin-top', -1*element_height/2);
    });

    /************** Adding Border Color to Selected 3 Cols Item **************/
    /* Reseting img wrapper border color to white */
    function borderToWhite (){
        $('.skinThreeColsChoose a').each(function() {
            //Applying border changes only to the images, not to the texts
            $(this).parents('.skinThreeColsChoose').find('.flxImg').css('border-color', '#fff');
        });
    }
    /* Selected img wrapper */
    $('.skinThreeColsChoose a').click(function (event) {
        event.preventDefault();
        //Reseting img wrapper border color to white
        borderToWhite();

        //Applying selected img wrapper border color to specific theme border color
        var selected_img_wrapper = $(this).parents('li').find('.flxImg');
        var selected_img = selected_img_wrapper.find('img');
        var selected_li = selected_img_wrapper.parents('li') ;
        var first_img_height = $('.skinThreeColsChoose .flxImg:first img').height();
        if ($('body').hasClass('theme-woman')) {
            var theme_border_color = '#c11d7f';
        }
        if ($('body').hasClass('theme-man')) {
            var theme_border_color = '#a5001f';
        }
        if ($('body').hasClass('theme-baby')) {
            var theme_border_color = '#67619e';
        }
        selected_img_wrapper.css('border-color', theme_border_color);
        if (selected_li.hasClass('central')) {
            selected_img_wrapper.css('border-left', '4px solid ' + theme_border_color);
            selected_img_wrapper.css('border-right', '4px solid ' + theme_border_color);
            selected_img.css('height', first_img_height);
        }

        $('#selected_image').val($(this).attr('id'));
    });

    $('#continueGiftFriend').click(function (event) {
        $('#formGiftToFriend').submit();
    });

    if ($('#module-fancygifttofriend-gift #message').length == 1) {
        $('#module-fancygifttofriend-gift #message').limit('180','#module-fancygifttofriend-gift #charsLeft');
    }

    /************** Styling an input type="file" **************
        From: http://www.quirksmode.org/dom/inputfile.html
    */
    /*

    var W3CDOM = (document.createElement && document.getElementsByTagName);

    function initFileUploads() {
        if (!W3CDOM) return;
        var fakeFileUpload = document.createElement('div');
        fakeFileUpload.className = 'fakeFile';
        fakeFileUpload.appendChild(document.createElement('input'));
        var image = document.createElement('img');
        image.src='../img/button_select.gif';
        fakeFileUpload.appendChild(image);
        var x = document.getElementsByTagName('input');
        for (var i=0;i<x.length;i++) {
            if (x[i].type != 'file') continue;
            if (x[i].getAttribute('noscript')) continue;
            if (x[i].parentNode.className != 'fileInputs') continue;
            x[i].className = 'file hide';
            var clone = fakeFileUpload.cloneNode(true);
            x[i].parentNode.appendChild(clone);
            x[i].relatedElement = clone.getElementsByTagName('input')[0];
            if (x[i].value)
                x[i].onchange();
            x[i].onchange = x[i].onmouseout = function () {
                this.relatedElement.value = this.value;
            }
        }
    }*/

    /**
     * Generic css class for binding "history back"
     * callback
     */
    $('#js-button-volver').click(function(e) {
        e.preventDefault();
        history.back();
    });

    //check voucher codes
    copyCoucherCode();


    function enableDisableContinueCheckoutButton() {
        if($("#cgv").is(":checked")) {
            $("#js-submit-step1").removeClass("skinBtnR3");
            $("#js-submit-step1").addClass("skinBtnR1");
        } else {
            $("#js-submit-step1").removeClass("skinBtnR1");
            $("#js-submit-step1").addClass("skinBtnR3");
        }
    }
    /* The page may render starts with the checkbox CHECKED or UNCHECKED,
    *  so the "continue" button must appear accordingly */
    enableDisableContinueCheckoutButton();

    /* Disable jump to checkout section if Terms&Conditions checkbox
     * is not CHECKED */
    $("#cgv").change(function() {
        enableDisableContinueCheckoutButton();
    });

    /************** Custom Dialog (modal window) **************/
    $('.js-popup-trigger').click(function (event) {
        event.preventDefault();
        openPopUpTrigger();
    });

    /*** Toggle asterisks visibility in Checkout mandatory phone fields ***/
    toggleCheckoutAsterisksVisibility();

    /**
     * Display or hide the matched elements with a sliding motion.
     */
    $('.js-slide-toggle-trigger').click(function (event) {
        event.preventDefault();
        var element = $(this).closest('.js-slide-toggle').find('.hidden');
        element.slideToggle(500);
        //element.slideToggle(500).toggleClass('hidden');
    });

    /**
     * Display the current clicked element, with a sliding motion,
     * while hiding the other ones.
     */
    $('.js-slide-toggle-multiple-trigger').click(function (event) {
        var element_clicked = $(this);
        var element_clicked_attr = element_clicked.attr('href');
        var element_root = element_clicked.closest('.js-slide-toggle-multiple');

        /* If the clicked node is a link, 'prevent default' is applied */
        // For some browsers, 'attr' is undefined; for others, 'attr' is false.
        // Check for both.
        if (typeof element_clicked_attr !== 'undefined' && element_clicked_attr !== false) {
            event.preventDefault();
        }

        /* Sliding-up & Sliding-down */
        element_root.each(function () {
            // Adding clickable behaviour to all trigger nodes, and its siblings (necessary for inputs and labels)
            element_root.find('.js-slide-toggle-multiple-trigger').css('pointer-events', 'auto');
            element_root.find('.js-slide-toggle-multiple-trigger').siblings().css('pointer-events', 'auto');
            // Sliding-up all content nodes
            element_root.find('.content').slideUp(500);
            // Removing clickable behaviour to current trigger node, and its siblings (necessary for inputs and labels)
            element_clicked.css('pointer-events', 'none');
            element_clicked.siblings().css('pointer-events', 'none');
            // Sliding-down current content node
            element_clicked.closest('.framed').find('.content').slideDown(500);
        });
    });

});


/************** Open Dialog Trigger ****************/
function openPopUpTrigger(){

    var modal_back_layer = $('#modal-back-layer');
    if (modal_back_layer.hasClass('hidden')) {
        modal_back_layer.fadeIn().removeClass('hidden');
        $('body').css('overflow', 'hidden');
    }
    else {
        modal_back_layer.fadeOut({
            complete: function() {
                $('body').css('overflow', 'visible');
            }
        }).addClass('hidden');
    }
    $('#js-popup-close-trigger').click(function (event) {
        event.preventDefault();
        modal_back_layer.fadeOut({
            complete: function() {
                $('body').css('overflow', 'visible');
            }
        }).addClass('hidden');


    });
}
