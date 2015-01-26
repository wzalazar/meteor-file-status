Schema = {};

Schema.Files = new SimpleSchema({
	
		userId:{
			type: String,
			autoValue: function(){  
				if (this.isInsert) return Meteor.userId(); 
			}
		},
		filepath: { type:String},
		action: { type:String},
		file: { type:String},
		dateCreated:{
			type: Date,
			autoValue: function(){  
				if (this.isInsert) return new Date; 
			}
		}
});

Files = new Meteor.Collection("files");
Files.attachSchema(Schema.Files);


