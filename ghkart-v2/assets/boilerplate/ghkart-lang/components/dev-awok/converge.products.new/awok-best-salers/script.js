 jQuery(document).ready(function($){
     $('.weekly_best_seller .bestseller_header .col_right .tabs li').on( 'click', function(e) {
        
        e.preventDefault();
        e.stopPropagation();

        var parent = $(this);
        
        if( parent.hasClass('active') || ( typeof( window.bs_call_complete )!= 'undefined'  &&  window.bs_call_complete == false ) )
            return;

        window.bs_call_complete = false;        
    
        var section                 = $(this).children().data('section-id');
        var link                    = $(this).children().data('ajax-link');
        var section_container       = $('.weekly_best_seller .bestseller_products .itemlist_box[data-section-id="'+section+'"]');
        var re_trigger_notifier     = section_container.data('re-trigger');//get the tigger data  

        $('.weekly_best_seller .itemlist_box').hide();

        $('.weekly_best_seller li').removeClass('active');
        parent.addClass('active');  

        if( re_trigger_notifier=='N' ){
            $('.toggle_loader[data-loader="best_seller"]').hide();
            section_container.show();
            window.bs_call_complete = true;
            return;
        }

        if( typeof window.bs_toggle_show == 'undefined'  ){
            window.bs_toggle_show = true;
        }

        $('.toggle_loader[data-loader="best_seller"] ').show();

        $.ajax({
            type    : 'GET',
            url     : link,
            success: function (data) {
                $('.toggle_loader[data-loader="best_seller"]').hide();         
                section_container.show().html(data).attr({"data-re-trigger":"N"});
                window.bs_call_complete = true;
            }
        });
    });
});