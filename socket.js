const io = require('socket.io-client');
var sock = io.connect('http://140.115.189.162:808', {reconnect: true});
var s_id = "";
var _uname = "";

function init()
{
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        s_id += possible.charAt(Math.floor(Math.random() * possible.length));
    _uname = s_id;
    $('#un').val(_uname);

}
sock.on('connect',function(){
    init();
    sock.emit('handshake',{'s_id':s_id , '_uname':_uname});
});
sock.on('hsresponse',function(res){
    res.map(function(item){
        let node = document.createElement('li');
        let text = document.createTextNode(item._uname);
        node.setAttribute('id',item.s_id);
        node.setAttribute('class','users');
        node.appendChild(text);
        document.getElementById('onlined').appendChild(node);
    });
});
sock.on('user-add',function(res){
  let node = document.createElement('li');
        let text = document.createTextNode(res._uname);
        node.setAttribute('id',res.s_id);
        node.setAttribute('class','users');
        node.appendChild(text);
        document.getElementById('onlined').appendChild(node);
        $('#ch').append('<div class="message info">'+res._uname+" connected!</div>");
        scrollToEnd();
});
sock.on('user-bye',function(res){
    $('#ch').append('<div class="message info">'+$('#'+res).html()+' disconnected!</div>');
    document.getElementById('onlined').removeChild(document.getElementById(res));
    scrollToEnd();
});
sock.on('user-talk',function(user,msg){
    let node = document.createElement('div');
    node.setAttribute('class','message others');
    let text = document.createTextNode($('#'+user).html()+' : '+ msg);
    node.appendChild(text);
    document.getElementById('ch').appendChild(node);
    scrollToEnd();
});
sock.on('user-change',function(user,new_name){
    $('#ch').append('<div class="message info">'+$('#'+user).html()+' renamed '+new_name+'</div>');
    $('#'+user).html(new_name);
    scrollToEnd();
});