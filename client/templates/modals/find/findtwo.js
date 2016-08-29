Tracker.autorun(function() {
    if (Session.get('searchQuery')) {
       // Meteor.subscribe('newcarSearchVINNO', Session.get('searchQuery'));
    }
});




Template.findtwo.events({
    'keyup input': function (event, template) {
        Session.set('searchQuery', event.target.value);
    },

    'click a': function (event, template) {
        IonModal.close();
    }
});

Template.findtwo.helpers({
    newcar: function() {

        return Newcar.searchTwo(Session.get('searchQuery'));
    },
    searchQuery: function() {
        return Session.get('searchQuery');
    }

});