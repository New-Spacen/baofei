Template.content.created = function () {
  this.autorun(function () {
		this.subscription = Meteor.subscribe('newcar');
		var clid = Router.current().params._id;
		// console.log("Router._id:",);
		console.log('clid:',clid);
		Session.set('id', clid);  
  }.bind(this));
};

Template.content.helpers({
  veh: function () {
    	// return Newcar.find();
    	var id = Session.get('id');
    	console.log('id',id);
	   var mo = Newcar.findOne({_id:id });
	   console.log('mo',mo);
	   return mo;
  },
  // bjs: function () {
  //   return Newcar.find();
  // }
});


Template.content.events({
  'click [data-action=fh]': function (event, template) {
    Router.go("/bjlist");
  },

  'click [data-action=gb]': function (event, template) {
    Router.go("/bjlist");
  }
  
});