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
                        modified.dateCreated = Date.now();
                    }
                },change);
                Files.update({'filepath':file.filepath},{$set:{'modified':file.modified}});
            }
            else{
                change.modified.dateCreated = Date.now();
                Files.update({'filepath':file.filepath},{$push:{'modified':change.modified}});
            }
        }else{
            var file= {
                'filepath': change.filepath,
                'modified':[{
                    'userId': this.userId,
                    'action': change.modified.action,
                    'file': change.modified.file,
                    'dateCreated': Date.now()
                }]
            }
        	Files.insert(file);
        }
    },

    findFile: function(id){
        return Files.findOne(id);
    }
});

