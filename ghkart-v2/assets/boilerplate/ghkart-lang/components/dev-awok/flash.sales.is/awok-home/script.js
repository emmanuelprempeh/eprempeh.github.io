 jQuery(document).ready(function($){

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    $('.osf-home .show_more').on( 'click', function(e) {
        
        e.preventDefault();
        e.stopPropagation();
        
        var link        = $(this).data('ajax-link');
        var page_no     = getParameterByName( 'PAGEN_1' , link );        
        new_page_no     = +page_no + 1;

        if( typeof( window.check_new_pg ) != 'undefined' && window.check_new_pg == new_page_no ) return;

        window.check_new_pg = new_page_no;

        var new_link    = updateQueryStringParameter(  link , 'PAGEN_1' , new_page_no );

        $.ajax({
            type    : 'GET',
            url     : new_link,
            beforeSend: function() {
                $('.osf-home-loader').show();
                $('.osf-home-parent').empty();
            },
            success: function (data) 
            {
                $('.osf-home-loader').hide();
                $('.osf-home-parent').html(data);
                $('.osf-home .show_more').data( 'ajax-link' , new_link );
            }
        });
    });
});