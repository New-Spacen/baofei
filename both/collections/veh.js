Veh = new Mongo.Collection('veh');

Veh.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  },
//  update: function(userId, doc) {
    // 只允许登录用户添加帖子
//    return !! userId;
//  }
  update: function() {
    return true;
  } 
});


Test = new Mongo.Collection('test');

Test.allow({

insert: function() {
	return true;
	}
});
