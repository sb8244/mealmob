(function() {
  var Ctrl = function($scope) {
    var self = this;

    self.recipeValid = false;
    self.infoValid = false;
    self.post = {};
    self.requiredInfoFields = ["title", "time_to_prepare", "cost_per_person", "difficulty", "base64_image"];

    self.preparationOptions = ["5m", "15m", "30m", "45m", "1h", "1h 15m", "1h 30m", "1h 45m", "2+h"];
    self.costOptions = ["$5", "$10", "$15", "$20+"];
    self.difficultyOptions = ["easy", "medium", "hard"];

    self.valid = function() {
      return self.recipeValid && self.infoValid;
    };

    $scope.$watchCollection('ctrl.post', function(post) {
      if (post) {
        var keys = _.map(post, function(v, k) {
          if (v) {
            return k;
          }
        });

        self.infoValid = _.isEqual(_.difference(self.requiredInfoFields, keys), []);
      }
    });
  };

  Ctrl.$inject = ["$scope"];

  angular.module("foodspace").controller('NewController', Ctrl);
})();
