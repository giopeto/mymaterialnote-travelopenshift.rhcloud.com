'use strict';

/* Groups Controller */

ngApp.lazy.controller('groupsCtrl', function($scope, $rootScope, $log, $location, $routeParams, GroupFactory, MenuFactory) {
	var vm = this;
	vm.isLoading = false;
	vm.obj = {
		_user: MenuFactory.getUser()._id
	};
	$rootScope.$on('userChanged', function(){
		vm.obj._user = MenuFactory.getUser()._id;
	});
	vm.allObj = [];


	vm.save = save;
	vm.get = get;
	vm.update = update;
	vm.addEdit = addEdit;
	vm.remove = remove;
	vm.goBack = goBack;

	function save () {
		changeLoadingState();
		GroupFactory.save(vm.obj, function (data) {
			$rootScope.$emit("groupChanged", {});
			goBack();
		}, function (error) {
			$log.log("Error: ", error);
			changeLoadingState();
		});
	};

	function get () {
		changeLoadingState();
		vm.allObj = GroupFactory.query({userId: vm.obj._user}, function() {
			changeLoadingState();
		}, function (error) {
			$log.log ("Error: ", error);
			changeLoadingState();
		});
	};

	function update () {
		changeLoadingState();
		vm.obj.id = vm.obj._id;
		GroupFactory.update(vm.obj, function (data) {
			$rootScope.$emit("groupChanged", {});
			goBack();
		}, function (error) {
			$log.log("Error: ", error);
			changeLoadingState();
		});
	};

	function remove (args) {
		if (confirm("Are you sure?")) {
			changeLoadingState();
			GroupFactory.delete({id: args._id}, function (data) {
				vm.allObj.splice(args.index, 1);
				$rootScope.$emit("groupChanged", {});
				changeLoadingState();
			}, function (error) {
				$log.log("Error: ", error);
				changeLoadingState();
			});
		}
	};

	function addEdit (args){
		var id = args._id ? args._id : 0;
		$location.path('/groups_add_edit/'+id);
	};

	function goBack () {
		$location.path('/groups');
	};

	function changeLoadingState(){
		vm.isLoading = !vm.isLoading;
	};

	if ($routeParams.id && $routeParams.id != 0) {
		changeLoadingState();
		vm.obj = GroupFactory.get({ id: $routeParams.id }, function (data) {
			changeLoadingState();
		}, function (error) {
			$log.log ("Error: ", error);
			changeLoadingState();
		});
	} else {
		get();
	}

});