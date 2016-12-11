var $ = require('jQuery');
$(document).ready(function(){
    $('#submit').on('click',function(e){
        e.preventDefault();
        sock.emit('talk',s_id,$('#msg').val());
        let node = new $('<div class="message you"></div>');
        node.html($('#msg').val());
        $('#ch').append(node);
        $('#msg').val('');
        scrollToEnd();
    });
    $('#change').on('click',function(e){
        e.preventDefault();
        sock.emit('change_name',s_id,$('#un').val());
    });
    $('#msg').keydown(function (e) {
        if (e.which === 13) {
            if($('#msg').val() != "")
                $('#submit').click();
        }
    });
    $('#un').keydown(function (e) {
        if (e.which === 13) {
            if($('#un').val() != "")
                $('#change').click();
        }
    });
});
var scrollToEnd = function(){
    var _div = document.getElementById('ch');
    _div.scrollTop = _div.scrollHeight;
}