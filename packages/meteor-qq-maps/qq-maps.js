
QqMaps = {
  load: _.once(function(options) {
    options = _.extend({ v: '2.exp' }, options);
    var params = _.map(options, function(value, key) { return key + '=' + value; }).join('&');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://map.qq.com/api/js?' + params +
      '&callback=QqMaps.initialize';


    document.body.appendChild(script);
  }),
  
  utilityLibraries: [],
  loadUtilityLibrary: function(path) {
    this.utilityLibraries.push(path);
  },
  _loaded: new ReactiveVar(false),
  loaded: function() {
    return this._loaded.get();
  },
  maps: {},
  _callbacks: {},
  initialize: function() {
    this._loaded.set(true);
    _.each(this.utilityLibraries, function(path) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = path;

      document.body.appendChild(script);
      
    });
  },
  _ready: function(name, map) {
    _.each(this._callbacks[name], function(cb) {
      if (_.isFunction(cb)) {
        cb(map);
      }
    });
  },
  ready: function(name, cb) {
    if (! this._callbacks[name]) {
      this._callbacks[name] = [];
    }
    // make sure we run the callback only once
    // as the tilesloaded event will also run after initial load
    this._callbacks[name].push(_.once(cb));
  },
  // options: function(options) {
  //   var self = this;
  //   return function() {
  //     if (self.loaded())
  //       return options();
  //   };
  // },
  get: function(name) {
    return this.maps[name];
  },
  _create: function(name, options) {
    var self = this;
    self.maps[name] = {
      instance: options.instance,
      options: options.options
    };

    if (options.type === 'StreetViewPanorama') {
      options.instance.setVisible(true);
      self._ready(name, self.maps[name]);
    } else {
      qq.maps.event.addListener(options.instance, 'tilesloaded', function() {
        self._ready(name, self.maps[name]);
      });
    }
  },
  create: function(options) {
    // default to Map
    var type = options.type ? options.type : 'Map';
    if (! _.include(supportedTypes, type)) {
      throw new Meteor.Error("GoogleMaps - Invalid type argument: " + type);
    }

    this._create(options.name, {
      type: type,
      instance: new qq.maps[type](options.element, options.options),
      options: options.options
    });
  }
};

Template.qqMap.onRendered(function() {
  var self = this;
  self.autorun(function(c) {
    // if the api has loaded
    if (QqMaps.loaded()) {
      var data = Template.currentData();

      if (! data.options) {
        return;
      }
      if (! data.name) {
        throw new Meteor.Error("GoogleMaps - Missing argument: name");
      }

      self._name = data.name;

      var canvas = self.$('.map-canvas').get(0);

      QqMaps.create({
        name: data.name,
        type: data.type,
        element: canvas,
        options: data.options
      });

      c.stop();
    }
  });
});

Template.qqMap.onDestroyed(function() {
  if (QqMaps.maps[this._name]) {
    QqMaps.maps.event.clearInstanceListeners(GoogleMaps.maps[this._name].instance);
    delete QqMaps.maps[this._name];
  }
});
