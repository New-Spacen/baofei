Inout = new Mongo.Collection('inout');

Inout.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  },
//  update: function(userId, doc) {
    // 只允许登录用户添加帖子
//    return !! userId;
//  }
  update: function() {
    // 只允许登录用户添加帖子
    return true;
  } 
});


