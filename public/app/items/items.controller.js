'use strict';

/* Items Controller */

ngApp.lazy.controller('itemsCtrl', function($scope, $log, $http, $location, $routeParams, GroupFactory, ItemFactory, MenuFactory) {
    var vm = this;
    vm.isLoading = false;
    vm.thisGroup = "";
    vm.search = "";
    vm.obj = {};
    vm.allObj = [];
    vm.allGroup = GroupFactory.query({userId: MenuFactory.getUser()._id}, function(){
        if ($routeParams.groupId && $routeParams.groupId != 0) {
            vm.allGroup.forEach(v=>{
                if ($routeParams.groupId === v._id){
                    vm.thisGroup = v.name;
                }
            });
        }
        
    });


    vm.save = save;
    vm.get = get;
    vm.update = update;
    vm.addEdit = addEdit;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.searchItems = searchItems;

    function save () {
        changeLoadingState();
        ItemFactory.save(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    }

    function get (args) {
        changeLoadingState();
        var getQueryString = {
            groupId: $routeParams.groupId,
            userId: MenuFactory.getUser()._id
        };
        if(args && args.filter && Object.keys(args.filter).length>0){
            Object.keys(args.filter).forEach(function(k){
                getQueryString[k] = args.filter[k];
            });
        }
        
        vm.allObj = ItemFactory.query(getQueryString, function() {
            vm.obj._group = MenuFactory.getGroupId();
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    }

    function update () {
        changeLoadingState();
        vm.obj.id = vm.obj._id;
        ItemFactory.update(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    }

    function remove (args) {

        if (confirm("Are you sure?")) {
            changeLoadingState();

            ItemFactory.delete({id: args._id}, function (data) {
                vm.allObj.splice(args.index, 1);
                changeLoadingState();
            }, function (error) {
                $log.log ("Error: ", error);
                changeLoadingState();
            });
        }
    }

    function addEdit (args){
        var id = args._id ? args._id : 0;
        $location.path('/items_add_edit/'+id);
    }

    function goBack () {
        if (MenuFactory.getGroupId()) {
            $location.path('/items_by_group_id/'+MenuFactory.getGroupId());
        } else {
            $location.path('/items');
        }

    }

    function searchItems(){
        get({filter: {name: vm.search}});
    }

    function changeLoadingState(){
        vm.isLoading = !vm.isLoading;
    }

    if ($routeParams.groupId && $routeParams.groupId != 0) {
        MenuFactory.setGroupId($routeParams.groupId);
    } else if (!$routeParams.id) {
        MenuFactory.setGroupId(0);
    }
    if ($routeParams.id && $routeParams.id != 0) {
        changeLoadingState();
        vm.obj = ItemFactory.get({ id: $routeParams.id }, function (data) {
            vm.obj._group = MenuFactory.getGroupId();
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    } else {
        get();
    }



    /**/

    var loadFromFile = function () {
        $http.get('app/data.json').success(function (data) {
            data.greetings.forEach(function (v) {
                $log.log(v);
                var args = {
                    name: v.content,
                    description: v.content,
                    _group: "57f2313f19ae73811777e6b6"
                };
                ItemFactory.save(args, function (data) {
                }, function (error) {
                    $log.log("Error: ", error);
                });
            });
        });
    };
    //loadFromFile();


});