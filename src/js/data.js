/**
 * Created by guoshuli on 2015/11/19.
 */
(function(){
    var REQUEST_URLS ={
        HotboxLeftPic:'http://webapi.br.baidu.com/v3/op_news.jsonp',//第二部分左边图片
        HotboxRightPic:'http://webapi.br.baidu.com/v3/op_hot_news.jsonp',//第二部分右边新闻
        titleBoxPic:'http://sys.webapi.br.baidu.com/v3/op_hot_pics.jsonp',//第四部分话题喷喷喷图片
        funJoker :'http://webapi.br.baidu.com/v3/op_joke.jsonp',//搞笑一分钟中的内容
        gifJoker:'http://baiduhz.duowan.com/gallery.jsonp'//搞笑动态图内容
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
       },

       getTitleboxContent:function(){
           var defer = $.Deferred();
           $.ajax({
               url:REQUEST_URLS.titleBoxPic,
               dataType:'jsonp',
               jsonp:'cb',
               cache:true
           }).done(function(data){
               data = data.data;
               defer.resolve(data);
           }).fail(function(){
               defer.reject();
           });

           return defer.promise();
       },

       getJokers:function(){
           var defer = $.Deferred();
           $.ajax({
               url:REQUEST_URLS.funJoker,
               dataType:'jsonp',
               jsonp:'cb',
               cache:true
           }).done(function(data){
               data = data.data;
               defer.resolve(data);
           }).fail(function(){
               defer.reject();
           });

           return defer.promise();
       },

       getGif:function(){
           var defer = $.Deferred();
           $.ajax({
               url:REQUEST_URLS.gifJoker,
               dataType:'jsonp',
               jsonp:'cb',
               cache:true
           }).done(function(data){
               defer.resolve(data);
           }).fail(function(){
               defer.reject();
           });

           return defer.promise();
       }
   }
    window.Data = data;
}())