'use strict';

/* Users Controller */

ngApp.lazy.controller('usersCtrl', function($scope, $log, $location, $http, UserFactory, MenuFactory, localStorageService) {
	var vm = this;
	vm.isLoading = false;
	vm.obj = {_csrf: ""};

	vm.signup = signup;
	vm.signin = signin;
	vm.getClass = getClass;

	function signup () {
		$http.post('/users/signup', vm.obj).success(function(data) {
			angular.extend(vm.obj, data);
			vm.obj.message = data.message;
			setUser(vm.obj);
		}).error(function(error) {
			$log.log("ERROR LOGIN: "+error);
		});
	}

	function signin () {
		$http.post('/users/signin', vm.obj).success(function(data) {
			angular.extend(vm.obj, data);
			vm.obj.message = data.message;
			setUser(vm.obj);
		}).error(function(error) {
			$log.log("ERROR signin: ", error);
		});
	}

	function setUser (data) {
		if (!data.isLoggedIn) {
			data = {};
		}
		localStorageService.set("user", data)
		MenuFactory.setUser(data);
		if (data.isLoggedIn) {
			$location.path('/groups');
		}
	}

	function getCsrfToken () {
		$http.get('/users/signup').success(function(data) {
			vm.obj._csrf = data.csrfToken;
		}).error(function(error) {
			$log.log("ERROR: "+error);
		});
	};

	function changeLoadingState(){
		vm.isLoading = !vm.isLoading;
	};

	function getClass (args) {
		var passLength = args.password ? args.password.length : 0;
		var thisClass = "";
		if (passLength>=8 || passLength===0) {
			thisClass = "teal-text";
			vm.obj.determinateClass = "determinate teal";
		} else if (passLength>4 && passLength<8) {
			thisClass = "orange-text";
			vm.obj.determinateClass = "determinate orange";
		} else {
			thisClass = "pink-text";
			vm.obj.determinateClass = "determinate pink";
		}
		return thisClass;
	}

	getCsrfToken();
});