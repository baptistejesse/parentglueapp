

//routes
Pglue.Router = Backbone.Router.extend({
	
            routes: {
                       "": 'index',
               	    "parent/sign_in": "parentsign",
                    "teacher/sign_in": "teachersign",
	                "teachers/:id/:auth": "teacherindex",
	                "homerooms/:id": "homeroom",
	                "grades/:id": "grades",
	                "attends/:id": "attends",
	                "messengers/:id": "messengers",
	                "behaves/:id":"behaves",
	                "parents/:id" : "parents"
      },	

  index: function () {
    forge.topbar.show();
	forge.topbar.setTitle("Parentglue");
    forge.topbar.removeButtons();
    forge.tabbar.hide();
	index = new IndexView();
	$(".row").empty();	
 $(".row").append(index.render().el);
},


 parentsign: function(){
    forge.topbar.show();
	forge.topbar.setTitle("Parent sign in");
	forge.topbar.addButton({
	  text: "Back",
	  position: "left"
	}, function () {
	  Pglue.router.navigate("", {trigger: true});
	});
	forge.tabbar.hide();
	parentview = new ParentView();
	$(".row").empty();
	$(".row").append(parentview.render().el);
	
	
	
},	
	
 teachersign: function(){
    forge.topbar.show();
	forge.topbar.setTitle("Teacher sign in");
	forge.topbar.addButton({
	  text: "Back",
	  position: "left"
	}, function () {
	  Pglue.router.navigate("", {trigger: true});
	});
	forge.tabbar.hide();
	teacherview = new TeacherView();
	$(".row").empty();
	$(".row").append(teacherview.render().el);
	
	
	
},

teacherindex: function(id, auth){
	    forge.topbar.show();
      	forge.topbar.addButton({
		  text: "Logout",
		  position: "left"
		}, function () {
		  Pglue.router.navigate("", {trigger: true});
		});
		forge.topbar.setTitle("Homerooms");
		
	forge.request.ajax({
				url: "http://parentglue.herokuapp.com/teachers/"+ id +".json?auth_token="+ auth ,
				dataType: "json",
				success: showIndex
			});

			// to be called once we have the Trigger twitter feed
			function showIndex(data) {
				// Save away initial data
			var maker = new Pglue.Models.Teacher(data, { parse: true });	
				
	      
	       
		var teacherindex = new TeacherIndex({model: maker });
		$(".row").empty();
		$(".row").append(teacherindex.render().el);
	}
	
},


homeroom: function(id){
    forge.topbar.show();
	forge.topbar.addButton({
	  text: "Back",
	  position: "left"
	}, function () {
	  window.history.back();
	});

	
forge.request.ajax({
			url: "http://parentglue.herokuapp.com/homerooms/"+ id +".json?auth_token="+ store.get("auth_token"),
			dataType: "json",
			success: showIndex
		});

		// to be called once we have the Trigger twitter feed
		function showIndex(data) {
			// Save away initial data
		var homeroom = new Pglue.Models.Homeroom(data, { parse: true });	
		forge.topbar.setTitle(""+ data.homeroom.name );	
      
       
	var homeroomview = new HomeRoomView({model: homeroom });
	$(".row").empty();
	$(".row").append(homeroomview.render().el);
}	
	
	
	
	
	
	
},



grades: function(){
	
	
	
	
	
},


attends: function(id){
	forge.topbar.show();
	forge.topbar.addButton({
	  text: "Back",
	  position: "left"
	}, function () {
	  window.history.back();
	});

	
forge.request.ajax({
			url: "http://parentglue.herokuapp.com/homerooms/"+ id +".json?auth_token="+ store.get("auth_token"),
			dataType: "json",
			success: showIndex
		});

		// to be called once we have the Trigger twitter feed
		function showIndex(data) {
			// Save away initial data
		var maker = new Pglue.Models.Homeroom(data, { parse: true });	
		forge.topbar.setTitle("Attendance");	
      
       
	var attends = new AttendsView({model: maker });
	$(".row").empty();
	$(".row").append(attends.render().el);
}	
	
	
	
	
	
	
},


messengers: function(){
	
	
	
	
	
},

behaves: function(){
	
	
	
	
	
},


parents: function(){
	
	
	
	
}




});


/*

1
2
3
$("p").click(function(event) {
  alert( event.currentTarget === this ); // true
});

*/