function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
    }

jQuery(document).ready(function($){
    $('.newsletter_submit').on('click',function(e){ 
        e.preventDefault();
        $(this).addClass('nl_req_processing').val( pls_wait_notn );

        if ( $('.nl_alert').length )
            $( ".nl_alert" ).remove();

        if ( JSON.stringify( $(".newsletter_email_input").attr("class").split(' ')  ).indexOf(',') != -1 )
            $('.newsletter_email_input').attr('class', 'newsletter_email_input');

        var n_l_s_email = $('.newsletter_email_input').val().trim();
        var validate = validateEmail ( n_l_s_email );
        if ( validate == false ){
            $(this).removeClass('nl_req_processing').val( subs_notn );
            $('.newsletter_email_input').addClass('nl_input_invalid');
            $( ".news_letter_box" ).prepend( "<span class='nl_alert nl_invalid_email'>" + inv_email_notn  + "</span>" );
            e.preventDefault();
            return;
        }

        $.ajax({
            type: "POST",
            url: '/ajax/?arp=159875c4235b99f58371ad6dbbebf60d&AJAX=Y',
            dataType: 'json',
            data: {
                'n_email'  : n_l_s_email
            },
            success: function (data) {
                $('.newsletter_submit').removeClass('nl_req_processing').val( subs_notn );
                
                if ( data.status == 'invalid' ){
                    $(".newsletter_email_input").addClass('nl_input_invalid');
                    $( ".news_letter_box" ).prepend( "<span class='nl_alert nl_invalid_email'>" + inv_email_notn  + "</span>" );
                }
                else if ( data.status == 'successfully subscribed' ){
                    $(".newsletter_email_input").addClass('nl_input_success');
                    $( ".news_letter_box" ).prepend( "<span class='nl_alert nl_subs_success'>" + succ_subs_notn  + "</span>" );
                }
                else if ( data.status == 'already subscribed' ){
                    $(".newsletter_email_input").addClass('nl_input_existing');
                    $( ".news_letter_box" ).prepend( "<span class='nl_alert nl_already_subs'>" + alr_subs_notn  + "</span>" );
                }
            }
        });      
    });
});