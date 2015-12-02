/**
 * Created by guoshuli on 2015/12/2.
 */
(function () {
    var event = function () {
        var li = $(".video-right-head li");
        li.click(function () {
            $(this).addClass("bigger").siblings().removeClass('bigger');
            $(".tv-show").hide().eq($(this).index()).show();
        })
    }

    var getData = function(){

        var url = 'http://www.baidu.com/s?&ie=utf-8&word=';
            $.ajax({
                url: "http://webapi.br.baidu.com/v3/t/4/op_rank_video.jsonp",
                dataType: "Jsonp",
//            jsonpCallback:'cb111',
                cache: true,
                jsonp: 'cb',
                success: function (res) {
                    $b = res.data.slice(0, 8);
                    console.log("$b");
                    $.each($b, function (i, n) {
                        $("#tv-show").append("<li><span class='tv-show-num'>" + n.id + "</span><a target='_blank' href='" + (url + n.keyword) + "' class='tv-show-link'>" + n.title + "</a><span class='tv-show-read'>" + parseInt((n.searches) / 100) + "万</span></li>");
                    });
                }
            })
            $.ajax({
                url: "http://webapi.br.baidu.com/v3/t/26/op_rank_video.jsonp",
                dataType: "Jsonp",
//            jsonpCallback:'cb111',
                cache: true,
                jsonp: 'cb',
                success: function (res) {
                    $b = res.data.slice(0, 8);
                    console.log("$b");
                    $.each($b, function (i, n) {
                        $("#tv-show1").append("<li><span class='tv-show-num'>" + n.id + "</span><a target='_blank' href='" + (url + n.keyword) + "' class='tv-show-link'>" + n.title + "</a><span class='tv-show-read'>" + parseInt((n.searches) / 100) + "万</span></li>");
                    });
                }
            })
            $.ajax({
                url: "http://webapi.br.baidu.com/v3/t/19/op_rank_video.jsonp",
                dataType: "Jsonp",
//            jsonpCallback:'cb111',
                cache: true,
                jsonp: 'cb',
                success: function (res) {
                    $b = res.data.slice(0, 8);
                    console.log("$b");
                    $.each($b, function (i, n) {
                        $("#tv-show2").append("<li><span class='tv-show-num'>" + n.id + "</span><a target='_blank' href='" + (url + n.keyword) + "' class='tv-show-link'>" + n.title + "</a><span class='tv-show-read'>" + parseInt((n.searches) / 100) + "万</span></li>");
                    });
                }
            })
            $.ajax({
                url: "http://webapi.br.baidu.com/v3/t/23/op_rank_video.jsonp",
                dataType: "Jsonp",
//            jsonpCallback:'cb111',
                cache: true,
                jsonp: 'cb',
                success: function (res) {
                    $b = res.data.slice(0, 8);
                    console.log("$b");
                    $.each($b, function (i, n) {
                        $("#tv-show3").append("<li><span class='tv-show-num'>" + n.id + "</span><a target='_blank' href='" + (url + n.keyword) + "' class='tv-show-link'>" + n.title + "</a><span class='tv-show-read'>" + parseInt((n.searches) / 100) + "万</span></li>");
                    });
                }

            })

//video
            $.ajax({
                url: "http://webapi.br.baidu.com/v3/op_video.jsonp",
                dataType: "Jsonp",
                //jsonpCallback:'cb111',
                cache: true,
                jsonp: 'cb',
                success: function (res) {
                    var $aaa = res.data.topics;
                    $(".video-1").html("<a target='_blank' href='"+$aaa[0].big_pic[0].web_url+"'><img src='"+$aaa[0].big_pic[0].pic+"'><span class='video-1-include'><span class='video-1-topic'>"+$aaa[0].big_pic[0].title+"</span><span class='video-1-introduce'>"+$aaa[0].big_pic[0].content+"</span></span><span class='video-hover'><span class='video-movie-img'></span><span class='video-bg'></span></span></a>");
                    $(".video-2").html("<a target='_blank' href='"+$aaa[0].small_pic[0].web_url+"'><img src='"+$aaa[0].small_pic[0].pic+"'><span class='video-1-include2'><span class='video-1-topic2'>"+$aaa[0].small_pic[0].title+"</span><span class='video-1-introduce2'>"+$aaa[0].small_pic[0].content+"</span></span><span class='video-hover'><span class='video-movie-img'></span><span class='video-bg'></span></span></a>");
                    $(".video-3").html("<a target='_blank' href='"+$aaa[0].small_pic[1].web_url+"'><img src='"+$aaa[0].small_pic[1].pic+"'><span class='video-1-include2'><span class='video-1-topic2'>"+$aaa[0].small_pic[1].title+"</span><span class='video-1-introduce2'>"+$aaa[0].small_pic[1].content+"</span></span><span class='video-hover'><span class='video-movie-img'></span><span class='video-bg'></span></span></a>");
                    $(".video-4").html("<a target='_blank' href='"+$aaa[0].small_pic[2].web_url+"'><img src='"+$aaa[0].small_pic[2].pic+"'><span class='video-1-include2'><span class='video-1-topic2'>"+$aaa[0].small_pic[2].title+"</span><span class='video-1-introduce2'>"+$aaa[0].small_pic[2].content+"</span></span><span class='video-hover'><span class='video-movie-img'></span><span class='video-bg'></span></span></a>");
                    $(".video-5").html("<a target='_blank' href='"+$aaa[0].small_pic[3].web_url+"'><img src='"+$aaa[0].small_pic[3].pic+"'><span class='video-1-include2'><span class='video-1-topic2'>"+$aaa[0].small_pic[3].title+"</span><span class='video-1-introduce2'>"+$aaa[0].small_pic[3].content+"</span></span><span class='video-hover'><span class='video-movie-img'></span><span class='video-bg'></span></span></a>");

                }

            })



    }

}())