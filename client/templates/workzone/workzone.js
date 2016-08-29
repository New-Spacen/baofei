Template.workzone.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('inouts');
  }.bind(this));
};


Template.workzone.helpers({
  inouts: function () {
    return Inout.find({},{sort: {time: -1}});
  }
});



Template.workzoneshow.helpers({

  zonename: function() {
    return  Router.current().params.zone;
  }
});


Template.workzoneshow.events({

 
});

