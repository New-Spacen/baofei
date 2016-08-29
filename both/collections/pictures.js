Pictures = new Mongo.Collection('pictures');

Pictures.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  },
 // update: function(userId, doc) {
 //    //只允许登录用户添加帖子
 //   return !! userId;
 // }
  update: function() {
    // 只允许登录用户添加帖子
    return true;
  } 
});



 Pictures.before.insert(function (userId, doc) {
   doc.createdAt = new Date();
 });


Pictures.attachSchema(new SimpleSchema({

  newcarid: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  qmz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fdj: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  
  fxj: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  
  bsq: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  qhq: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cjz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  time: {
    type: String,
    optional: true
  },
  endTime: {
    type: String,
    optional: true
  }
}));
