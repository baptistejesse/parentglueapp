//Parent

Pglue.Models.Parents = Backbone.Model.extend({
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { parent: _.clone(this.attributes) };
	  }
	
});



//Both


Pglue.Models.Messenger = Backbone.Model.extend({
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { messengers: _.clone(this.attributes) };
	  }
});
Pglue.Models.Kudos = Backbone.Model.extend({
	parse: function(response){
    response = response.kudo;
	return response	
	},
	toJSON: function(){
	    return { kudos: _.clone(this.attributes) };
	  }
});



//teacher
Pglue.Models.Teacher = Backbone.Model.extend({
	parse: function(response){
	response = response.teacher;
	return response
	},
	toJSON: function(){
	    return { teacher: _.clone(this.attributes) };
	  }
});
Pglue.Models.Homeroom = Backbone.Model.extend({
	parse: function(response){
		response = response.homeroom;
		return response
	},
	toJSON: function(){
	    return { homerooms: _.clone(this.attributes) };
	  }
});
Pglue.Models.Grade = Backbone.Model.extend({
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { grade: _.clone(this.attributes) };
	  }
});
Pglue.Models.Attend = Backbone.Model.extend({
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { todo: _.clone(this.attributes) };
	  }
});
Pglue.Models.Conduct = Backbone.Model.extend({
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { todo: _.clone(this.attributes) };
	  }
});

Pglue.Collections.Homerooms = Backbone.Collection.extend({
	model: Pglue.Models.Homeroom,
	parse: function(response){
	return response	
	},
	toJSON: function(){
	    return { todo: _.clone(this.attributes) };
	  }
});
