/**
 * Created by george on 9/8/16.
 */
'use strict';

/* Menu Controller */

ngApp.controller('menuCtrl', function($rootScope, $log, GroupFactory, localStorageService, MenuFactory) {

	var vm = this;
	vm.allGroup = [];
	vm.user = MenuFactory.getUser();
	vm.allGroup = GroupFactory.query({userId: vm.user._id});

	$rootScope.$on('userChanged', function(){
		$log.log ('menuCtrl: on userChanged call');
		vm.user = MenuFactory.getUser();
		vm.allGroup = GroupFactory.query({userId: vm.user._id});
	});
	$rootScope.$on('groupChanged', function(){
		vm.allGroup = GroupFactory.query({userId: vm.user._id});
	});
});