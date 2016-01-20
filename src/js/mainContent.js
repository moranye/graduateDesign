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
        bdSearch.on('focus',function(){
            bdSearchWrapper.addClass('bd-search-wrapper-blue')
        });
        bdSearch.on('blur',function(e){
            setTimeout(function(){
                bdSearchWrapper.removeClass('bd-search-wrapper-blue');
                that.clearSearchResult();
            },100)


        });
        bdSearch.on('keyup',function(){
            var val = $('.bd-search').val();
            if(!val){
                that.clearSearchResult();
                return
            }
            that.getSearchData(val);

        });
        bdSearchButton.on('click',function(){
            var val = $('.bd-search').val();
            if(!val) {
                return
            }
            window.open('https://www.baidu.com/s?&ie=utf-8&wd='+val);
        })
    },

    clearSearchResult:function(){
        var searchResult = $('.search-result');
        searchResult.hide();
        searchResult.html('');

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
        that.events();
    }
};
    searchBox.init();
}())