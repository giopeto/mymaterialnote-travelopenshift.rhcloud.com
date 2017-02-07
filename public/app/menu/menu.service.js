/**
 * Created by george on 9/8/16.
 */
'use strict';
/* MenuFactory Services */

ngApp.factory('MenuFactory', function($rootScope, $log, localStorageService) {
    var data = {
        groupId: 0,
        user: localStorageService.get("user")
    };


    return {
        getGroupId: function () {
            return data.groupId;
        },
        setGroupId: function (groupId) {
            data.groupId = groupId;
        },
        getUser: function () {
            return data.user;
        },
        setUser: function (user) {
            data.user = user;
            localStorageService.set("user", user);
            $rootScope.$emit("userChanged", {});
        }
    };
});