function refreshCodeMirror(file){
	if (file){
		var arrayFile = file.fetch();
		$('.CodeMirror').remove();
		var textarea = document.getElementById("CodeMirror");
		var editor = CodeMirror.fromTextArea(textarea);
		editor.getDoc().setValue(arrayFile[0].modified[0].file);
		Meteor.editor= editor;
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

		var handle = file.observeChanges({
		  changed: function (id, user) {
		    refreshCodeMirror(file);
		  }
		});

		refreshCodeMirror(file);
	    Router.go('editor',{_id:this._id});
	}
})

