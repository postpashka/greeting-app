// Contact Form Scripts

$(function() {

    $("form input, form textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            if ( $('body').hasClass('order-form') ){            
                var top = $('.help-block>ul:first').position().top;
                $(window).scrollTop( top );
            }
        },
        submitSuccess: function($form, event) {
            alert('form sended successfully');
            event.preventDefault();
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
