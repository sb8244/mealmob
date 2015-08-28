(function() {
  var directive = {
    scope: {
      post: '='
    },
    templateUrl: "templates/directives/summary_card.html",
    controller: function($scope) {
      this.post = $scope.post;
    },
    controllerAs: 'ctrl'
  };

  angular.module("foodspace").directive("summaryCard", function() {
    return directive;
  });
})();
