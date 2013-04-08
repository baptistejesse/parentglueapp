//index view

var IndexView = Backbone.View.extend({

events:{
'click #parentz': 'parentz',
'click #teacher':	'teacher'
	
	
	
},	



render: function()	{
	
this.$el.append($("#bobby").html());	
return this;	
	
	
},

teacher: function(){
	Pglue.router.navigate("teacher/sign_in", {trigger: true});
	

				
			



},

parentz: function(){
	
	
	Pglue.router.navigate("parent/sign_in", {trigger: true});		
				
				
	
	
	
	
}


	

	
	
});
	
	
var ParentView = Backbone.View.extend({
	
	events: {
	'click #submit': 'submit'




	},	
	
  


	render: function()	{

	this.$el.append($("#Parentsignin").html());	
	return this;	


	},


   submit: function(e){

	var email = $("#email").val();
	var password = $("#password").val();
	forge.request.ajax({
	 url: 'http://parentglue.herokuapp.com/parents/sign_in',
	 type: 'POST',
	 contentType: 'application/json',
	 dataType: 'json',
	 data: JSON.stringify({
	            parent: {
	                email: email,
	                password: password
	            }
	        }),
	        success: function (data) {
		    	store.clear();
		
		store.set("parentid", data.id);
			store.set("auth_token", data.authentication_token);
          var success = store.get("parentid");
		 var banter = store.get("auth_token");
		   // var success = store.get("id")
	      
			         alert(banter);
		
			  //alert("parent");
			
	        },
	        error: function () {
	            alert('Problem uploading photo metadata');
	        }	
		
		
		
		
	});


	
}




});	

var TeacherView = Backbone.View.extend({
	
	events:{
	'click #submit': 'submit'




	},	
	render: function()	{

	this.$el.append($("#Teachersignin").html());	
	return this;	


	},
  	
 submit: function(e){
  
	var email = $("#email").val();
	var password = $("#password").val();
	forge.request.ajax({
	 url: 'http://parentglue.herokuapp.com/teachers/sign_in',
	 type: 'POST',
	 contentType: 'application/json',
	 dataType: 'json',
	 data: JSON.stringify({
	            teacher: {
	                email: email,
	                password: password
	            }
	        }),
	        success: function (data) {
	          	store.clear();

			    store.set("ids", data.id);
			    store.set("auth_token", data.authentication_token);
                //store.set("auth_token", data.authentication_token)
			    var success = store.get("ids")  
			    var banter = store.get("auth_token")
	          	//store.set('teacher', { id: data.id });
		        //success = JSON.stringify(data);
	
	         	Pglue.router.navigate("teachers/" + success + "/" + banter, {trigger: true});
		
		        
	       
	        },
	        error: function () {
	            alert('Problem signing in');
	        }	
		
	


	});
	

 e.preventDefault();


}




});
	
var TeacherIndex = Backbone.View.extend({
/*	
	events:{
	'click #submit': 'submit'




	},	
	
*/  
 


	render: function()	{
    this.template = _.template($("#Teacherindex").html());

	this.$el.append(this.template(this.model.attributes));	
	return this;	


	}


	
	





});
	

var HomeRoomView = Backbone.View.extend({
	
	/*	
		events:{
		'click #submit': 'submit'




		},	

	*/  
	
	
	
	render: function()	{
    this.template = _.template($("#HomeroomView").html());

	this.$el.append(this.template(this.model.attributes));	
	return this;	


}


	
	


});


var AttendsView = Backbone.View.extend({
	
	/*	
		events:{
		'click #submit': 'submit'




		},	

	*/  
	
	
	
   render: function(){
    this.template = _.template($("#Attendview").html());

	this.$el.append(this.template(this.model.attributes));	
	return this;
	}	


});
