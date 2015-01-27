Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    onRuningTemplate: 'loading',
    routeControllerNameConverter: "camelCase",
    waitOn: function() {

    }
});


Router.map(function() {
    this.route('website', {
        path: '/'
    });

    this.route('dashboard', {
        path: '/dashboard',
        yieldTemplates: {
            'listFiles': {
                to: 'listFiles'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('files');
        },
        data: function() {
            return {
                files: Files.find({'modified.userId':Meteor.userId()})
            }
        }
    });

    this.route('editor', {
        path: '/editor/:_id',
        layoutTemplate: 'dashboard',
        yieldTemplates: {
            'editor': {
                to: 'editor'
            },
            'listFiles': {
                to: 'listFiles'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('files');
        },
        data: function() {
            return {
                files: Files.find({'modified.userId':Meteor.userId()}),
                file: Files.findOne({'_id':this.params._id})
            }
        }
    });
});

var mustBeSignedIn = function(pause) {
    AccountsEntry.signInRequired(this);
};

Router.onBeforeAction(mustBeSignedIn, {
     except: ['entrySignIn','entrySignUp','entryForgotPassword','website']
});


