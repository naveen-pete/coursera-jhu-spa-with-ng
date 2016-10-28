(function() {
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', toBuyController)
        .controller('AlreadyBoughtController', alreadyBoughtController)
        .service('ShoppingListCheckOffService', shoppingListCheckOffService);

    toBuyController.$inject = ['ShoppingListCheckOffService'];
    function toBuyController(ShoppingListCheckOffService) {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getToBuyItems();

        controller.buyItem = function(index) {
            console.log('index:', index);
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function alreadyBoughtController(ShoppingListCheckOffService) {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function shoppingListCheckOffService() {
        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "apples", quantity: 5 },
            { name: "chocolates", quantity: 3 },
            { name: "pens", quantity: 12 },
            { name: "pencils", quantity: 24 }
        ];

        var boughtItems = [];

        this.getToBuyItems = function() {
            return toBuyItems;
        };

        this.getBoughtItems = function() {
            return boughtItems;
        };

        this.buyItem = function(index) {
            var removedItems = toBuyItems.splice(index, 1);
            boughtItems.push(removedItems[0]);
            console.log('Bought Item:', removedItems[0]);
        };
    }
})();
