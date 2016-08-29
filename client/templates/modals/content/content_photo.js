Template.content_photo.created = function () {
  this.autorun(function () {
		this.subscription = Meteor.subscribe('pictures');
		var clid = Router.current().params._id;
		console.log('clid1:',clid);
		Session.set('id', clid);  
  }.bind(this));
};

Template.content_photo.helpers({
  veh: function () {
    	var id = Session.get('id');
      console.log('id',id);
	   var mo = Pictures.findOne({newcarid:id });
	   console.log('mo',mo);
	   return mo;
  },
  // bjs: function () {
  //   return Newcar.find();
  // }
});
