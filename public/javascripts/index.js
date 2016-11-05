/**
 * Created by lenovo on 16-8-4.
 */
$(document).ready(function(){
    $('.add_goods_button').click(function(){
        location.href='/add_goods';
    });
});

function count_goods_number(id,num){
    var count=JSON.parse($('#number'+id).val());
    count+=num;
    $('#number'+id).val(count);
    update_db(id,count);
}
function extract_number(id){
    var num=JSON.parse($('#number'+id).val());
    if(num>0) $('#dec_goods_num'+id).removeAttr("disabled");
    update_db(id,num);
}

function delete_row(str) {
    add_div(str);
    $('#confirm_'+str).click(function(){
        $('#dialog_box').remove();
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        }
        else {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","/delete?name="+str,false);
        xmlhttp.send();
        $('#tr'+str).remove();
        location.reload();
    });
    $('#cancel_'+str).click(function(){
        $('#dialog_box').remove();
    });
}

function update_db(name,count) {
    /*var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "/update?name=" + name + '&count=' + count, false);
    xmlhttp.send();*/
    $.post('/update',{name:name,count:count});
}

function add_div(name){
    var get_string = $("#div_template").text();
    var replace=get_string.replace(/name/g,name);
    $('#show').append(replace);
}