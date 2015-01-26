/***************************************************/
/*
/*   Helpers Functions
/*
/**************************************************/

function ifUndefinded(field) {
    if (typeof(field) == "undefined") {
        console.log("undefined");
        return "None";
    } else {
        if (field != "")
            return field;
        else
            return "None";
    }
}



/***************************************************/
/*
/*   Helpers Navegation
/*
/**************************************************/

UI.registerHelper("activeRouteClass", function(name) {
    if (Router.current().route.name === name)
        return 'active';
    else
        return ' ';
});


/***************************************************/
/*
/*   Helpers Standart User
/*
/**************************************************/


UI.registerHelper("user", function(user) {
    try {
        if ((user.username) && (typeof(user.username) != "undefined")) {
            return user.username;
        }
    } catch (e) {
        console.log('Error: user');
    }
});

UI.registerHelper("getName", function(contactId) {
    try {
        var contact = Meteor.users.findOne(contactId);
        return ifUndefinded(contact.profile.name);
    } catch (e) {
        console.log('Error: getName');
    }
});

UI.registerHelper("getUsername", function(contactId) {
    try {
        var contact = Meteor.users.findOne(contactId);
        return ifUndefinded(contact.username);
    } catch (e) {
        console.log('Error: getUsername');
    }
});

UI.registerHelper("getEmail", function(user) {
    return ifUndefinded(user.emails[0].address);
});

UI.registerHelper("getImageUser", function(userId) {
    try {
        var anySocial= true;
        var user = Meteor.users.findOne(userId);
        if (typeof(user.services.facebook) != "undefined") {
             anySocial= false;
             return user.services.facebook.picture;
        }
        if (typeof(user.services.google) != "undefined") {
             anySocial= false;
             return user.services.twitter.profile_image_url;
        }
        if (typeof(user.services.twitter) != "undefined") {
             anySocial= false;
             return user.services.google.picture;
        }
        if (anySocial) return "images/withOutPhoto.png";
    } catch (e) {
        console.log('Error: getImageUser');
    }
});

UI.registerHelper("getName", function(userId) {
    try {
        var user = Meteor.users.findOne(userId);
        if (user.services) {
            if (user.services.facebook)
                return user.services.facebook.name;
            if (user.services.twitter)
                return user.services.twitter.screenName;
            if (user.services.google)
                return user.services.google.name;
        } else {
            return "No name";
        }
    } catch (e) {
        console.log('Error: getName');
    }
});

UI.registerHelper("statusConnect", function(userId) {
    try {
        var user = Meteor.users.findOne({
            _id: userId
        });
        return user.online;
    } catch (e) {
        console.log('Error: statusConnect');
    }
});

UI.registerHelper("notMe", function(userId) {
    if (userId!=Meteor.userId())
        return true
    else
        return false
});



/***************************************************/
/*
/*   Helpers Extend User
/*
/**************************************************/

UI.registerHelper("getJob", function(user) {
    try {
        return ifUndefinded(user.profile.job);
    } catch (e) {
        return console.log('getJob undefined');
    }
});

UI.registerHelper("getbiographic", function(user) {
    try {
        return ifUndefinded(user.profile.biographic);
    } catch (e) {
        return console.log('getbiographic undefined');
    }
});

UI.registerHelper("getPhone", function(user) {
    try {
        return ifUndefinded(user.profile.phone);
    } catch (e) {
        return console.log('getPhone undefined');
    }
});

UI.registerHelper("getPorcent", function(user) {
    try {
        var contact = Meteor.user();
        var count = 0;
        if ((contact.profile.job != "") && (ifUndefinded(contact.profile.job) != 'None')) count++;
        if ((contact.profile.phone != "") && (ifUndefinded(contact.profile.phone) != 'None')) count++;
        if ((contact.profile.biographic != "") && (ifUndefinded(contact.profile.biographic) != 'None')) count++;
        if ((contact.profile.name != "") && (ifUndefinded(contact.profile.name) != 'None')) count++;

        return (count * 100) / 4;
    } catch (e) {
        return console.log('getPorcent undefined');
    }

});


/***************************************************/
/*
/*   Helpers Chat
/*
/**************************************************/

UI.registerHelper("pendingNotification", function() {
    return Contacts.find({
        'acceptInvitation': false,
        'readInvitation': false,
        'contactId': Meteor.userId()
    });
});

UI.registerHelper("pendingNotificationCount", function() {
    return Contacts.find({
        'acceptInvitation': false,
        'readInvitation': false,
        'contactId': Meteor.userId()
    }).count();
});

UI.registerHelper("getTimeAgo", function(date) {
    return moment(date).fromNow();
});

UI.registerHelper("messageWithoutRead", function(user) {
    Meteor.subscribe('allMyRooms');
    if (user.userId != Meteor.userId())
        friendId = user.userId;
    else
        friendId = user.friendId;

    var chatRoom = ChatRooms.findOne({
        $and: [{
            'users.userId': friendId
        }, {
            'users.userId': Meteor.userId()
        }]
    });
    return Messages.find({
        'chatRoomId': chatRoom._id,
        readMessage: {
            $elemMatch: {
                'read': false,
                'userId': Meteor.userId()
            }
        }
    }).count();
});