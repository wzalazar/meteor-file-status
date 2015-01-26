if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    AutoForm.setDefaultTemplate('plain');
    SimpleSchema.debug = true;

    AutoForm.addHooks(null, {
    onError: function (name, error, template) {
      console.log(name + " error:", error);
    }
  })
  });
}
