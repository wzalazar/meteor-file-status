function existsUserInArray(file,userId){
    var exists = false;
     _.each(file.modified,function(modified){
                if (modified.userId===userId){
                    exists= true;
                }
    },this);
    return exists;
}

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
            if (existsUserInArray(file,this.userId)){
                _.each(file.modified,function(modified){
                    if (modified.userId===this.modified.userId){
                        
                        modified.file = this.modified.file;
                    }
                },change);
                Files.update({'filepath':file.filepath},{$set:{'modified':file.modified}});
            }
            else{
                Files.update({'filepath':file.filepath},{$push:{'modified':change.modified}});
            }
        }else{
        	Files.update({'filepath':change.filepath},{$push:{'modified':change.modified}});
        }
    },

    findFile: function(id){
        return Files.findOne(id);
    }
});

