Template.inout.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('inouts');
  }.bind(this));
};

Template.inout.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.inout.helpers({
  inouts: function () {
    return Inout.find({},{sort: {time: -1}});
  }
});
