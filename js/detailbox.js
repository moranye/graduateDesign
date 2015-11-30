/**
 * Created by guoshuli on 2015/11/25.
 */
(function(){
    var aApi = [
        {
            text: "娱乐八卦",
            api: "http://ent.163.com/special/00034UPA/baidu_browser_js.js",
            type: 'ent'
        },
        {
            text: "社会",
            api: "http://news.163.com/special/00014O7V/baidu_browser_sh.js",
            type: 'social'
        },
        {
            text: "新闻",
            api: "http://news.163.com/special/00014O7V/baidu_browser.js",
            type: 'news'

        },
        {
            text: "军事",
            api: "http://news.163.com/special/00014O7V/baidu_browser_js.js",
            type: 'wars'
        },
        {
            text: "汽车",
            api: "http://auto.163.com/special/000853RQ/baidu_browser.utf8.js",
            type: 'auto'
        },
        {
            text: "科技",
            api: "http://tech.163.com/special/00094OIL/baidu_browser.utf8.js",
            type: 'tech'
        },
        {
            text: "财经",
            api: "http://money.163.com/special/00254S08/baidu_browser.js",
            type: 'money'
        },
        {
            text: "女性",
            api: "http://lady.163.com/special/00264IKH/baidu_browser.utf8.js",
            type: 'lady'
        },
        {
            text: "体育",
            api: "http://sports.163.com/special/000509PP/baidu_browser.utf8.js",
            type: 'sport'
        },
        {
            text: "轻松一刻",
            api: "http://news.163.com/special/00014O7V/baidu_browser_kxyk.js",
            type: 'fun'
        }
    ];
        window.getNtesNews = function(data) {
            var str = '',data = data.data;
            str = str +'<a class="detailbox-content-left" href="'+data.bigpic[0].url+'" target="_blank" title="'+data.bigpic[0].title+'">' +
            '<img src="'+data.bigpic[0].img+'" alt="'+data.bigpic[0].title+'">' +
            '<div class="detailbox-content-title">'+data.bigpic[0].title+'</div>' +
            '<div class="detailbox-content-shadow"></div>' +
            '</a>' +
            '<div class="detailbox-content-right">' +
            '<a class="detailbox-right-title" href="'+data.hotline[0].url+'">'+data.hotline[0].title+'<span class="topline">[头条]</span></a>' +
            '<ul class="detailNewsBox">' +
            '<li>' +
            '<a title="'+data.list[1].title+'" target="_blank" href="'+data.list[1].url+'">'+data.list[1].title+'</a>' +
            '</li>' +
            '<li>' +
            '<a title="'+data.list[2].title+'" target="_blank" href="'+data.list[2].url+'">'+data.list[2].title+'</a>' +
            '</li>' +
            '<li>' +
            '<a title="'+data.list[3].title+'" target="_blank" href="'+data.list[3].url+'">'+data.list[3].title+'</a>' +
            '</li>' +
            '<li>' +
            '<a title="'+data.list[4].title+'" target="_blank" href="'+data.list[4].url+'">'+data.list[4].title+'</a>' +
            '</li> '+
            '<li>' +
            '<a title="'+data.list[5].title+'" target="_blank" href="'+data.list[5].url+'">'+data.list[5].title+'</a>' +
            '</li>' +
            '<li>' +
            '<a title="'+data.list[6].title+'" target="_blank" href="'+data.list[6].url+'">'+data.list[6].title+'</a>' +
            '</li>' +
            '</ul>' +
            '</div>';
            $.each(aApi,function(j,datas){
                if(datas.type == data.type) {
                    $('.detailbox-content-inner').eq(j).html(str);
                }

            })
        };
    var getStr = function(item) {
        $.ajax({
            url:item.api,
            dataType:'jsonp',
            cache:true
        }).done(function(data){
        })
    }
    var joinTogether =function(){
        $.each(aApi,function(i,item){
            getStr(item);
        })
    }
    var setEvents = function(){
        var detailboxTabItem = $('.detailbox-tab-item'),
            detailboxContentInner = $('.detailbox-content-inner');
        detailboxTabItem.on('mouseover click',function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.detailbox-content-inner').eq($(this).index()).addClass('detailbox-content-inner-show').siblings().removeClass('detailbox-content-inner-show');
        })
    }
    var getTitleBox =function(){
        Data.getTitleboxContent().done(function(data){
            var str ='',titleboxContent = $('.titlebox-content');
            str = str +
            '<div class="titlebox-content-left">' +
            '<a class="titlebox-content-left-link" target="_blank" href="'+data.big[0].url+'">' +
            '<img class="titlebox-content-left-img" src="'+data.big[0].pic+'"> ' +
            '<div class="titlebox-content-left-shadow"></div> <div class="titlebox-content-left-text">'+data.big[0].title+'</div> ' +
            '</a>' +
            ' </div> ' +
            '<div class="titlebox-content-right"> ' +
            '<ul class="titlebox-content-right-ul"> ' +
            '<li class="titlebox-content-right-li">' +
            ' <a class="titlebox-content-right-link" target="_blank" href="'+data.small[0].url+'"> ' +
            '<img class="titlebox-content-right-li-img" src="'+data.small[0].pic+'">' +
            ' <div class="titlebox-content-right-li-shadow"></div> <div class="titlebox-content-right-li-text">'+data.small[0].title+'</div>' +
            ' </a>' +
            ' </li> ' +
            '<li class="titlebox-content-right-li"> ' +
            '<a class="titlebox-content-right-link" target="_blank" href="'+data.small[1].url+'"> ' +
            '<img class="titlebox-content-right-li-img" src="'+data.small[1].pic+'"> ' +
            '<div class="titlebox-content-right-li-shadow"></div> <div class="titlebox-content-right-li-text">'+data.small[1].title+'</div> ' +
            '</a>' +
            ' </li>' +
            ' <li class="titlebox-content-right-li">' +
            ' <a class="titlebox-content-right-link" target="_blank" href="'+data.small[2].url+'"> ' +
            '<img class="titlebox-content-right-li-img" src="'+data.small[2].pic+'"> ' +
            '<div class="titlebox-content-right-li-shadow">' +
            '</div>' +
            ' <div class="titlebox-content-right-li-text">'+data.small[2].title+'</div> ' +
            '</a> ' +
            '</li>' +
            ' </ul>' +
            ' <a class="titlebox-more" data-type="more" target="_blank" href="https://www.baidu.com/s?wd=%E5%8F%91%E7%8E%B0%20%E7%83%AD%E9%97%A8%E8%AF%9D%E9%A2%98">更多热门话题&gt; &gt;</a> ' +
            '</div>';

            titleboxContent.html(str);
            console.log(str)
        })
    }

    joinTogether()
    setEvents()
    getTitleBox()
}())