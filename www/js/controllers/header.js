(function() {
  var Ctrl = function($ionicSideMenuDelegate) {
    this.toggleMenu = function() {
      $ionicSideMenuDelegate.toggleRight();
    };
  };

  angular.module("foodspace").controller('HeaderController', Ctrl);
})();
