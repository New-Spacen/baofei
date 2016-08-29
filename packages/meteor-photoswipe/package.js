Package.describe({
    name: 'onc:photoswipe',
    summary: 'PhotoSwipe JavaScript gallery, no dependencies from loftsteinn:photoswipe',
    version: '4.1.1',
    git: 'https://github.com/oskarszoon/meteor-photoswipe'
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');
    api.use(['templating'], 'client');

    api.addFiles([
        'lib/dist/photoswipe.css',
        'lib/dist/default-skin/default-skin.css',
        'lib/dist/photoswipe.js',
        'lib/dist/photoswipe-ui-default.js',
        'pswp.html'
    ], 'client');

    api.addAssets([
        'lib/dist/default-skin/default-skin.png',
        'lib/dist/default-skin/default-skin.svg',
        'lib/dist/default-skin/preloader.gif'
    ], 'client');
});