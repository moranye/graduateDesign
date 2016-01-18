fis.config.set('pack', {
    '/js/core.js': [
        'js/constellation.js',
        'js/data.js',
        'js/detailbox.js',
        'js/fun.js',
        'js/gif.js',
        'js/hotbox.js',
        'js/navigation.js',
        'js/video.js'
    ],
    '/css/aio.css': '**.css'
});
fis.config.set('modules.postpackager', 'simple');
fis.config.set('settings.postpackager.simple.autoCombine', true);