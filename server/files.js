Meteor.publish('files', function() {
    return Files.find({});
});


Meteor.publish('updateFiles', function() {
    return Files.find({'modified.userId':this.userId});
});



Meteor.methods({
   changefile: function(change){
        var file= Files.findOne({'filepath':change.filepath});
        if (file){
            var newChange = true;
        	_.each(file.modified,function(modified){
        		if (modified.userId===this.userId){
        			modified.file = change.modified[0].file;
                    modified.update = change.modified[0].update;
                    newChange = false;
        		}
            },this);
            if (newChange){
                change.modified[0].userId = this.userId;
                Files.update({'_id':file._id},{$push:{'modified':change.modified[0]}});
            }else{
        	    Files.update({'_id':file._id},{$set:{'modified':file.modified}});
            }
        }else{
        	Files.insert(change);
        }
    },

    findFile: function(id){
        return Files.findOne(id);
    }
});