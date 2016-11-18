 jQuery(document).ready(function($){
     $('.discount_products .discount_header .col_right .tabs li').on( 'click', function(e) {
        
        e.preventDefault();
        e.stopPropagation();

        var parent = $(this);
        
        var section                 = $(this).children().data('section-id');
        if( section == '582' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/mobile-phones/ds-582/?sort=discount-desc&limit=40");
        else if( section == '747' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/tablet-pcs/ds-747/?sort=discount-desc&limit=40");
        else if( section == '744' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/Laptops-Notebooks/ds-744/?sort=discount-desc&limit=40");
        else if( section == '848' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/watches/ds-848/?sort=discount-desc&limit=40");
        else if( section == '962' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/jewellery/ds-962/?sort=discount-desc&limit=40");
        else if( section == '830' )
            $(".discount_products .discount_header .col_left span a").attr("href", "/Home-Appliances/ds-830/?sort=discount-desc&limit=40");

        if( parent.hasClass('active') || ( typeof( window.bs_call_complete )!= 'undefined'  &&  window.bs_call_complete == false ) )
            return;

        window.bs_call_complete = false;
        
        var link                    = $(this).children().data('ajax-link');
        var section_container       = $('.discount_products .products .itemlist_box[data-section-id="'+section+'"]');
        var re_trigger_notifier     = section_container.data('re-trigger');//get the tigger data  

        $('.discount_products .itemlist_box').hide();

        $('.discount_products li').removeClass('active');
        parent.addClass('active');  

        if( re_trigger_notifier=='N' ){
            $('.toggle_loader[data-loader="best_discount"]').hide();
            section_container.show();
            window.bs_call_complete = true;
            return;
        }
        
        if( typeof window.bs_toggle_show == 'undefined'  ){
            window.bs_toggle_show = true;
        }
        
        $('.toggle_loader[data-loader="best_discount"] ').show();

        $.ajax({
            type    : 'GET',
            url     : link,
            success: function (data) {
                $('.toggle_loader[data-loader="best_discount"]').hide();         
                section_container.show().html(data).attr({"data-re-trigger":"N"});
                window.bs_call_complete = true;
            }
        });
    });
});