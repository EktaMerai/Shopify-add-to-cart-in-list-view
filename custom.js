  cartItems();
  
  function cartItems(){
    jQuery('.cart-count-bubble').hide();
    jQuery.getJSON('/cart.js', function(cart) {
      if(cart.item_count >= 1){
        jQuery('.cart-count-bubble').show();
        jQuery('.cart-count-bubble span:first').text(cart.item_count);
      }
    });
  } 
  
  jQuery(document).on('click','.custom_addtoCart',function(){ 
    var ID = jQuery(this).prev('.ad_to_cart_id').val(); 
    var p_id = jQuery(this).val(); 
    
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {
        quantity: 1,
        id: ID
      },
      dataType: 'json', 
      success: function (data) {

        var id = data.id; 

        jQuery('.custom-form-'+p_id+ ' .not-empty-view').show();
        jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').hide();
        jQuery('.custom-form-'+p_id+ ' .basket-quantity a span').html(data.quantity);
        jQuery('.custom-form-'+p_id+ ' #quantity').val(data.quantity);
        cartItems();
      } 
    });
  });
  
  $('.select__select').change(function() {
    var p_id = jQuery(this).attr('data-pid');  
//      alert("product id" + p_id);
//     alert(jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').hasClass("hidecart"));
//     if(jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').hasClass("hidecart") == 'false'){
//       jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').hide();
//     }else{
      jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').show();
      jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').addClass("hidecart");
      jQuery('.custom-form-'+p_id+ ' .not-empty-view').hide();
//     }
//     jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').removeClass("hidecart");
    
  });
  
    
  $('.plus').on('click', function(){ 

    var plus_id = parseInt($(this).parent('.input-quantity').parent().parent().find('.ad_to_cart_id').val()); 
    var qty = parseInt($(this).parent('.input-quantity').find('.quantity-input').val());
    var p_id = $(this).parent('.input-quantity').attr('data-prod-id'); 
    qty++;
   //  alert(plus_id);
//  	alert(p_id);
    
    qty = (isNaN(qty))?1:qty;
    $("input[data-id="+p_id+"]").val(qty);

  jQuery.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: {
        id: plus_id,
        quantity: qty
      },
      dataType: 'json', 
      success: function (data) { 
        cartItems();
        jQuery('.custom-form-'+p_id+ ' .basket-quantity a span').html(qty);
      } 
    });

  });
  $('.minus').on('click', function(){

    var minus_id = parseInt($(this).parent('.input-quantity').parent().parent().find('.ad_to_cart_id').val()); 
    var qty = parseInt($(this).parent('.input-quantity').find('.quantity-input').val());
//     var p_id = jQuery(this).val(); 
    var p_id = $(this).parent('.input-quantity').attr('data-prod-id'); 

    if(qty > 0) {
      qty--;
    }

    qty = (isNaN(qty))?1:qty;
    $("input[data-id="+p_id+"]").val(qty);

    jQuery.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: {
        id: minus_id,
        quantity: qty
      },
      dataType: 'json', 
      success: function (data) { 

        console.log(data);
        cartItems();
		jQuery('.custom-form-'+p_id+ ' .basket-quantity a span').html(qty);
        if(qty === 0){
          jQuery('.custom-form-'+p_id+ ' .not-empty-view').hide();
          jQuery('.custom-form-'+p_id+ ' .custom_addtoCart').show();
        }
      } 
    });


  });
