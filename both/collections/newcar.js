Newcar = new Mongo.Collection('newcar');

Newcar.allow({
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



Newcar.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

//搜索车牌号码
Newcar.search = function(query) {
  if (!query) {
    return;
  }
  return Newcar.find({
    cphm: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

//搜索车架号码
Newcar.searchVINNO = function(query) {
  if (!query) {
    return;
  }
  return Newcar.find({
    cjh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};


//搜索发动机号码
Newcar.searchTwo = function(query) {
  if (!query) {
    return;
  }
  return Newcar.find({
    fdjh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Newcar.attachSchema(new SimpleSchema({
  dwmc: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  sc_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cz_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  gwbh: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cphm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fdjh: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  syjbh: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cjh: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  chejian: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  gongwei: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zt: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  starTime: {
    type: String,
    optional: true
  },
  endTime: {
    type: String,
    optional: true
  }
}));
