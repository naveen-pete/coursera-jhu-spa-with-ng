(function() {
    'use strict';

    angular.module('public').controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['userInfo'];
    function UserInfoController(userInfo) {
        console.log('UserInfoController - userInfo:', userInfo);

        var ctrl = this;
        ctrl.userInfo = userInfo;
        ctrl.notRegistered = angular.equals(userInfo, {});
    }
})();
