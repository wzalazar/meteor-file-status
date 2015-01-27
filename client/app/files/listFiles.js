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
		console.log(this._id);
	    Router.go('editor',{_id:this._id});
	}
})

