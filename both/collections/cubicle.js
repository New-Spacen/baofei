Cubicle = new Mongo.Collection('cubicle');

Cubicle.allow({
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



Cubicle.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


// Cubicle.attachSchema(new SimpleSchema({
//   chejian: {
//     type: String,
//     optional: true,
//     defaultValue: " "
//   },
//   gongwei: {
//     type: String,
//     optional: true,
//     defaultValue: " "
//   },
//   sn: {
//     type: String,
//     optional: true,
//     defaultValue: " "
//   },
//   workplace: {
//     type: String,
//     optional: true,
//     defaultValue: " "
//   }
// }));
