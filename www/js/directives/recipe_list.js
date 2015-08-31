(function() {
  var directive = {
    scope: {
      post: '='
    },
    templateUrl: "templates/directives/recipe_list.html",
    controller: function($scope) {
      var self = this;

      self.post = $scope.post;
      self.completedSteps = {};
      self.completedStepGroups = {};

      self.allCompleteToggle = function(allSteps) {
        var isComplete = self.completedStepGroups[allSteps];
        toggleAllInGroup(allSteps, isComplete);
      };

      self.checkForAllStepsChecked = function(allSteps) {
        if (allStepsChecked(allSteps)) {
          toggleAllInGroup(allSteps, true);
        } else {
          self.completedStepGroups[allSteps] = false;
        }
      };

      function allStepsChecked(allSteps) {
        return _.every(allSteps, function(step) {
          return self.completedSteps[step];
        });
      }

      function toggleAllInGroup(group, to) {
        self.completedStepGroups[group] = to;
        _.each(group, function(one) {
          self.completedSteps[one] = to;
        });
      }
    },
    controllerAs: 'ctrl'
  };

  angular.module("foodspace").directive("recipeList", function() {
    return directive;
  });
})();
