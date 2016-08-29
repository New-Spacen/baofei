Template.carlist_photo.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('pictures',{sort: {rksj: -1}, limit: 50}); 
	var newcar_id = this.data._id;
	// var newcar_id = Router.current().params._id;
	Session.set('newcar_id',newcar_id);
	console.log("newcar_id:",newcar_id);
  }.bind(this));
};
var newcar_id;
Template.carlist_photo.helpers({
  veh: function () {
	  var id = Session.get("newcar_id");
	  // console.log("id:"+id);
      var mo = Pictures.findOne({newcarid: id}, {sort: {createdAt: -1, xm: -1}});
	  // console.log("newcar_id:"+id);
	   console.log("mo:"+mo);
	  // Session.set("newcar_id","");
      return mo;
  }
});

  