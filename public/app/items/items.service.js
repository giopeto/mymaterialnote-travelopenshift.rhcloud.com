'use strict';

/* ItemsFactory Services */

ngApp.lazy.factory('ItemFactory', function($resource) {
    var resource = $resource('items/items/:id', {id : '@id'}, {
        update: {
            method: 'PUT'
        }
    });

    return resource;
});