Meteor.publish('files', function() {
    return Files.find({});
});


Meteor.publish('updateFiles', function() {
    return Files.find({'modified.userId':this.userId});
});



Meteor.methods({
   changefile: function(change){
        var file= Files.findOne({'filepath':change.filepath,'modified.userId': this.userId});
        if (file){

        	_.each(file.modified,function(modified){
        		if (modified.userId===this.userId){
        			modified.file = change.modified[0].file;
                    modified.update = change.modified[0].update;
        		}
        	},this);

        	Files.update({'_id':file._id},{$set:{'modified':file.modified}});
        }else{
        	Files.insert(change);
        }
    },

    findFile: function(id){
        return Files.findOne(id);
    }
});