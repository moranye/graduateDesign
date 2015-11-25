/**
 * Created by guoshuli on 2015/11/21.
 */
(function () {
    var containerWidth = 388,
        containerHeight = 180,
        timer = 3000;
    var move = function () {
        var outer = $('.player-items'),
            outerWidth = outer.width(),
            lefts = parseInt(outer.css('left')),
            dot = $('.dot'),
            leftslidebar = $('.slidebar-left'),
            rightslidebar = $('.slidebar-right');
        $('.dot').eq(parseInt(parseInt(($('.player-items').css('left'))) / -containerWidth)).addClass('dotselected').siblings().removeClass('dotselected');

        if ((lefts - containerWidth) <= -outerWidth) {

            outer.css({ left: 0 }, 500);
        }
        else {
            outer.css({ left: lefts - containerWidth }, 500);
        }
        $('.dot').eq(parseInt(parseInt(($('.player-items').css('left'))) / -containerWidth)).addClass('dotselected').siblings().removeClass('dotselected');
        set = setTimeout(function () {
            move();
        }, timer);

    }
    var events = function () {

        var leftsideBar = $('.slidebar-left'),
            rightsideBar = $('.slidebar-right'),
            dot = $('.dot'),
            playerItems = $('.player-items'),
            switchButton = $('.switch_button');

        leftsideBar.on('click', function () {

            var leftbaritems = $('.player-items'),
                leftbaritems_left = parseInt(leftbaritems.css('left'));
            clearTimeout(set);
            if ((leftbaritems_left + containerWidth) > 0) {

                leftbaritems.css({ left: -(leftbaritems.width() - containerWidth) });
            }
            else {
                leftbaritems.css({ left: leftbaritems_left + containerWidth });
            }
            $('.dot').eq(parseInt(parseInt(($('.player-items').css('left'))) / -containerWidth)).addClass('dotselected').siblings().removeClass('dotselected');
            set = setTimeout(function () {
                move();
            }, timer);


        });
        rightsideBar.on('click', function () {
            var leftbaritems = $('.player-items'),
                leftbaritems_left = parseInt(leftbaritems.css('left'));
            clearTimeout(set);
            if ((leftbaritems_left - containerWidth) <= -leftbaritems.width()) {

                leftbaritems.css({ left: 0 });
            }
            else {
                leftbaritems.css({ left: leftbaritems_left - containerWidth });
            }
            $('.dot').eq(parseInt(parseInt(($('.player-items').css('left'))) / -containerWidth)).addClass('dotselected').siblings().removeClass('dotselected');
            set = setTimeout(function () {
                move();
            }, timer);
        });
        setTimeout(function(){
            $('.dot').on('click', function() {
                clearTimeout(set);
                var dotIndex = $(this).index(),
                    leftTo = -containerWidth * dotIndex;
                $(this).addClass('dotselected').siblings().removeClass('dotselected');
                $('.player-items').css('left', leftTo);
                set = setTimeout(function () {
                    move();
                }, timer);
            });
        },2000);

        playerItems.on('mouseover',function(){
           clearTimeout(set)
        });
        playerItems.on('mouseout',function(){
            set = setTimeout(function () {
                move();
            }, timer);
        });
        switchButton.on('click',function(){
           var newsIndex= $('.newItemShow').index();
            newsIndex = newsIndex+1;
            if(newsIndex>3){
                newsIndex = 0;
            }
            $('.news-items').eq(newsIndex).addClass('newItemShow').siblings().removeClass('newItemShow');
             $('.switch_icon').addClass('switch_icon_roll');
            setTimeout(function(){
                $('.switch_icon').removeClass('switch_icon_roll');
            },1000)
        })
    }
    var init = function () {
        move();
    }
    var dealData = function (events) {
        var strLi = '',
            strDot = '',
            strNews1 = '',
            strNews2 = '',
            strNews3 = '',
            strNews4 = '';
        Data.getHotboxLeftInfo().done(function (data) {

            for (var i=0;i<data.length;i++) {
                strLi = strLi+
                    '<li>' +
                    '<a href="'+data[i].web_url+'"><img src="'+data[i].pic+'"></a>' +
                    '<div class="player-item-topic">'+data[i].title+'</div>' +
                    '<div class="half-opacity-shadow"></div>' +
                    '</li>';
                if(i == 0){
                    strDot = strDot+ '<div class="dot dotselected"></div>';
                }else{
                    strDot = strDot+ '<div class="dot"></div>';
                }
            }

            $('.player-items').html(strLi);
            $('.slidebar-dots').html(strDot);
        })

            Data.getHotboxRightInfo().done(function(data){
                console.log(data[0].isColor)
                for(var i = 0;i<50;i++){
                    if(i<12){
                        strNews1 = strNews1 + '<li>' +
                            '<a class="news-item-a'+(data[i].isColor==1?' hotnews-color-change':'')+'" href="'+'https://www.baidu.com/s?ie=utf-8&wd='+data[i].title+'" target="_blank">'+data[i].title+'</a>'+(data[i].isnew==1?'<span class="news-img"></span>':'')+'</li>';
                    }
                    else if(i>=12 && i<24){
                        strNews2 = strNews2 + '<li>' +
                            '<a class="news-item-a'+(data[i].isColor==1?' hotnews-color-change':'')+'" href="'+'https://www.baidu.com/s?ie=utf-8&wd='+data[i].title+'" target="_blank">'+data[i].title+'</a>'+(data[i].isnew==1?'<span class="news-img"></span>':'')+'</li>';
                    }

                    else if(i>=25 && i<37){
                        strNews3 = strNews3 + '<li>' +
                            '<a class="news-item-a'+(data[i].isColor==1?' hotnews-color-change':'')+'" href="'+'https://www.baidu.com/s?ie=utf-8&wd='+data[i].title+'" target="_blank">'+data[i].title+'</a>'+(data[i].isnew==1?'<span class="news-img"></span>':'')+'</li>';
                    }

                    else if(i>=37 && i<49){
                        strNews4 = strNews4 + '<li>' +
                            '<a class="news-item-a'+(data[i].isColor==1?' hotnews-color-change':'')+'" href="'+'https://www.baidu.com/s?ie=utf-8&wd='+data[i].title+'" target="_blank">'+data[i].title+'</a>'+(data[i].isnew==1?'<span class="news-img"></span>':'')+'</li>';
                    }
                }
                $('.news-items:eq(0)').html(strNews1);
                $('.news-items:eq(1)').html(strNews2);
                $('.news-items:eq(2)').html(strNews3);
                $('.news-items:eq(3)').html(strNews4);
            });

        events();
    }
    dealData(events);
    init();

}())