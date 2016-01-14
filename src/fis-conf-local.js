fis.config.merge({
    modules: {
        parser: {
            less: 'less',
            tmpl: 'utc'
        },
        postprocessor: {
            js: "jswrapper"
        },
        postpackager : ['autoload', 'simple'],
        lint : {
            js : 'jshint'
        }
    },
    roadmap: {
        domain : 'http://127.0.0.1:8080/graduateDesign/dist',

        ext: {
            less: 'css'
        },
        path : [
            {
                reg : /^\/inc\/.*/,
                release : false
            },
            {
                reg : /map\.json$/,
                release : false
            }
        ]
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        jshint : {
            i18n : 'zh-CN',
            camelcase : true,
            curly : true,
            eqeqeq : true,
            forin : true,
            immed : true,
            latedef : true,
            newcap : true,
            noarg : true,
            noempty : true,
            node : true
        }
    },
    pack: {

    },
    deploy: {
		dist: {
			to: '../publish',
			exclude: /^(?:\/modules\/|\/libs\/)/i
		}
	}
});

//使用simple插件，自动应用pack的资源引用
fis.config.set('modules.postpackager', 'simple');
//开始autoCombine可以将零散资源进行自动打包
fis.config.set('settings.postpackager.simple.autoCombine', true);
fis.config.set('settings.postpackager.simple.bodyTag', '<!--BODY_END-->');

