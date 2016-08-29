Meteor.methods({
	
  'Pictures.insert': function (post_pictures) {
        Pictures.insert(post_pictures ,{validate: false,modifier: false}, function(error, result){
			if (error) {
				console.log(error);
			} else {
				console.log('insert完成');
			}
		});
   },	
  'Pictures.update': function (newcarid,post_pictures) {
		//Pictures.update({"newcarid" : _newcar_id},  {$addToSet: post_pictures});
		
		//Pictures.update( {newcarid :newcarid},{$addToSet:post_pictures}, function(error,result) {
		Pictures.update( {newcarid :newcarid},{$set: post_pictures }, function(error,result) {
			if (error) {
				console.log(error);
			} else {
				// console.log('post_pictures:',post_pictures)
				console.log('update完成');
			}
		});
   },
  'Newcar.update': function (newcarid,post_pictures) {
		//Pictures.update({"newcarid" : _newcar_id},  {$addToSet: post_pictures});
		
		//Pictures.update( {newcarid :newcarid},{$addToSet:post_pictures}, function(error,result) {
		Newcar.update({_id :newcarid},{$set: post_pictures }, function(error,result) {
			if (error) {
				console.log(error);
			} else {
				// console.log(newcarid);
				// console.log(post_pictures);
				console.log('update完成');
			}
		});
   },
  
  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  },
  
  'getgpsline': function(imei, currentdate) {
    var flightPlanCoordinates = new Array();
    var test_vehgps = Vehgps.find({imei:imei},{sort:{"utc":-1},limit:200});
	
 	test_vehgps.forEach(function (vgps) {
		var arr = new Array();
		var latLng=GPS.gcj_encrypt(vgps.lat,vgps.lng);
		
		arr.push(latLng.lat,latLng.lng,vgps.imei,vgps.utc);
 		flightPlanCoordinates.push(arr);
  	});
	return flightPlanCoordinates;
  },
  'getinoutline': function(imei, currentdate) {
    var flightPlanCoordinates = new Array();
    var test_vehgps = Vehgps.find({imei:imei,utc:{$lte:currentdate}},{sort:{"utc":-1},limit:20});
	
 	test_vehgps.forEach(function (vgps) {
		var arr = new Array();
		var latLng=GPS.gcj_encrypt(vgps.lat,vgps.lng);
		
		arr.push(latLng.lat,latLng.lng,vgps.imei,vgps.utc);
 		flightPlanCoordinates.push(arr);
  	});
	return flightPlanCoordinates;
  },
  
  'Veh.insert': function(latLng) {
        if (!Meteor.user()) {
            return;
        }else{
			console.log("Meteor.user()");
			console.log(Meteor.user()._id);
	    }
		
        var user = Meteor.user().username;
		var rksj= new Date();
		rksj = DateFormat.dtformat(rksj,"yyyy-MM-dd hh:mm:ss");
		var WGS84=GPS.gcj_encrypt(latLng.lat,latLng.lng);
		
		
		var str = rksj;
		str = str.replace(/-/g,"/");
		var date = new Date(str);
		
		var et = Veh.findOne({username: "358614131641249"});
		var str2 = et.rksj;
		str2 = str2.replace(/-/g,"/");
		var date2 = new Date(str2);
			
			
		if(Veh.find({userId: this.userId}).count() === 0){ 
		
			  Veh.insert({
			  userId: this.userId,
			  username: user,
			  lat : latLng.lat,
			  lng : latLng.lng,
			  WGS84lat : WGS84.lat,
			  WGS84lng : WGS84.lng,
			  marker: {
				lat: latLng.lat,
				lng: latLng.lng
			  },
			  rksj: rksj
			},{validate: false,modifier: false}, function(error, result){
				  if (error) console.log(error);  //alert(error.message);
			}); 
		}else{
			console.log("Veh.find({userId: this.userId}).count():");
			console.log(Veh.find({userId: this.userId}).count());
			Veh.update( {userId: this.userId}, { $set: { lat : latLng.lat, lng : latLng.lng , WGS84lat : WGS84.lat, WGS84lng : WGS84.lng, rksj: rksj ,'marker.lat': latLng.lat , 'marker.lng': latLng.lng} } );
		}
		
		
		
		if(user == 'jiazhang'){
			//查找儿童经纬度
			var ertong = Veh.findOne({username: "358614131641249"});
			console.log("儿童：");
			//console.log(ertong);
			
			var juli = GPS.distance(ertong.lat, ertong.lng, latLng.lat, latLng.lng);
			if(juli > 200)
			{
				Vehgps.insert({
				  time: rksj,
				  thing: "市团委演示",
				  address : getLocationPlace(latLng)
				},{validate: false,modifier: false}, function(error, result){
					  if (error) console.log(error);  //alert(error.message);
				}); 
			}
			
			console.log("ser == jiazhang");
			console.log("家长jiazhang：" + latLng.lat);
			console.log("儿童358614131641249：" + ertong.lat);
			console.log("距离儿童：" + juli);
		}
		
		if(user == '358614131641249'){
			//查找家长经纬度
			var jiazhang = Veh.findOne({username: "jiazhang"});
			console.log("家长：");
			//console.log( jiazhang);
				
			var juli = GPS.distance(jiazhang.lat, jiazhang.lng, latLng.lat, latLng.lng);
			if(juli > 200)
			{
				Vehgps.insert({
				  time: rksj,
				  thing: "市团委演示",
				  address : getLocationPlace(latLng)
				},{validate: false,modifier: false}, function(error, result){
					  if (error) console.log(error);  //alert(error.message);
				}); 
			}
			console.log("user == 358614131641249");
			console.log("家长jiazhang：" + jiazhang.lat);
			console.log("儿童358614131641249：" + latLng.lat);
			console.log("距离家长：" + juli);
			

			
			console.log(date);
			console.log(date2);
			console.log(date - date2);
			
			//name,time,action
			if(date - date2 > 10000)
			{
			    Sendsms.sendsms2('某某某', rksj ,'离开办公室');
			}
		}
		
		
  },
  'getLocationPlace':function(loc) {

  	var latLng=GPS.gcj_encrypt(loc.lat,loc.lng);

	var url= 'http://maps.google.cn/maps/api/geocode/json?'
		+ 'latlng=' + latLng.lat + ',' + latLng.lng
		+ '&language=zh-CN';

	console.log(url);
    
	var response = HTTP.get(url);

    if (response.statusCode === 200 && response.data) {
	 //alert(response.statusCode);
		var place=response.data.results[0].formatted_address;	 
	 console.log(place);
        return place;
    }
  }

  
  
  
  
  
});


Meteor.methods({
usernames: function() {
 var test_users = Meteor.users.find();
 test_users.forEach(function (user) {
   console.log(user.username);
   return 'test output';
 });
}
})