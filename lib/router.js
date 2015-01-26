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
                to: 'content'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('files');
        },
        data: function() {
            return {
                files: Files.find()
            }
        }
    });

    this.route('files', {
        path: '/files',
        layoutTemplate: 'dashboard',
        yieldTemplates: {
            'listFiles': {
                to: 'content'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('files');
        },
        data: function() {
            return {
                files: Files.find()
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


