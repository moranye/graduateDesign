/**
 * Created by guoshuli on 2015/11/19.
 */
(function(){
    var REQUEST_URLS ={
        HotboxLeftPic:'http://webapi.br.baidu.com/v3/op_news.jsonp',//第二部分左边图片
        HotboxRightPic:'http://webapi.br.baidu.com/v3/op_hot_news.jsonp'//第二部分右边新闻
    }

   var data = {
       getHotboxLeftInfo:function() {
            var defer = $.Deferred();
           $.ajax({
               url:REQUEST_URLS.HotboxLeftPic,
               cache: true,
               dataType: "jsonp",
               jsonp:"cb",
               jsonpCallback: "jsonpLeftSlider"
           }).done(function(data){
                data = data.data.topics[0].big_pic;
               defer.resolve(data);
           }).fail(function(){
               defer.reject();
           });

           return defer.promise();
       },
       getHotboxRightInfo:function() {
           var defer = $.Deferred();
           $.ajax({
               url:REQUEST_URLS.HotboxRightPic,
               cache: true,
               dataType: "jsonp",
               jsonp:"cb",
               jsonpCallback: "jsonpRightSlider"
           }).done(function(data){
               data = data.data.data;
               defer.resolve(data);
           }).fail(function(){
               defer.reject();
           });

           return defer.promise();
       }
   }
    window.Data = data;
}())