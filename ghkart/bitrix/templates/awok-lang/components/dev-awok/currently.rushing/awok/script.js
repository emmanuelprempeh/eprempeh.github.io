 jQuery(document).ready(function($){
    $.ajax({
        type: "POST",
        url: curr_rush_link,
        success: function (data) {
            $('.currently_rushing_inner').empty().html(data);
            if( data == '' ){
            	$('#currently-rushing').remove();
            }
        }
    });
});