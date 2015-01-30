Schema = {};

Schema.Files = new SimpleSchema({
	
		filepath: { type:String, unique: true},
		modified: {
	        type: [Object],
	        minCount: 1
	    },
		"modified.$.userId":{
			type: String,
			autoValue: function(){  
				if (this.isInsert) return Meteor.userId(); 
			}
		},
		"modified.$.action": { type:String},
		"modified.$.file": { type:String},
		"modified.$.dateCreated":{
			type: Date,
			autoValue: function(){  
				if (this.isInsert) return new Date; 
			}
		}
});

Files = new Meteor.Collection("files");
Files.attachSchema(Schema.Files);


