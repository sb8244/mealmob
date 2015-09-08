(function() {
  var Ctrl = function() {
    var self = this;

    self.valid = false;
  };

  angular.module("foodspace").controller('NewController', Ctrl);
})();
