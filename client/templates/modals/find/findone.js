Tracker.autorun(function() {
    if (Session.get('searchQuery')) {
       // Meteor.subscribe('newcarSearchVINNO', Session.get('searchQuery'));
    }
});




Template.findone.events({
    'keyup input': function (event, template) {
        Session.set('searchQuery', event.target.value);
    },

    'click a': function (event, template) {
        IonModal.close();
    }
});

Template.findone.helpers({
    newcar: function() {

        return Newcar.searchVINNO(Session.get('searchQuery'));
    },
    searchQuery: function() {
        return Session.get('searchQuery');
    }

});