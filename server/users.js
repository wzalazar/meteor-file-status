Meteor.publish('me', function() {
    return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('allUsersOutMe', function() {
    return Meteor.users.find({_id: {$ne: this.userId} },
                             { 
                                fields: {
                                    'services.facebook.name':1,
                                    'services.facebook.picture':1,
                                    'services.twitter.screenName':1,
                                    'services.twitter.profile_image_url':1,
                                    'services.google.name':1,
                                    'services.google.picture':1,
                                }
                             });
});

Meteor.users.allow({
    insert: function() {
        return false;
    },
    update: function() {
        return false;
    },
    remove: function() {
        return false;
    }
});

Meteor.methods({
   updateStatusConnect: function(status){
        Meteor.users.update(this.userId,{ $set : { 'connect' : status } });
    }
});