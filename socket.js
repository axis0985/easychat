const io = require('socket.io-client');
var sock = io.connect('http://localhost:808', {reconnect: true});
var s_id = "";
var _uname = "";

function init()
{
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        s_id += possible.charAt(Math.floor(Math.random() * possible.length));
    _uname = s_id;
    document.getElementById('username').value = _uname;

}
sock.on('connect',function(){
    init();
    sock.emit('handshake',{'s_id':s_id , '_uname':_uname});
    console.log({'s_id':s_id , '_uname':_uname});
});
sock.on('hsresponse',function(res){
    res.map(function(item){
        document.getElementById('onlined').innerHTML += '<li id="'+item.s_id+'"  class="users">'+item._uname+'</li>';
    });
});
sock.on('user-add',function(res){
  document.getElementById('onlined').innerHTML += '<li id="'+res.s_id+'"  class="users">'+res._uname+'</li>';
});