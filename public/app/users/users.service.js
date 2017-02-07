'use strict';

/* UserFactory Services */

ngApp.lazy.factory('UserFactory', function($resource) {
	var resource = $resource('users/users/signup/:id', {id : '@id'}, {
		update: {
			method: 'PUT'
		}
	});

	return resource;
});