Meteor.publish('files', function() {
    return Files.find({});
});



Meteor.methods({
   changefile: function(change){
        var file= Files.findOne({'filepath':change.filepath,'modified.userId': this.userId});
        if (file){

        	_.each(file.modified,function(modified){
        		if (modified.userId===this.userId){
        			modified.file = change.modified[0].file;
        		}
        	},this);

        	Files.update({'_id':file._id},{$set:{'modified':file.modified}});
        }else{
        	Files.insert(change);
        }
    }
});