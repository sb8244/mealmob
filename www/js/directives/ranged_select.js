(function() {
  var directive = {
    scope: {
      min: '&',
      max: '&',
      stepMax: '&',
      selected: '='
    },
    templateUrl: "templates/directives/ranged_select.html",
    controller: function($scope) {
      $scope.options = [];

      for(var i = $scope.min(); i < $scope.max(); i++) {
        for(var partial = 0; partial < $scope.stepMax(); partial++) {
          var fraction = {};
          fraction = { main: i, top: partial, bottom: $scope.stepMax() };
          fraction.display = displayFraction(fraction);

          if (_.isEqual(_.omit(fraction, 'display'), _.omit($scope.selected, 'display'))) {
            $scope.selected = fraction;
          }

          if (fraction.display) {
            $scope.options.push(fraction);
          }
        }
      }

      var last = { main: $scope.max(), top: 0, bottom: $scope.stepMax() };
      last.display = displayFraction(last);
      $scope.options.push(last);
    }
  };

  angular.module("foodspace").directive("rangedSelect", function() {
    return directive;
  });

  function displayFraction(fraction) {
    var arr = [];

    if (fraction.main !== 0) {
      arr.push(fraction.main);
    }

    if (fraction.top !== 0) {
      var reduced = reduce(fraction.top, fraction.bottom);
      arr.push(reduced[0] + "/" + reduced[1]);
    }

    return _.select(arr).join(" ");
  }

  function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }
})();
