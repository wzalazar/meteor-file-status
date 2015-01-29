Session.set('fileId');

function modifyFile(id){
	var myFile;
	var file= Files.findOne({'_id':id});
	_.each(file.modified,function(modified){
	      if (modified.userId===Meteor.userId()){
	            myFile = modified.file;
	      }
	},this);
	return myFile;
}

Template.listFiles.helpers({
	"editorOptions": function() {
        return {
            lineNumbers: true,
            mode: "javascript",
            keymap:"sublime"
        }
    }
})

Template.listFiles.events({
	'click .editor': function(event){
		event.preventDefault();
		
		Session.set('fileId',this._id);
		Session.set("areThereFilesMerge",false);
		
		var myFile= modifyFile(this._id);
		if (myFile){
			var codeMirrorMerge = {
	                        id: "view",
	                        value: myFile,
	                        panes: 1,
	                        highlight : true, 
	                        connect : null, 
	                        collapse : false
	                      };
	  		Meteor.codeMirror.merge(codeMirrorMerge);
		}
	    Router.go('editor',{_id:this._id});
	}
})

