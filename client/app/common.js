var codeMirror = {
	value: null,
	initUI : function initUI(codeMirrorMerge) {
			  if (codeMirrorMerge.value == null) return;
			  if (document.getElementById(codeMirrorMerge.id)){
			  var target = document.getElementById(codeMirrorMerge.id);
			  target.innerHTML = "";
			  this.value= CodeMirror.MergeView(target, {
				    value: codeMirrorMerge.value,
				    origLeft: codeMirrorMerge.panes == 3 && !codeMirrorMerge.collapse && !codeMirrorMerge.connect ? codeMirrorMerge.orig1 : null,
				    orig: codeMirrorMerge.orig2,
				    lineNumbers: true,
				    mode: "text/html",
				    highlightDifferences: codeMirrorMerge.highlight,
				    connect: codeMirrorMerge.connect,
				    collapseIdentical: codeMirrorMerge.collapse
				  });
			   }
			},

	merge: function codeMirrorMerge(codeMirrorMerge){
	       this.initUI(codeMirrorMerge);
	},

	getValue: function(){
		var editor= this.value.editor()
		return editor.getValue();
	}
}

Meteor.codeMirror = codeMirror;

