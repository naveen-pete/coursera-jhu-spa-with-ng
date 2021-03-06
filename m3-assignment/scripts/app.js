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
        ctrl.message = 'Enter Search Term.';

        ctrl.findItems = function() {
            console.log('ctrl.findItems() called!');

            if(ctrl.searchTerm.trim().length > 0) {
                MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(
                    function(foundItems) {
                        console.log('ctrl.findItems() - foundItems:', foundItems);
                        ctrl.found = foundItems;
                        ctrl.showFoundItems = true;
                    }
                );
            } else {
                ctrl.showFoundItems = false;
                ctrl.message = 'Nothing Found!';
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
            ctrl.message = 'Enter Search Term.';
        };

        ctrl.getStyle = function() {
            var style = ctrl.message === 'Nothing Found!' ? 'text-danger' : 'text-info'; 
            return style;
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            console.log('service.getMatchedMenuItems() called!');
            console.log('service.getMatchedMenuItems() - searchTerm:', searchTerm);
            var foundItems = [];

            return $http({method: 'GET', url: 'https://davids-restaurant.herokuapp.com/menu_items.json'}).then(
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
                    return foundItems;
                }
            );
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
