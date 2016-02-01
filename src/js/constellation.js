(function(){
    var localStorage = window.localStorage;
    var star = {
        events:function(){
            var that = this,
                $button = $('.constellation-header-items'),
                $buttonDetail = $('.constellation-detail'),
                $buttonSetLi = $('.constellation-list li'),
                $starSet = $('.constellation-button-save');
            $button.on('click','li', function (e) {
                var $Ename = $(this).data('name'),
                    $Cname = $(this).find('a').text();
                $(this).addClass('constellation-tab-active').siblings().removeClass('constellation-tab-active');
                if(!$Ename) {
                    $('#constellation-set').show().siblings().hide();
                    return ;
                }
                if(that.source[$Ename]){
                    $('#constellation-'+$Ename).show().siblings().hide();
                    return;
                }
                else {
                    that.source[$Ename] = 1;
                    that.getData($Cname,$Ename);
                    //Data.getStar($Cname).done(function(data){
                    //    that.dealInDom(data,$Cname,$Ename);
                    //})
                }
            });

            $buttonDetail.on('click','li',function(){
                var $name = $(this).data('id');
                $(this).addClass('constellation-tabs-active').siblings().removeClass('constellation-tabs-active');
                $('#'+$name).show().siblings('.constellation-tabs-panel').hide();
            });
            $buttonSetLi.on('click',function(e){
                $(this).toggleClass('constellation-state-selected');
                var hasSelected = $buttonSetLi.hasClass('constellation-state-selected');
                if(!hasSelected){
                    $starSet.prop('disabled',true);
                }
                else {
                    $starSet.prop('disabled',false);
                }
            });
            $starSet.on('click', function (e) {
                var $starList = $('.constellation-list li'),
                    tempObj = [],
                    constellationHeaderHtem = $('.constellation-header-items li');
                for(var i = 0;i<$starList.length;i++) {
                    (function(){
                        tempObj[i] = {
                            Ename: $starList.eq(i).data('name'),
                            Cname:$starList.eq(i).find('.constellation-name').text().slice(0,2),
                            show:$starList.eq(i).hasClass('constellation-state-selected')?true:false
                        }
                        if(tempObj[i]['show'] == true){
                            $('.constellation-header-items li[data-name='+tempObj[i]['Ename']+']').show();
                        }
                        else {
                            $('.constellation-header-items li[data-name='+tempObj[i]['Ename']+']').hide();
                        }
                    }(i));
                }
                var localsto = JSON.parse(localStorage.getItem('constellation'));
                $.extend(localsto,tempObj);
                localStorage.setItem('constellation',JSON.stringify(localsto));

            })
        },

        getData:function($Cname,$Ename){
            var that = this;
            Data.getStar($Cname).done(function(data){
                that.dealInDom(data,$Cname,$Ename);
            })
        },

        getStarContent:function(name){
            if(!name) {
                return ;
            }
            Data.getStar(name).done(function(data){
                return data;
            })
        },

        dealInDom :function(str,$Cname,$Ename){
            var starDate = {
                '白羊':'3.21-4.19',
                '金牛':'4.20-5.20',
                '双子':'5.21-6.21',
                '巨蟹':'6.22-7.22',
                '狮子':'7.23-8.22',
                '处女':'8.23-9.22',
                '天枰':'9.23-10.23',
                '天蝎':'10.24-11.22',
                '射手':'11.23-12.21',
                '摩羯':'12.22-1.19',
                '水瓶':'1.20-2.18',
                '双鱼':'2.19-3.20'
            },
                constellationContent = $('.constellation-content'),
                that = this;
            var template = ' <div id="constellation-'+$Ename+'" class="tabs-panel" style="display: block;">' +
                '<a class="constellation-icon-wrapper" target="_blank" href="http://www.baidu.com/s?wd='+$Cname+'座运势">' +
                '<img class="constellation-icon" alt="" src="images/constellation/icon-'+$Ename+'.png">' +
                '<div class="constellation-info">' +
                '<span class="constellation-name">'+$Cname+'座</span>' +
                '<span class="constellation-daterange">'+starDate[$Cname]+'</span>' +
                '</div>' +
                '</a>' +
                '<div class="constellation-detail">' +
                '<ul class="constellation-tabs-nav">' +
                '<li data-id="constellation-'+$Ename+'-today" class="constellation-tabs-active">' +
                '<a href="#constellation-'+$Ename+'-today">今日运势</a>' +
                '</li>' +
                '<li data-id="constellation-'+$Ename+'-tomorrow" class="">' +
                '<a href="#constellation-'+$Ename+'-tomorrow">明日运势</a>' +
                '</li>' +
                '<li data-id="constellation-'+$Ename+'-week" class="">' +
                '<a href="#constellation-'+$Ename+'-week">本周运势</a>' +
                '</li>' +
                '</ul>' +
                '<div id="constellation-'+$Ename+'-today" class="constellation-tabs-panel" style="display: block;">' +
                '<div class="constellation-fortune">' +
                '<p style="float: none; position: static;">'+str.content1+'</p>' +
                '</div>' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-1">' +
                '<li> <span class="constellation-fortune-value-label">'+str.row[2].key2+'</span>'+str.row[2].value2+' </li>' +
                '<li> <span class="constellation-fortune-value-label">'+str.row[0].key2+'</span>'+str.row[0].value2+' </li>' +
                '</ul>' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-2">' +
                '<li> <span class="constellation-fortune-value-label">综合指数：</span>' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[0].value1*20)+'%"></div>' +
                '</div>' +
                '</li>' +
                '<li>' +
                '<span class="constellation-fortune-value-label">爱情指数：</span>' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[2].value1*20)+'%">' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li>' +
                '<span class="constellation-fortune-value-label">工作指数：</span>' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total">' +
                '</div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[1].value1*20)+'%">' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li>' +
                '<span class="constellation-fortune-value-label">财运指数：</span>' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[0].value1*20)+'%">' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div id="constellation-'+$Ename+'-tomorrow" class="constellation-tabs-panel" style="display: none;">' +
                '<div class="constellation-fortune">' +
                '<p style="float: none; position: static;">'+str.content2+'</p>' +
                '</div>' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-1">' +
                '<li> <span class="constellation-fortune-value-label">幸运颜色：</span>'+str.row[6].value2+' </li> ' +
                '<li> <span class="constellation-fortune-value-label">速配星座：</span>'+str.row[4].value2+' </li> ' +
                '</ul> ' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-2">' +
                '<li> <span class="constellation-fortune-value-label">综合指数：</span> ' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total"></div> ' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[4].value1*20)+'%"></div> ' +
                '</div> ' +
                '</li>' +
                '<li> <span class="constellation-fortune-value-label">爱情指数：</span>' +
                '<div class="constellation-fortune-score">' +
                '<div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[6].value1*20)+'%"></div>' +
                '</div> </li> <li> <span class="constellation-fortune-value-label">工作指数：</span>' +
                '<div class="constellation-fortune-score"><div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[5].value1*20)+'%">' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li> <span class="constellation-fortune-value-label">财运指数：</span>' +
                '<div class="constellation-fortune-score"> <div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[7].value1*20)+'%"></div> </div> </li> </ul> </div>' +
                '<div id="constellation-'+$Ename+'-week" class="constellation-tabs-panel" style="display: none;">' +
                '<div class="constellation-fortune"> <p style="float: none; position: static;">'+str.content3+'</p> </div>' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-1">' +
                '<li><span class="constellation-fortune-value-label">工作运势：</span>'+str.row[8].value2+' </li>' +
                '<li> <span class="constellation-fortune-value-label">财富运势：</span>'+str.row[9].value2+' </li>' +
                '</ul>' +
                '<ul class="constellation-fortune-values constellation-fortune-values-type-2">' +
                '<li> <span class="constellation-fortune-value-label">综合运势：</span>' +
                '<div class="constellation-fortune-score"> <div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[8].value1*20)+'%"></div> </div> </li>' +
                '<li> <span class="constellation-fortune-value-label">爱情运势：</span>' +
                '<div class="constellation-fortune-score"> <div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[9].value1*20)+'%"></div> </div> </li>' +
                '<li> <span class="constellation-fortune-value-label">健康运势：</span>' +
                '<div class="constellation-fortune-score"> <div class="constellation-fortune-score-total"></div>' +
                '<div class="constellation-fortune-score-value" style="width: '+(str.row[10].value1*20)+'%">' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>';
            constellationContent.append(template);
            $('#constellation-'+$Ename).show().siblings().hide();
            that.addTabEvents($Ename);



        },
        addTabEvents:function($Ename){
            var constellation = $('#constellation-'+$Ename);
            var $el = constellation.find('.constellation-tabs-nav li'),
                $content = constellation.find('.constellation-tabs-panel');
            $el.on('click',function(){
                $(this).addClass('constellation-tabs-active').siblings().removeClass('constellation-tabs-active');
                $content.hide().eq($(this).index()).show();

            })
        },

        initStar:function(){
            var constellation = JSON.parse(localStorage.getItem('constellation')),
                constellationHeaderItems = $('.constellation-header-items li'),
                tempObj = [],
                that = this;
            if(!constellation){

                for (var i = 0;i<constellationHeaderItems.length-1;i++) {
                    (function(){
                        tempObj[i]  = {
                            'Ename':constellationHeaderItems.eq(i).data('name'),
                            'Cname':constellationHeaderItems.eq(i).find('a').text(),
                            'show':true
                        }
                    }(i))
                }
                localStorage.setItem('constellation',JSON.stringify(tempObj));
                that.getData(tempObj[0].Cname,tempObj[0].Ename);

            }
            else {
                $.each(constellation,function(i,item){
                    if(constellation[i]['show'] == true){
                        $('.constellation-header-items li[data-name ='+item.Ename+']').show();
                        $('.constellation-list li[data-name ='+item.Ename+']').addClass('constellation-state-selected');

                    }
                    else {
                        $('.constellation-header-items li[data-name ='+item.Ename+']').hide();
                        $('.constellation-list li[data-name ='+item.Ename+']').removeClass('constellation-state-selected');
                    }
                });
                that.getData($('.constellation-header-items li:visible').first().addClass('constellation-tab-active').find('a').text(),$('.constellation-header-items li:visible').first().data('name'));
            }
        },

        init:function(){
        var that = this;
            this.source = {};
            that.initStar();
            that.events();

        }
    };

    star.init();



}())