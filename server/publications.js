Meteor.publish('vehs', function() {
  return Veh.find({},{sort: {hphm: 1}});
});

Meteor.publish('veh', function(_id) {
   return Veh.find({_id: _id});
});

Meteor.publish('vehinfo', function(_id) {
   return Veh.find({imei: _id});
});

Meteor.publish('vehsmap', function() {
  return Veh.find({},{fields:{lng:1,lat:1,username:1,userId:1,rksj:1}});
});

Meteor.publish('vehgps', function() {
   return Vehgps.find();
});

Meteor.publish('share', function() {
   return Share.find();
});

 Meteor.publish('cubicle', function() {
    return Cubicle.find();
 });

// Meteor.publish('carlist_photo', function() {
//    return Carlist_photo.find();
// });

Meteor.publish('inouts', function() {
  return Inout.find({}, {sort: {time: -1},limit: 50});
});

Meteor.publish('inout', function(_id) {
  return Inout.find({_id: _id});
}); 
 
Meteor.publish('inoutzones', function(sn) {
  return Inout.find({sn: sn},{sort: {time: -1},limit: 40});
}); 


Meteor.publish('baojings', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Baojing.find({}, options);
});

Meteor.publish('baojing', function(_id) {
  return Baojing.find({_id: _id});
});


Meteor.publish('workzones', function() {
  return Workzone.find();
});

Meteor.publish('carlist', function() {
  return Carlist.find();
});

Meteor.publish('content', function() {
  return content.find();
});

Meteor.publish('content_photo', function() {
  return content_photo.find();
});

Meteor.publish('newcar', function() {
  return Newcar.find();
});

Meteor.publish('pictures', function() {
  return Pictures.find();
});


Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});

Meteor.publish('newcarSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Newcar.search(query);
});

Meteor.publish('newcarSearchVINNO', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Newcar.searchVINNO(query);
});

Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Products.find({_id: {$in: user.profile.votedProductIds}});
        }
      }
    ]
  };
});
