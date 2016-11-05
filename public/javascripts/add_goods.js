/**
 * Created by lenovo on 16-8-3.
 */
$(document).ready(function(){
    bind_add_and_dec_button();
    $('#cancal').click(function(){
        window.location.href='/';
    });
});
function bind_add_and_dec_button(){
    $("#dec_goods_num").click(function(){
        count_goods_num(-1);
    });
    $("#add_goods_num").click(function(){
        count_goods_num(1);
    });
}
function count_goods_num(num){
    var count=JSON.parse($('#number').val());
    count+=num;
    if(count<=0) $('#dec_goods_num').attr('disabled',"true");
    if(count>0) $('#dec_goods_num').removeAttr("disabled");
    $('#number').val(count);
}

 function unlock_button(){
     if($('#goods_name').val()!='' && $('#goods_price').val()!='' && $('#goods_unit').val()!=''){
         $('#save_goods').removeAttr("disabled");
     }else{
         $('#save_goods').attr('disabled',"true");
     }
 }

function extract_number(){
    var num=JSON.parse($('#number').val());
    if(num>0) $('#dec_goods_num').removeAttr("disabled");
}
