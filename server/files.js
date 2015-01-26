Meteor.publish('files', function() {
    return Files.find({});
});



Meteor.methods({
   changefile: function(change){
        Files.insert(change);
    }
});