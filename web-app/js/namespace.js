/**
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 * 
 * The source code is at
 * https://github.com/fabiooshiro/namespace-js
 * 
 * author: Fabio Issamu Oshiro (Sr. Oshiro)
 * ref: http://blog.stannard.net.au/2011/01/14/creating-namespaces-in-javascript/
 */
var namespace;

(function(){
    var hasBackboneJs = typeof(Backbone) != 'undefined';
    var root = this;
    var loadDsl;
    var unloadDsl;
    if(typeof(config) == 'undefined'){
        root.config = {
            contextPath: ('/' + window.location.pathname.split("/")[1]) 
        };
    }
    if(hasBackboneJs){
        var mkUrl = function(mn){
            return config.contextPath + '/' + mn[0].toLowerCase() + mn.substring(1);
        };
        loadDsl = function(ns, name){
            var model = function(modelName, body){
            	body = body ? body : {};
                body['className'] = name + '.' + modelName;
                if(!body['urlRoot']){
                	body['urlRoot'] = mkUrl(modelName); 
                }
                var ModelClazz = Backbone.Model.extend(body);
                var ModelCollection = Backbone.Collection.extend({
                    model: ModelClazz,
                    url: mkUrl(modelName) + '/list'
                });
                var modelCollection = new ModelCollection();
                ModelClazz.list = function(options, callback){
                    var opt = _.extend({
                        success: function(collection, response){
                            callback(null, collection);
                        }, 
                        error: function(collection, response){ 
                            callback("Error ", []); 
                        }
                    }, options);
                    modelCollection.fetch(opt);
                };
                ns[modelName] = ModelClazz;
                return ModelClazz;
            };
            var view = function(viewName, body){
                ns[viewName] = Backbone.View.extend(body);
            };
            return [model, view];
        };
        unloadDsl = function(){
        }; 
    }else{
        loadDsl = function(ns, name){};
        unloadDsl = function(){};
    }
    
    namespace = function (name, publics){
        var path = name.split('\.');
        var cpath = '';
        for(var i=0;i<path.length;i++){
            cpath += path[i];
            if(typeof(eval('this.' + cpath)) == 'undefined'){
                eval(cpath + '={}');
            }
            cpath += '.';
        }
        var ns = eval(name);
        var dsl = loadDsl(ns, name);
        if(typeof(publics) == 'function'){
            publics = publics.apply(ns, dsl);
        }
        unloadDsl();
        for(var key in publics){
            ns[key] = publics[key];
        }
    }
})();

function importAllNamespace(name){
	var ns = eval(name);
	for(key in ns){
		this[key] = ns[key];
	}
}
