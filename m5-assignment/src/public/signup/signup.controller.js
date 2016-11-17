(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['UserService', 'MenuService'];
    function SignupController(UserService, MenuService) {
        var ctrl = this;
        ctrl.userInfo = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            favoriteDish: ''
        };

        ctrl.signupComplete = false;
        ctrl.message = '';
        ctrl.dishFound = false;
        ctrl.itemSearched = false;

        ctrl.registerUser = function() {
            UserService.registerUser(ctrl.userInfo);
            console.log('User registration successfully completed!');

            ctrl.signupComplete = true;
            ctrl.message = 'Your information has been saved!';
        };

        ctrl.getMenuItem = function() {
            ctrl.dishFound = false;
            ctrl.itemSearched = false;
            console.log('userInfo:', ctrl.userInfo);

            if(typeof ctrl.userInfo.favoriteDish === 'undefined') return;
            if(ctrl.userInfo.favoriteDish.trim().length <= 0) return;

            MenuService.getMenuItem(ctrl.userInfo.favoriteDish).then(
                function(response) {
                    console.log('SignupController.getMenuItem() - Success:', response.data);
                    ctrl.userInfo.dishInfo = response.data;
                    ctrl.dishFound = true;
                    ctrl.itemSearched = true;
                },
                function(response) {
                    console.log('SignupController.getMenuItem() - Failed:', response.data);
                    ctrl.itemSearched = true;
                }
            );
        };

        ctrl.isFormInvalid = function(signupForm) {
            if(signupForm.$invalid) { 
                return true; 
            }

            if(!ctrl.itemSearched) {
                return true;
            }

            if(ctrl.itemSearched && !ctrl.dishFound) {
                return true;
            }

            return false;
        };

    }
})();
