angular.module("foodspace").factory("Ingredient", function($q) {
  function Ingredient(json) {
    _.extend(this, json);
  }

  Ingredient.prototype = {
    getQuantity: function() {
      return this.quantity.display + " " + this.units;
    }
  };

  return Ingredient;
});
