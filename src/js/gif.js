/**
 * Created by guoshuli on 2016/1/5.
 */

(function () {
    var localStorage = window.localStorage;

    var gifSection = {
        events: function () {
            var that = this,
                button = $('.button-gif-change'),
                voteUp =$('.gif-vote-up'),
                voteDown = $('.gif-vote-down');
            button.on('click',function(){
                that.id++;
                if(that.id>=that.tempStorage.length){
                    that.id = 0;
                }
                that.initSections(that.id);
            });
            voteUp.on('click',function(){
                that.vote(1);
            });
            voteDown.on('click',function(){
                that.vote(-1);
            });
        },

        vote:function(value) {
            var id = $('.gif-vote').data('id'),
                localString = JSON.parse(localStorage.getItem('gif-zan')),
                voteCountUp = $('.gif-vote-up'),
                voteCountDown = $('.gif-vote-down'),
                plusCount = voteCountUp.find('.gif-vote-up-count').html(),
                minusCount = voteCountDown.find('.gif-vote-down-count').html();
            if(!localString) {
                localString = {};
            }
            if(localString[id]){
                return
            }
            localString[id] = 1;
            localStorage.setItem('gif-zan',JSON.stringify(localString));
            if(value == 1){
                ++plusCount;
                voteCountUp.find('.gif-vote-up-count').text(plusCount).end()
                    .find('.gif-vote-up-1').addClass('gif-vote-animate');
            }

            else if(value == -1) {
                --minusCount;
                voteCountDown.find('.gif-vote-down-count').text(minusCount).end()
                    .find('.gif-vote-down-1').addClass('gif-vote-animate');
            }

        },

        getLocalNum: function () {
            var temp = localStorage.getItem('gif');
            return temp;
        },

        setLocalNum: function (id) {
            localStorage.setItem('gif', id);
        },

        initSections: function (id) {
            var that = this,
                gifImgContainer = $('.gif-img-container'),
                image = $('.gif-img-container img'),
                gifImgDesc = $('.gif-img-desc'),
                gifLoadImg = $('.gif-load-img'),
                gifLoadDownload = $('.gif-load-download'),
                gifVote = $('.gif-vote'),
                voteAnimateUp = $('.gif-vote-up-1'),
                voteAnimateDown = $('.gif-vote-down-1');
            this.length = that.tempStorage.length;

            if(voteAnimateUp.hasClass('gif-vote-animate')) {
                voteAnimateUp.removeClass('gif-vote-animate');
            }
            if(voteAnimateDown.hasClass('gif-vote-animate')) {
                voteAnimateDown.removeClass('gif-vote-animate');
            }
            gifLoadImg.show();
            image.on('load', function () {
                gifLoadImg.hide();
                gifImgContainer.css({width: that.tempStorage[that.id].width, height: that.tempStorage[that.id].height});
                gifLoadDownload.attr('href', that.tempStorage[that.id].url);
                gifImgDesc.text(that.tempStorage[that.id].desc);
                gifVote.data('id', that.id);
                gifVote.find('.gif-vote-up').find('.gif-vote-up-count').text(that.tempStorage[that.id].ding);
                gifVote.find('.gif-vote-down').find('.gif-vote-down-count').text(that.tempStorage[that.id].cai).end();
            }).attr('src', that.tempStorage[that.id].url);
            that.setLocalNum(that.id);

        },

        getGif: function () {
            var that = this,
                localNum = that.getLocalNum(),
                gifImage = $('.gif-image');
            Data.getGif().done(function (data) {
                if (!data) {
                    return
                }
                that.tempStorage = data;
                if (!localNum) {
                    that.id = 0;
                } else {
                    that.id = parseInt(localNum, 10);
                }
                that.initSections(that.id);
                that.events();
                gifImage.show();
            });
        },

        init: function () {
            var that = this;
            that.getGif();

        }
    };
    gifSection.init();
}())