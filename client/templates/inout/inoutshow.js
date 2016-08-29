Template.inoutshow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('vehs');
  }.bind(this));


};

Template.inoutshow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.inoutshow.helpers({
  vehinfo: function () {
  
//    console.log(this.hphm);

    return Veh.findOne({hphm:this.hphm});
  },
  
  mappath: function(){
         var vehinfo=Veh.findOne({hphm:this.hphm});
   		    console.log(this.time);
   		    
   		if (Meteor.isClient) {
    
   		 Meteor.call('getinoutline', vehinfo.imei, this.time, function(error, result) {
   		    console.log(result);
		    var url='http://maps.google.cn/maps/api/staticmap?size=512x280&path=color:0x0000ff80|weight:5';
		    
		    var path="";
		    for(var i=0;i<result.length;i++){
		    
		    	lat= parseInt(result[i][0]*100000)/100000;
		    	lng= parseInt(result[i][1]*100000)/100000;
		    	
			    path = path + '|'+ lat + ',' + lng ;
		    }
   		    console.log(path);
	        Session.setDefault('mappathurl', url +path);
		
	}); 
	}
            return Session.get('mappathurl');
  } 
  
  
});
