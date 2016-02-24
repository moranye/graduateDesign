/**
 * Created by guoshuli on 2016/1/19.
 */
(function () {
    var searchBox = {
        events: function () {
            var that = this,
                bdSearch = $('.bd-search'),
                bdSearchWrapper = $('.bd-search-wrapper'),
                bdSearchButton = $('.bd-search-button');
            that.searchIndex = 0;
            bdSearch.on('focus', function () {
                bdSearchWrapper.addClass('bd-search-wrapper-blue')
            });
            bdSearch.on('blur', function (e) {
                setTimeout(function () {
                    bdSearchWrapper.removeClass('bd-search-wrapper-blue');
                    that.clearSearchResult();
                }, 100)


            });
            bdSearch.on('keyup', function (e) {
                var bdS = $('.bd-search'),
                    val = bdS.val(),
                    text = '';
                if (!val) {
                    that.clearSearchResult();
                    return
                }

                if (e.keyCode == 13) {
                    if (val) {
                        window.open('https://www.baidu.com/s?&ie=utf-8&wd=' + val);
                        return;
                    }
                    else {
                        return
                    }
                }
                else if (e.keyCode == 40) {
                    var searchList = $('.result-list-item');
                    if (!searchList) {
                        return;
                    }

                    if (that.searchIndex >= searchList.length) {
                        that.searchIndex = 0;
                    }
                    searchList.eq(that.searchIndex).addClass('result-list-item-hover').siblings().removeClass('result-list-item-hover');
                    text = searchList.eq(that.searchIndex).find('a').text();
                    bdS.val(text);
                    that.searchIndex++;

                }
                else if (e.keyCode == 38) {
                    var searchList = $('.result-list-item');
                    if (!searchList) {
                        return;
                    }
                    --that.searchIndex;

                    if (that.searchIndex < 0) {
                        that.searchIndex = searchList.length - 1;
                    }
                    searchList.eq(that.searchIndex).addClass('result-list-item-hover').siblings().removeClass('result-list-item-hover');
                    text = searchList.eq(that.searchIndex).find('a').text();
                    bdS.val(text);
                }
                else {
                    that.getSearchData(val);
                }

            });
            bdSearchButton.on('click', function (e) {
                var val = $('.bd-search').val();

                if (!val) {
                    return
                }
                window.open('https://www.baidu.com/s?&ie=utf-8&wd=' + val);
            })
        },

        clearSearchResult: function () {
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
            Data.getKeyWords(val).done(function (data) {
                if (!data.s) {
                    that.clearSearchResult();
                    return
                }
                else {
                    $.each(data['s'], function (i, item) {
                        str = str + '<li class="result-list-item"><a href="https://www.baidu.com/s?&ie=utf-8&wd=' + item + '" target="_blank">' + item + '</a></li>'
                    });
                    resultListItems.html(str);
                    searchResult.html(resultListItems);
                    searchResult.show();
                    that.clickA();
                }
            })
        },

        clickA: function () {
            var a = $('.result-list-items'),
                that = this;
            a.on('click', 'a', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                //that.clearSearchResult();
                window.open(url);
            })
        },

        init: function () {
            var that = this;
            that.searchIndex = 0;
            that.events();
        }
    };
    var remoteControl = {

        cardsShow: function () {
            var sectionCardHandle = $('.section-card-handle');
            sectionCardHandle.show();
        },

        cardsHide: function () {
            var sectionCardHandle = $('.section-card-handle');
            sectionCardHandle.hide();
        },

        setLocalStorage: function () {
            var arr = [],
                sectionCards = $('.section-card'),
                length = sectionCards.length;
            for (var i = 0; i < length; i++) {
                if ($('.section-card').eq(i).css('display') == 'block') {
                    arr[i] = {
                        name: sectionCards.eq(i).attr('id'),
                        show: true
                    }
                }
                else {
                    arr[i] = {
                        name: sectionCards.eq(i).attr('id'),
                        show: false
                    }
                }

            }
            if(!$('.section-card:visible').length) {
                $.each(arr,function(i,item){
                    item['show'] = false;
                })
            }
            console.log(JSON.stringify(arr));
            localStorage.setItem('cards', JSON.stringify(arr));
        },

        events: function () {
            var that = this;
            var settingButton = $('.setting-button');
            var sectionContainer = $('.section-container');
            var sectionButtonClose = $('.section-button-close');
            var sectionBottomButton = $('.section-bottom-button');
            var sectionHardHandle = $('.section-card-handle');
            var sectionButtonRemove = $('.section-button-remove');
            var cardListItems = $('.card-list-items');
            settingButton.on('click', function (e) {
                sectionContainer.fadeIn();
                that.cardsShow()
            });

            sectionButtonClose.on('click', function (e) {
                sectionContainer.fadeOut();
                that.cardsHide();
            });

            sectionBottomButton.on('click', function (e) {
                sectionButtonClose.trigger('click');
            });

            sectionButtonRemove.on('click', function (e) {
                var parent = $(this).parents('.section-card').eq(0);
                var checked = $('.card-list-item-input:checked');
                var visible = $('.section-button-remove:visible');
                if(visible.length <= 1){
                    checked.prop('disabled',true);
                    visible.prop('disabled',true);
                }
                else {
                    checked.prop('disabled',false);
                    visible.prop('disabled',false);
                }
                parent.fadeOut();
                that.setLocalStorage();
                that.initButtonState();
            });
            cardListItems.on('change','input',function(e){
                var id = $(this).data('id');
                var checked = $('.card-list-item-input:checked');
                var visible = $('.section-button-remove:visible');
                if(checked.length <= 1){
                    checked.prop('disabled',true);
                    visible.prop('disabled',true);
                }
                else {
                    checked.prop('disabled',false);
                    visible.prop('disabled',false);
                }

                if($(this).prop('checked') == true) {
                    $('.section-card[id ='+id+']').fadeIn();
                        that.setLocalStorage();
                }
                else {
                    $('.section-card[id ='+id+']').fadeOut();
                        that.setLocalStorage();

                }

            })

        },
        initButtonState:function(){
            var storage = JSON.parse(localStorage.getItem('cards'));
            var cardListItems = $('.card-list-item input');
            if(!storage) {
                cardListItems.prop('checked',true);
            }
            else {
                $.each(storage,function(i,item) {
                    if(item['show'] == true) {
                        $('.card-list-item-input[data-id='+item['name']+']').prop('checked',true);
                    }
                    else {
                        $('.card-list-item-input[data-id='+item['name']+']').prop('checked',false);
                    }
                });
            }
        },

        initModules: function (obj) {
            if(!obj){
                return
            }
            $.each(obj,function(i,item) {
                if(item['show'] == true){
                    $('.section-card[id='+item['name']+']').show();
                }
                else {
                    $('.section-card[id='+item['name']+']').hide();
                }
            });
        },

        render: function () {
            var that = this;
            var tempObj = JSON.parse(localStorage.getItem('cards'));
            if(!tempObj) {
                that.initButtonState();
                that.events();
            }
            else{
                that.initModules(tempObj);
                that.initButtonState();
                that.events();
            }
        },

        init: function () {
            var that = this;
            that.render();
        }
    };
    searchBox.init();
    remoteControl.init();
}())