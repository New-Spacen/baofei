

Template.bjshow.helpers({

  vehinfo: function(){
  	return Veh.findOne({imei:this.imei});
  },

  gcjLocation: function () {
  
  


  	Meteor.call('myaddress', {lat:this.lat,lng:this.lng}, function(error, result) {
   	  console.log(result);
	  Session.set('gaddress', result);  	
  	});


  	latLng=GPS.gcj_encrypt(this.lat,this.lng);
    return latLng.lat + "," + latLng.lng;
  }, 
  
  gaddress: function() { return Session.get('gaddress'); }

});
