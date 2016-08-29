Package.describe({
  name: 'onc:qq-maps',
  summary: 'QQ Maps Javascript API v2',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
    'templating',
    'reactive-var',
    'underscore']);
  api.addFiles([
    'qq-maps.html',
    'qq-maps.css',
    'qq-maps.js'], 'client');
  api.export('QqMaps', 'client');
});


