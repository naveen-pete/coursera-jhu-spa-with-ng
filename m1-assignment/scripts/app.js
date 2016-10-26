(function() {
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', lunchCheckController);

    function lunchCheckController($scope) {
        $scope.foodItems = '';
        $scope.message = '';
        $scope.messageStyle = '';
        $scope.textStyle = '';

        $scope.onCheckIfTooMuch = function() {
            if($scope.foodItems == '') {
                $scope.message = 'Please enter data first';
                $scope.messageStyle = 'text-danger';
                $scope.textStyle = 'has-error';
            } else if($scope.foodItems.split(',').length <= 3) {
                $scope.message = 'Enjoy!';
                $scope.messageStyle = 'text-success';
                $scope.textStyle = 'has-success';
            } else {
                $scope.message = 'Too much!';
                $scope.messageStyle = 'text-success';
                $scope.textStyle = 'has-success';
            }
        };
    }

    lunchCheckController.$inject = ['$scope'];
})();