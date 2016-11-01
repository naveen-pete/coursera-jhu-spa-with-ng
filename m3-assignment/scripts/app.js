(function() {

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];
        ctrl.showFoundItems = false;

        ctrl.findItems = function() {
            console.log('ctrl.findItems() called!');

            if(ctrl.searchTerm.trim().length > 0) {
                var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

                promise.then(function(foundItems) {
                    console.log('ctrl.findItems() - foundItems:', foundItems);
                    ctrl.found = foundItems;
                    ctrl.showFoundItems = true;
                })
            } else {
                ctrl.showFoundItems = false;
            }
        };

        ctrl.removeItem = function(index) {
            console.log('ctrl.removeItem() - index:', index);
            var removedItem = ctrl.found.splice(index, 1)[0];
            console.log('ctrl.removeItem() - removedItem:', removedItem);
        };

        ctrl.searchTermChanged = function() {
            ctrl.found = [];
            ctrl.showFoundItems = false;
        };
    }

    MenuSearchService.$inject = ['$q', '$http'];
    function MenuSearchService($q, $http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            console.log('service.getMatchedMenuItems() called!');
            console.log('service.getMatchedMenuItems() - searchTerm:', searchTerm);
            var deferred = $q.defer();
            var foundItems = [];

            $http({method: 'GET', url: 'https://davids-restaurant.herokuapp.com/menu_items.json'}).then(
                function(response) {
                    var menuItems = response.data.menu_items;
                    console.log('service.getMatchedMenuItems() - menuItems:', menuItems);
                    console.log('service.getMatchedMenuItems() - menuItems.length:', menuItems.length);

                    for(var i=0; i < menuItems.length; i++) {
                        var menuItem = menuItems[i];
                        if(menuItem.description.indexOf(searchTerm) >= 0) {
                            foundItems.push(menuItem);
                        }
                    }

                    console.log('service.getMatchedMenuItems() - foundItems:', foundItems);
                    console.log('service.getMatchedMenuItems() - foundItems.length:', foundItems.length);
                    deferred.resolve(foundItems);
                }, 
                function(response) {
                    console.log('service.getMatchedMenuItems() - Error: Could not access server.');
                    console.log('service.getMatchedMenuItems() - Status:', response.status);
                    console.log('service.getMatchedMenuItems() - Status Text:', response.statusText);
                    deferred.reject(foundItems);
                });
            
            return deferred.promise;
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'directives/foundItems.html',
            scope: {
                searchTerm: '@',
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var ctrl = this;
    }

})();
