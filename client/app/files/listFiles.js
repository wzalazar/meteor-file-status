Session.set('fileId');

function refreshCodeMirror(file){
	if (file){
		var arrayFile = file.fetch();
		$('.CodeMirror').remove();
		if (document.getElementById("CodeMirror")){
			var textarea = document.getElementById("CodeMirror");
			var editor = CodeMirror.fromTextArea(textarea);
			editor.getDoc().setValue(arrayFile[0].modified[0].file);
			Meteor.editor= editor;
		}
	}
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
		var file= Files.find({'_id':this._id});
		Session.set('fileId',this._id);
		Session.set("areThereFilesMerge",false);

		var handle = file.observeChanges({
		  changed: function (id, user) {
		    refreshCodeMirror(file);
		  }
		});

		refreshCodeMirror(file);
		var id= Session.get('fileId');
		var file= Files.findOne({'_id':id});
		_.each(file.modified,function(modified){
	      if (modified.userId===Meteor.userId()){
	            myFile = modified.file;
	      }
	    },this);
		var codeMirrorMerge = {
                        id: "view",
                        value: myFile,
                        panes: 1,
                        highlight : true, 
                        connect : null, 
                        collapse : false
                      };
  		Meteor.codeMirror.merge(codeMirrorMerge);
	    Router.go('editor',{_id:this._id});
	}
})

