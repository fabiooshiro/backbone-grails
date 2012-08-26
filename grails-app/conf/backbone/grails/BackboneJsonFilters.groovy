package backbone.grails

class BackboneJsonFilters {

    def filters = {
        all(controller:'*', action:'*') {
            before = {

            }
            after = { Map model ->
				if('XMLHttpRequest' == request.getHeader('X-Requested-With')){
					render(contentType: 'text/json'){
						model
					}
					return false
				}else{
					return true
				}
            }
            afterView = { Exception e ->

            }
        }
    }
}
