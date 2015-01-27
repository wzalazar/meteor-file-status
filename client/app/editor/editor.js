Template.editor.helpers({
  "editorOptions": function() {
          return {
              lineNumbers: true,
              mode: "javascript"
          }
   }
})



Template.editor.events({
  'click .save': function(){
   	    console.log(this.file._id);
   	    var file= Files.findOne({'_id':this.file._id,'modified.userId': Meteor.userId()});
        if (file){
        	_.each(file.modified,function(modified){
        		if (modified.userId===Meteor.userId()){
        			modified.file = Meteor.editor.getValue();
        			modified.update = true;
        		}
        	},this);

        	Meteor.call("changefile",file, function(err,result){
        		if (err) console.log(err);
        	})
        }
  }
})


