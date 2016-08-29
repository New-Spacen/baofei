Baojing = new Mongo.Collection('baojing');

Baojing.allow({
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



