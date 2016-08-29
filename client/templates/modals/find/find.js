Tracker.autorun(function() {
    if (Session.get('searchQuery')) {
        //Meteor.subscribe('newcarSearch', Session.get('searchQuery'));
    }
});


Template.find.events({
    'keyup input': function (event, template) {
        Session.set('searchQuery', event.target.value);
    },

    'click a': function (event, template) {
        IonModal.close();
    }
});

Template.find.helpers({
    newcar: function() {

        return Newcar.search(Session.get('searchQuery'));
    },
    searchQuery: function() {
        return Session.get('searchQuery');
    }

});