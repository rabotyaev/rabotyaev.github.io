var grad = new Date(2016, 4, 1, 14, 0, 0, 0, 0);

function render() {
    var now = new Date(),
        diff = String(grad.getTime() - now.getTime()),
        d = parseInt(Math.floor(diff/(1000*60*60*24)));
    diff = diff-(d*1000*60*60*24);
    var h = parseInt(Math.floor(diff/(1000*60*60)));
    diff = diff-(h*1000*60*60);
    var m = parseInt(Math.floor(diff/(1000*60)));
    diff = diff-(m*1000*60);
    var s = parseInt(Math.floor(diff/(1000)));
    var ms = (diff-(s*1000))+'';
    $('#t-d').text(d);
    $('#t-h').text(h);
    $('#t-m').text(m);
    $('#t-s').text(s);

}

$(function(){
//    render();
    setInterval(render,1000);
});


//таймер