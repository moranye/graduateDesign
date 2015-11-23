/**
 * Created by guoshuli on 2015/11/19.
 */
(function(){
    var localStorage = window.localStorage;
    var navigation = {
        storageInit : function() {
            var storage = JSON.parse(localStorage.getItem('tab')),storage_str = '';
            if(!storage){
                return;
            }
            for(var i=0;i<storage.length;i++){
                storage_str = storage_str+ '<li>' +
                '<img src="'+storage[i].url+'/favicon.ico'+'">' +
                '<a href="'+storage[i].url+'" target="_blank">'+storage[i].name+'</a>' +
                '</li>';
            }
            $('.website-items').html(storage_str);


        },

        events : function() {
            var navigationDialog = $('.dialog-navigation-edit');
            var $button = $('.tab-edit');
            navigationDialog.dialog();
            $button.on('click',function() {
                navigationDialog.dialog('open');
            })

        },

        initDialogs :function() {
            var firstTagInit = function(){
                var fistLi = $('.edit-container li:eq(0)'),
                    inputName = $('.edit-bottom-input-name'),
                    inputUrl = $('.edit-bottom-input-address');;
                fistLi.addClass('edit-container-edit');
                inputUrl.val(fistLi.find('.edit-container-item-name').data('url'));
                inputName.val(fistLi.find('.edit-container-item-name').html());

            };
            var draw = function(ui){
                var $el = ui,str = '',
                    websiteItemUrl = $('.website-items li'),
                    len = websiteItemUrl.length,
                    editContainer = $('.edit-container');
                for (var i = 0;i<len;i++){
                str = str+
                    '<li>' +
                    '<div class="edit-container-item-name" data-url="'+websiteItemUrl.eq(i).find("a").attr("href")+'">'+websiteItemUrl.eq(i).find("a").html()+'</div>' +
                    '<div class="edit-container-item-edit"></div>' +
                    '<div class="edit-container-item-delete"></div>' +
                    '</li>'
                };
                str = str+' <li class="edit-container-item edit-add-trigger">' +
                    '<div class="edit-container-item-addIcon"></div>' +
                    '<div class="edit-container-item-addText">添加</div>' +
                    '</li>';
                editContainer.html(str);
                firstTagInit();


            };

            var setEditEvents = function(){
                var editConLi = $('.edit-container li'),
                    del = $('.edit-container-item-delete'),
                    editWebsiteSave = $('#editWebsiteSave');
                var getHost =function(str) {
                    var bool = str.indexOf('http',0);
                    if(bool == -1){
                        str = 'http:\/\/' + str;
                    }
                    return str;
                };
                editConLi.on('click',function(){
                    var item = $(this),
                        dataUrl= '',
                        dataValue = '',
                        inputName = $('.edit-bottom-input-name'),
                        inputUrl = $('.edit-bottom-input-address'),
                        inputSave = $('.edit-bottom-input-save');
                    var button = item.find('.edit-container-item-name');
                    item.addClass('edit-container-edit').siblings().removeClass('edit-container-edit');

                    if(item.hasClass('edit-add-trigger')){
                        inputSave.html('增加');
                        inputName.val('');
                        inputUrl.val('');
                    }
                    else{
                        inputSave.html('修改');
                        dataUrl = button.data('url');
                        dataValue = button.html();
                        inputName.val(dataValue);
                        inputUrl.val(dataUrl);
                    }



                })
                del.on('click',function() {
                    var parent = $(this).parent(),index = parent.index();
                    $('.edit-container li').eq(index).remove();
                    $('.website-items li').eq(index).remove();
                    if(parent.hasClass('edit-container-edit')){
                        $('.edit-bottom-input-name').val(''),
                            $('.edit-bottom-input-address').val('');
                    };
                    $('.edit-add-trigger').addClass('edit-container-edit');
                })
                editWebsiteSave.on('click',function(){
                    var openStr= '',outerstr = '';
                    var name_input =  $('.edit-bottom-input-name').val(),
                        address_input = $('.edit-bottom-input-address').val(),
                        editContainerEdit = $('.edit-container-edit'),
                        editIndex = editContainerEdit.index(),
                        webSiteLi = $('.website-items li');
                    if(editContainerEdit.hasClass('edit-add-trigger')){
                        openStr =
                        '<li>' +
                        '<div class="edit-container-item-name" data-url="'+getHost(address_input)+'">'+name_input+'</div>' +
                        '<div class="edit-container-item-edit"></div><div class="edit-container-item-delete"></div>' +
                        '</li>';
                        outerstr =
                            '<li>' +
                            '<img src="'+getHost(address_input)+'/favicon.ico'+'">' +
                            '<a href="'+address_input+'" target="_blank">'+name_input+'</a>' +
                            '</li>';
                        $('.edit-add-trigger').before(openStr);
                        $('.website-items').append(outerstr);

                    }
                    else{
                        editContainerEdit.find('.edit-container-item-name').data('url',address_input);
                        editContainerEdit.find('.edit-container-item-name').html(name_input);
                        webSiteLi.eq(editIndex).find('img').attr('src',getHost(address_input)+'/favicon.ico');
                        webSiteLi.eq(editIndex).find('a').attr('href',address_input);
                        webSiteLi.eq(editIndex).find('a').html(name_input);
                        $('.edit-container li').removeClass('edit-container-edit');
                        $('.edit-container li:last').addClass('edit-container-edit');
                        $('.edit-bottom-input-name').val('');
                        $('.edit-bottom-input-address').val('');
                        $('.edit-bottom-input-save').html('增加');
                        //$('.edit-container li:last').click();

                    }


                })


            }
            $('.dialog-navigation-edit').dialog({
                open:function(ui){
                    draw(ui);
                    setEditEvents();
                },

                close:function(){
                    var str = [],obj={},
                        editContainerLi = $('.edit-container li');
                    for(var i = 0;i<editContainerLi.length;i++) {
                        obj={name:'',url:''};
                        obj.name = editContainerLi.eq(i).find('.edit-container-item-name').html();
                        obj.url = editContainerLi.eq(i).find('.edit-container-item-name').data('url');
                        str.push(obj)
                    }
                    str.pop();
                    localStorage.setItem('tab',JSON.stringify(str));

                    $('.edit-container').html();
                    $('.edit-bottom-input-name').val(''),
                    $('.edit-bottom-input-address').val('');
                    $('.edit-bottom-input-save').off('click');
                    $('.edit-container li').off('click');
                }
            })
        },

        init : function() {
            var that = this;
            that.storageInit();
            that.events();
            that.initDialogs();

        }
    }
    navigation.init();
}())
