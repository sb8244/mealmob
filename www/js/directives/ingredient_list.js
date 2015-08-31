(function() {
  var directive = {
    scope: {
      post: '='
    },
    templateUrl: "templates/directives/ingredient_list.html",
    controller: function($scope) {
      this.post = $scope.post;
    },
    controllerAs: 'ctrl'
  };

  angular.module("foodspace").directive("ingredientList", function() {
    return directive;
  });
})();
