fis.config.merge({
    modules: {
        parser: {
            less: 'less',
            tmpl: 'utc'
        },
        postprocessor: {
            js: "jswrapper, require-async",
            html: "require-async"
        },
        postpackager : ['autoload', 'simple'],
        lint : {
            js : 'jshint'
        }
    },
    roadmap: {
    	domain: 'http://liulanqi.baidu.com:8080/graduateDesign/dist',
        ext: {
            less: 'css'
        },
        path : [
            {
                reg : /^\/modules\/([^\/]+)\/\1\.(js)$/i,
                isMod : true,
                id : '$1',
                release : '$&'
            },
            {
                reg : /^\/modules\/(.*)\.(js)$/i,
                isMod : true,
                id : '$1',
                release : '$&'
            },
            {
            	reg: /_bak-.*\.css$/,
            	release: false
            },
            {
                reg : /^(.*)\.(css|less)$/i,
                useSprite : true,
                release : '$&'
            },
            {
            	reg: /_bak-.*\.html$/,
            	release: false
            },
            {
            	reg: /\/template\/.*html$/,
            	release: false
            },
            {
            	reg: /^\/libs\/.*\.(js|swf)$/,
            	release: '/js/$&',
            	useHash: false
            },
            {
                reg : /.*\.html/,
                useCache : false,
                release : '$&'
            },
            {
                reg : 'README.md',
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
    	'/js/lib.js': [
    		'/libs/dialog.js',
    		'/libs/jquery-1.11.3.min.js'
    	],

    	'/js/core.js': [
            'js/data.js',
            'js/detailbox.js',
            'js/mainContent.js',
            'js/fun.js',
            'js/gif.js',
            'js/hotbox.js',
            'js/navigation.js',
            'js/constellation.js',
            'js/video.js'
    	]},
    deploy: {
		dist: {
			to: '../publish',
			exclude: /^(?:\/modules\/|\/libs\/)/i
		}
	}
});