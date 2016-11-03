(function() {
    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categories'];
    function CategoriesController(categories) {
        var ctrl = this;

        console.log('categories:', categories);

        ctrl.categories = categories;
    }
})();
