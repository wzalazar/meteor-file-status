var codeMirror = {
	initUI : function initUI(codeMirrorMerge) {
			  if (codeMirrorMerge.value == null) return;
			  if (document.getElementById(codeMirrorMerge.id)){
			  var target = document.getElementById(codeMirrorMerge.id);
			  target.innerHTML = "";
			  CodeMirror.MergeView(target, {
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
	}
}

Meteor.codeMirror = codeMirror;

