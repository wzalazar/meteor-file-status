Session.set('viewMerge',false);
var arrayUserCard = [];

function existInArray(arrayUserCard,userId){
  var exists = false;
  _.each(arrayUserCard,function(userCard){
      if (userCard.userId === userId){
        exists= true;
      }
  })
  return exists;
}

function removeInArray(arrayUserCard,userId){
  for (var pos=0; pos<arrayUserCard.length;pos++){
    if (arrayUserCard[pos].userId === userId){
        arrayUserCard.splice(pos,1);
    }
  }
}

Template.editor.rendered = function(){
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
                        collapse : true
                      };
      Meteor.codeMirror.merge(codeMirrorMerge);
}

Template.editor.helpers({
   editorOptions: function() {
          return {
              lineNumbers: true,
              mode: "javascript"
          }
   },

   areThereFilesMerge: function(){
      return Session.get("areThereFilesMerge");
   },

   activateViewMerge: function(){
      return Session.get('viewMerge');
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
  },

  'click .user-card': function(event){
    if (Session.get('viewMerge')===false){
      var $userCard = $(event.target).closest(".user-card");
      if ($userCard.hasClass("selected")){
        if (existInArray(arrayUserCard,this.userId)){
          removeInArray(arrayUserCard,this.userId);
        }
        $userCard.removeClass("selected");
        $userCard.find('.ok-selected').hide();
      }else{
        if (!existInArray(arrayUserCard,this.userId)){
          arrayUserCard.push(this);
        }
        $userCard.addClass("selected");
        $userCard.find('.ok-selected').show();
      }
      if (arrayUserCard && arrayUserCard.length){
        Session.set("areThereFilesMerge",true);
      }else{
         Session.set("areThereFilesMerge",false);
      }
    }
  },

  'click .view-merge': function(){
    debugger
      var id= Session.get('fileId');
      var file= Files.findOne({'_id':id});
      _.each(file.modified,function(modified){
        if (modified.userId===Meteor.userId()){
              myFile = modified.file;
        }
      },this);
      var arrayOtherFiles = [];
      _.each(arrayUserCard,function(modified){
          arrayOtherFiles.push(modified.file);
      },this);

      if (arrayUserCard.length == 1){
        var codeMirrorMerge = {
                            id: "view",
                            value: myFile,
                            orig1: myFile,
                            orig2: arrayOtherFiles[0],
                            panes: (arrayUserCard.length+1),
                            highlight : true, 
                            connect : null, 
                            collapse : false
                          };
        
      }
       if (arrayUserCard.length == 2){
        var codeMirrorMerge = {
                            id: "view",
                            value: myFile,
                            orig1: arrayOtherFiles[0],
                            orig2: arrayOtherFiles[1],
                            panes: (arrayUserCard.length+1),
                            highlight : true, 
                            connect : null, 
                            collapse : false
                          };
        
      }
      Meteor.codeMirror.merge(codeMirrorMerge);
      Session.set('viewMerge',true);

  },

  'click .quit-merge': function(){
    $(".user-card").removeClass("selected");
    arrayUserCard = [];
    Session.set('viewMerge',false);
    Session.set("areThereFilesMerge",false);
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
                        collapse : true
                      };
    Meteor.codeMirror.merge(codeMirrorMerge);
     
  }
})


