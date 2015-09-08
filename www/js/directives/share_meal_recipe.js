(function() {
  var directive = {
    scope: {
      valid: '=',
      post: '='
    },
    templateUrl: "templates/directives/share_meal_recipe.html",
    controller: function($scope) {
      var self = this;

      $scope.post = self.post = {
        dishes: [],
        ingredients: {},
        steps: {}
      };

      self.newDishName = "";
      self.newIngredients = {};
      self.newSteps = {};
      self.units = ["units", "cups", "ounces", "tablespoons", "pinch", "teaspoons", "pints", "liters"];

      /* Dish form interface */

      self.addDish = function() {
        if (self.post.dishes.indexOf(self.newDishName) < 0) {
          self.post.dishes.push(self.newDishName);
        }

        self.newDishName = "";
      };

      self.removeDish = function(dishName) {
        delete self.post.ingredients[dishName];
        delete self.post.steps[dishName];

        _.remove(self.post.dishes, function(dish) {
          return dish === dishName;
        });
      };

      /* Ingredient form interface */

      self.addIngredient = function(dish) {
        if (!self.post.ingredients[dish]) {
          self.post.ingredients[dish] = [];
        }

        self.post.ingredients[dish].push(self.newIngredients[dish]);
        delete self.newIngredients[dish];
      };

      self.newIngredient = function(dish) {
        self.newIngredients[dish] = defaultIngredientFormat();
      };

      /* Step form interface */

      self.addStep = function(dish) {
        if (!self.post.steps[dish]) {
          self.post.steps[dish] = [];
        }

        self.post.steps[dish].push(self.newSteps[dish]);
        delete self.newSteps[dish];
      };

      self.removeStep = function(dish, index) {
        self.post.steps[dish].splice(index, 1);
      };

      self.validationErrors = function() {
        var errors = [];

        if (self.post.dishes.length <= 0) {
          errors.push("This recipe does not have any dishes");
        }

        _.each(self.post.dishes, function(dishName) {
          if (!self.post.ingredients[dishName] || self.post.ingredients[dishName].length <= 0) {
            errors.push(dishName + " does not have ingredients");
          }

          if (!self.post.steps[dishName] || self.post.steps[dishName].length <= 0 ) {
            errors.push(dishName + " does not have a recipe");
          }
        });

        $scope.valid = errors.length === 0;

        return errors;
      };

      function defaultIngredientFormat() {
        return { quantity: { main: 1, top: 0, bottom: 8, display: "1" }, units: 'units' };
      }
    },
    controllerAs: 'ctrl'
  };

  angular.module("foodspace").directive("shareMealRecipe", function() {
    return directive;
  });
})();
