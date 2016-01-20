
(function(){

    var star = {
        events:function(){
            var that = this,
                $button = $('.constellation-header-items'),
                $buttonDetail = $('.constellation-detail');
            $button.on('click','li', function (e) {
                var $name = $(this).data('name');
                $(this).addClass('constellation-tab-active').siblings().removeClass('constellation-tab-active');


            });

            $buttonDetail.on('click','li',function(){
                var $name = $(this).data('id');
                $(this).addClass('constellation-tabs-active').siblings().removeClass('constellation-tabs-active');
                $('#'+$name).show().siblings('.constellation-tabs-panel').hide();
            })
        },

        initStar:function(name){
            Data.getStar().done(function(data){
                console.log(data);
            })
        },

        init:function(){
        var that = this;
            this.source = {};

            that.events();
            that.initStar();
        }
    };

    star.init();



}())