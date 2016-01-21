/**
 * Created by guoshuli on 2016/1/19.
 */
(function(){
var searchBox ={
    events:function(){
        var that = this,
            bdSearch = $('.bd-search'),
            bdSearchWrapper = $('.bd-search-wrapper'),
            bdSearchButton = $('.bd-search-button');
        that.searchIndex = 0;
        bdSearch.on('focus',function(){
            bdSearchWrapper.addClass('bd-search-wrapper-blue')
        });
        bdSearch.on('blur',function(e){
            setTimeout(function(){
                bdSearchWrapper.removeClass('bd-search-wrapper-blue');
                that.clearSearchResult();
            },100)


        });
        bdSearch.on('keyup',function(e){
            var bdS = $('.bd-search'),
                val = bdS.val(),
                text = '';
            if(!val){
                that.clearSearchResult();
                return
            }

            if(e.keyCode == 13){
                if(val){
                    window.open('https://www.baidu.com/s?&ie=utf-8&wd='+val);
                    return;
                }
                else{
                    return
                }
            }
            else if (e.keyCode == 40){
                var searchList = $('.result-list-item');
                if(!searchList){
                    return;
                }

                if(that.searchIndex>=searchList.length){
                    that.searchIndex = 0;
                }
                searchList.eq(that.searchIndex).addClass('result-list-item-hover').siblings().removeClass('result-list-item-hover');
                text = searchList.eq(that.searchIndex).find('a').text();
                bdS.val(text);
                that.searchIndex++;

            }
            else if(e.keyCode == 38) {
                var searchList = $('.result-list-item');
                if(!searchList){
                    return;
                }
                --that.searchIndex;

                if(that.searchIndex<0){
                    that.searchIndex = searchList.length-1;
                }
                searchList.eq(that.searchIndex).addClass('result-list-item-hover').siblings().removeClass('result-list-item-hover');
                text = searchList.eq(that.searchIndex).find('a').text();
                bdS.val(text);
            }
            else {
                that.getSearchData(val);
            }

        });
        bdSearchButton.on('click',function(e){
            var val = $('.bd-search').val();

            if(!val) {
                return
            }
            window.open('https://www.baidu.com/s?&ie=utf-8&wd='+val);
        })
    },

    clearSearchResult:function(){
        var searchResult = $('.search-result'),
            that = this;
        searchResult.hide();
        searchResult.html('');
        that.searchIndex = 0;

    },
    
    getSearchData: function (val) {
        var that = this,
            str = '',
            resultListItems = $('<ul class="result-list-items">'),
            searchResult = $('.search-result');
        Data.getKeyWords(val).done(function(data){
            if(!data.s) {
                that.clearSearchResult();
                return
            }
            else {
                $.each(data['s'],function(i,item){
                    str = str+'<li class="result-list-item"><a href="https://www.baidu.com/s?&ie=utf-8&wd='+item+'" target="_blank">'+item+'</a></li>'
                });
                resultListItems.html(str);
                searchResult.html(resultListItems);
                searchResult.show();
                that.clickA();
            }
        })
    },

    clickA:function(){
        var a = $('.result-list-items'),
            that = this;
        a.on('click','a',function(e){
            e.preventDefault();
            var url = $(this).attr('href');
        //that.clearSearchResult();
            window.open(url);
        })
    },

    init:function(){
        var that = this;
        that.searchIndex = 0;
        that.events();
    }
};
    searchBox.init();
}())