(function() {
    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['categoryItems'];
    function ItemsController(categoryItems) {
        var ctrl = this;
        console.log('categoryItems:', categoryItems);

        ctrl.category = categoryItems.category;
        ctrl.items = categoryItems.items;
    }
})();
