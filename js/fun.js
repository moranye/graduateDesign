/**
 * Created by guoshuli on 2015/12/16.
 */
(function () {
    var localStorage = window.localStorage;
    var fun = {

        createJokes: function () {
            var that = this;
            Data.getJokers().done(function (data) {
                jokeLists = data;
                var temp = JSON.parse(localStorage.getItem('joke-visited'));
                var tempStorage = temp == null ? 0 : temp;
                that.initIndex(tempStorage);
                that.nowVisit = tempStorage;//当前是第几个笑话
                that.strLength = jokeLists.length;//总共有多少笑话
                that.events();
            })
        },
        initIndex: function (i) {
            var that = this;
            var vote = $('.vote-up-1');
            if(vote.hasClass('vote-animate')) {
                vote.removeClass('vote-animate')
            }
            that.content.find('p').animate({opacity: 0}, 200, function () {
                that.content.find('p').text(jokeLists[i].content);
                that.content.data('id', jokeLists[i].id);
                that.$el.find('.vote-up .vote-up-count').text(jokeLists[i].digg);
                that.$el.find('.vote-down .vote-down-count').text(jokeLists[i].bury);
            })
            setTimeout(function () {
                that.content.find('p').animate({top: 0, opacity: 1}, 200);
            },200)
            localStorage.setItem('joke-visited',i);

        },

        events: function () {
            var that = this;
            var change = $('.button-fun-change'),
                voteUp = $('.vote-up'),
                voteDown = $('.vote-down');
            change.on('click', function (e) {
                that.nowVisit++;
                if (that.nowVisit >= that.strLength) {
                    that.nowVisit = 0;
                }
                that.initIndex(that.nowVisit);
            })
            voteUp.on('click',function(){
                that.vote(1);

            });
            voteDown.on('click',function(){
                that.vote(-1);
            });

        },
        vote:function(value) {
            var id = $('.fun-joke').data('id'),
                localString = JSON.parse(localStorage.getItem('fun-zan')),
                voteCountUp = $('.vote-up'),
                voteCountDown = $('.vote-down'),
                plusCount = voteCountUp.find('.vote-up-count').html(),
                minusCount = voteCountDown.find('.vote-down-count').html();
            if(!localString) {
                localString = {};
            }
            if(localString[id]){
                return
            }
            localString[id] = 1;
            localStorage.setItem('fun-zan',JSON.stringify(localString));
            if(value == 1){
                ++plusCount;
                voteCountUp.find('.vote-up-count').html(plusCount).end()
                    .find('.vote-up-1').addClass('vote-animate');
            }

            else if(value == -1) {
                --minusCount;
                voteCountDown.find('.vote-down-count').html(minusCount).end()
                    .find('.vote-down-1').addClass('vote-animate');
            }

        },

        init: function () {
            var that = this;
            this.$el = $('.fun-content');
            this.content = this.$el.find('.fun-joke');//笑话文字
            this.nowVisit = 0;//初始化第几个笑话
            this.strLength = 0;//初始化笑话个数
            that.createJokes();
        }
    };

    fun.init();
}())