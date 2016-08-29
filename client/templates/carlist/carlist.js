Template.carlist.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('newcar',{sort: {rksj: -1}, limit: 50}); 
  }.bind(this));
};

Template.carlist.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.carlist.helpers({
  veh: function () {
  var mo = Newcar.find({"zt" : "开始工作"}, {sort: {createdAt: -1, xm: -1}});
  console.log('-----------carlist----------');
  return mo;
  }
});

// Template.carlist.events({
//   'click [data-action=newcar]': function (event, template) {
//     if (Meteor.user()) {
//       IonModal.open('newcar');
//       // var id = Session.get('id');
//       // console.log('跳转br:' + id);
//       // IonModal.open('br', id);
//     } else {
//         IonModal.close();
//         //IonModal.open('signIn');
//     }
//   }
// });
  