(function(){
	
	var originalSync = Backbone.sync;
	var method2url = {
		'create': 'save',
		'update': 'update',
		'delete': 'delete',
		'read':   'show'
	};
	
	Backbone.sync = function(method, model, options){
		// Default options, unless specified.
	    options || (options = {});
		if(!options.url && model.urlRoot){
			options.url = model.urlRoot + '/' + method2url[method];
			if(model.id){
				options.url += "/" + model.id
			}
		}
		originalSync(method, model, options);
	};
	
})();
