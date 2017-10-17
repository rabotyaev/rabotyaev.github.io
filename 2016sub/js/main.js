$(function () {
     $('.fancy').fancybox({
        padding: 0,
        margin: 10,
        scrolling: 'auto',
        fitToView: false,
        scrollOutside: false
    });

    if (!isMobile.any) {

    //$('.fancyif').fancybox({
        //    padding: 0,
        //    margin: 30,
        //    scrolling: 'auto',
        //    fitToView: false,
        //    autoSize: false,
        //    afterLoad: function () {
        //        this.width = $(this.element).data("width");
        //        this.height = $(this.element).data("height");
        //    }
        //});

    }

    else {
        $('.fancyif').attr('href', 'https://www.parter.ru/tickets.html?affiliate=MF1&doc=start');
    }

    $('.top-menu ul').materialmenu({
        mobileWidth: 929,
        buttonClass: 'burger'
    });

    $('.tribunes ul').carouFredSel({
        items: 1,
        circular: true,
        responsive: true,
        next: '.next6',
        prev: '.prev6',
        pagination: '.pagination6',
        swipe: {
            onMouse: true,
            onTouch: true
        },
        scroll: {
            items: 1,
            fx: 'crossfade'
        },
        auto: {
            play: true,
            timeoutDuration: 500000
        }
    });

    $('.gallery ul').carouFredSel({
        items: 1,
        circular: true,
        responsive: true,
        next: '.next1',
        prev: '.prev1',
        pagination: '.pagination7',
        swipe: {
            onMouse: true,
            onTouch: true
        },
        scroll: {
            items: 1,
            fx: 'crossfade'
        },
        auto: {
            play: true,
            timeoutDuration: 500000
        }
    });



        $('.scroll').jScrollPane({
            autoReinitialise: true,
            autoReinitialiseDelay: true
        });


    $('.tribunes .title').click(function(){
       $(this).next().show(0);
        $(this).hide(0);
    });

    $('.tribunes .close').click(function(){
        $(this).parent().hide(0);
        $(this).parent().prev().show(0);
    });

    $('.respondes ul').carouFredSel({
        items: 1,
        circular: true,
        responsive: true,
        swipe: {
            onMouse: true,
            onTouch: true
        },
        pagination: '.pagination1',
        scroll: {
            items: 1,
            fx: 'crossfade'
        },
        auto: {
            play: true,
            timeoutDuration: 500000
        }
    });

    var h = $(window).height() / 2;

    $(window).scrollspy({
        min: $('#header').offset().top - h,
        max: $('#header').offset().top + $('#header').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#header]').parent().addClass('active');
        }
    });

    $(window).scrollspy({
        min: $('#respondes').offset().top - h,
        max: $('#respondes').offset().top + $('#respondes').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#respondes]').parent().addClass('active');
        }
    });

    $(window).scrollspy({
        min: $('#autodrom').offset().top - h,
        max: $('#autodrom').offset().top + $('#autodrom').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#autodrom]').parent().addClass('active');
        }
    });

    $(window).scrollspy({
        min: $('#gallery').offset().top - h,
        max: $('#gallery').offset().top + $('#gallery').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#gallery]').parent().addClass('active');
        }
    });

    $(window).scrollspy({
        min: $('#tribunes').offset().top - h,
        max: $('#tribunes').offset().top + $('#tribunes').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#tribunes]').parent().addClass('active');
        }
    });

    $(window).scrollspy({
        min: $('#auto').offset().top - h,
        max: $('#auto').offset().top + $('#auto').height() - h,
        onEnter: function (element, position) {
            $('.top-menu ul li').removeClass('active');
            $('.top-menu ul li a[href=#auto]').parent().addClass('active');
        }
    });



    var tmh = $('.top-menu').height();
    $('.top-menu ul li a, .scrollarr').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: ($(target).offset().top - tmh) + 'px'}, 600, function () {
            $('.material-menu-overlay').click();

        });

        if (!$(this).parent().is('.active')) {
            $('.top-menu ul li').removeClass('active');
            $(this).parent().addClass('active');
        }
    });

    $(".to-top").click(function () {
        destination = 0;
        $('body').animate({scrollTop: destination}, 1100);
        return false;
    });



});



$(function(){

    $('.send').submit(function(e){
        var s = true;
        e.preventDefault();
        if (validateEmail($(this).find('input[name=email]').val())) {
            $(this).find('input[name=email]').removeClass('error');

        }
        else {
            $(this).find('input[name=email]').addClass('error');
            s = false;
        }
        if ($(this).find('input[name=name]').val()) {
            $(this).find('input[name=name]').removeClass('error');
        }
        else {
            $(this).find('input[name=name]').addClass('error');
            s = false;
        }
        if (s) {
            sendData($(this));
        }

    });

});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function sendData(form) {

    var post_data = {
        'email': form.find('input[name=email]').val(),
        'name':  form.find('input[name=name]').val()
    };

//    ga('send', 'event', 'button', 'click');

    form.find('button').text('Отправка...');
    form[0].reset();

    $.ajax({
        url: 'subscribe.php',
        type: 'post',
        data: post_data,
        dataType: 'json',
        success: function(data){
            if (!data['status']) {
//                $('.hide').hide(0);
//                $('.show').show(0);
//                ga('send', 'event', 'button', 'finish');
                $.fancybox('#thank');
                $('.send').find('button').text('Узнать первым!');
            }
            else {
                form.find('button').text('Отправить');
                alert('Проверьте правильно ли введен адрес электронной почты');
            }
        }
    });


}