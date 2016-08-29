
Meteor.startup(function() {

  ServiceConfiguration.configurations.remove({
    service: "wechatWeb"
  });
  ServiceConfiguration.configurations.insert({
    service: "wechatWeb",
    appId: "wx360b8b7419186ce9",
    scope:'basic',
    secret: "3109a4c579132a5cd22e6b1e26aa140a"
  });

});

