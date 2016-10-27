(function() {
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', lunchCheckController);

    function lunchCheckController($scope) {
        $scope.foodItems = '';
        $scope.message = '';
        $scope.messageStyle = '';
        $scope.textStyle = '';

        $scope.onCheckIfTooMuch = function() {
            $scope.messageStyle = 'text-success';
            $scope.textStyle = 'has-success';

            var lenFoodItems = getLength($scope.foodItems);

            if($scope.foodItems.trim() == '' || lenFoodItems === 0) {
                $scope.message = 'Please enter data first';
                $scope.messageStyle = 'text-danger';
                $scope.textStyle = 'has-error';
            } else if(lenFoodItems <= 3) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!';
            }
        };

        var getLength = function(items) {
            var arrItems = items.split(',');
            var ctr = 0;

            for(var i=0; i<arrItems.length; i++) {
                if(arrItems[i].trim().length > 0) {
                    ctr++;
                }
            }

            console.log('Item array:', arrItems);
            console.log('No. of items:', ctr);

            return ctr;
        };
    }

    lunchCheckController.$inject = ['$scope'];
})();
