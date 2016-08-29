Template.bjlist.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('newcar',{sort: {rksj: -1}, limit: 50});
  }.bind(this));
};

Template.bjlist.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.bjlist.helpers({
  veh: function () {
    return Newcar.find({}, {sort: {createdAt: -1, limit: 10}});
  }
});
