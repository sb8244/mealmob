angular.module("foodspace").factory("Ingredient", function($q) {
  function Ingredient(json) {
    _.extend(this, json);
  }

  Ingredient.prototype = {
    getQuantity: function() {
      var str = (this.quantity || "");

      if (this.unit && this.unit !== "units") {
        str += " " + this.unit;
      }

      return str;
    }
  };

  return Ingredient;
});
