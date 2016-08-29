Share = new Mongo.Collection('share');

Share.allow({
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



Share.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Share.search = function(query) {
  if (!query) {
    return;
  }
  return Share.find({
    xh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Share.attachSchema(new SimpleSchema({

    share: {
    type: String,
    optional: true,
    defaultValue: " "
  }
  
 
}));
