var Pglue = {
	Models:      {},
	Collections: {},
	Views:       {},
	Router:      {},
    Utils:       {},
	// Called once, at app startup
	init: function () {
		// Grab the Trigger twitter feed
		
			Pglue.router = new Pglue.Router();
			Backbone.history.start();
		}
	
};









