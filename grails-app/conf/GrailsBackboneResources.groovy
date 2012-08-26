
modules = {
	jquery {
		resource url: '/js/jquery-1.7.1.js', disposition: 'head'
	}
    underscore {
        dependsOn 'jquery'
        resource url: '/js/underscore-1.3.1.js', disposition: 'head'
    }
    backbone {
        dependsOn 'jquery, underscore'
        resource url: '/js/backbone.js', disposition: 'head'
    }
    handlebars {
        resource url: '/js/handlebars-1.0.0.beta.6.js', disposition: 'head'
    }
    namespacejs {
        dependsOn 'backbone'
        resource url: '/js/namespace.js', disposition: 'head'
    }
    'backbone-grails' {
        dependsOn 'namespacejs, backbone, handlebars'
        resource url: '/js/backbone-grails.js', disposition: 'head'
    }
    
}
