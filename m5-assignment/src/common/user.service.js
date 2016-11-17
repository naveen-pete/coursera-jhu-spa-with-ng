(function () {
    "use strict";

    angular.module('common')
    .service('UserService', UserService);

    UserService.$inject = [];
    function UserService() {
        var service = this;
        service.userInfo = {};

        service.registerUser = function(userInfo) {
            service.userInfo = userInfo;
            console.log('UserService.registerUser() - userInfo:', service.userInfo);
        };

        service.getUser = function () {
            return service.userInfo;
        };
    }
})();
