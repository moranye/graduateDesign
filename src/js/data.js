/**
 * Created by guoshuli on 2015/11/19.
 */
(function(){
    var REQUEST_URLS ={
        HotboxLeftPic:'http://webapi.br.baidu.com/v3/op_news.jsonp',//第二部分左边图片
        HotboxRightPic:'http://webapi.br.baidu.com/v3/op_hot_news.jsonp',//第二部分右边新闻
        titleBoxPic:'http://sys.webapi.br.baidu.com/v3/op_hot_pics.jsonp',//第四部分话题喷喷喷图片
        funJoker :'http://webapi.br.baidu.com/v3/op_joke.jsonp',//搞笑一分钟中的内容
        gifJoker:'http://baiduhz.duowan.com/gallery.jsonp',//搞笑动态图内容
        stars:'http://opendata.baidu.com/api.php?tn=client_software&resource_id=13103&ie=utf-8&oe=utf-8&format=jsonp',//星座运势
        keyWords:'http://suggestion.baidu.com/su?cb=?&wd='//查询
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
       },

       getStar:function(name) {
           var defer = $.Deferred();

           $.ajax(REQUEST_URLS.stars, {
               dataType: 'jsonp',
               jsonp: 'cb',
               data: {
                   query: '双子座运势'
               }
           })
               .done(function(res) {
                   console.log(res.data)
                   defer.resolve(res.data);
               });

           return defer.promise();
       },
       getKeyWords:function(value){
           var defer = $.Deferred();

           $.ajax(REQUEST_URLS.keyWords+''+value, {
               dataType: 'jsonp',
               scriptCharset: 'gbk',
               data: {
                   p: 3,
                   json: 1,
                   xzmode: 1
               }
           })
               .done(function(res) {
                   if(!res.s) {
                       return
                   }
                   defer.resolve(res);
               });

           return defer.promise();
       }
   }
    window.Data = data;
}())
//tn:client_software
//resource_id:13103
//ie:utf-8
//oe:utf-8
//format:jsonp
//cb:jQuery191038398630754090846_1453119572393
//query:处女座运势
//_:1453119572417
//
//
//tn:client_software
//resource_id:13103
//ie:utf-8
//oe:utf-8
//format:jsonp
//cb:jQuery111308299538036808372_1453120953678
//query:双子座运势
//_:1453120953693