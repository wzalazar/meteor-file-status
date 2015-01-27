Template.editor.helpers({
  fileSession: function(){
    return Session.get('file');
  }
})

Template.editor.events({
  'click .save': function(){
   	    console.log(this.file._id);
   	    var file= Files.findOne({'_id':this.file._id,'modified.userId': Meteor.userId()});
        if (file){
        	_.each(file.modified,function(modified){
        		if (modified.userId===Meteor.userId()){
        			console.log(Meteor.editor.getValue());
        			modified.file = Meteor.editor.getValue();
        			modified.update = true;
        		}
        	},this);

        	Meteor.call("changefile",file, function(err,result){
        		if (err) console.log(err);
        	})

        	//Files.update({'_id':file._id},{$set:{'modified':file.modified}});
        }
		//console.log(Meteor.editor.getValue());
  }
})


