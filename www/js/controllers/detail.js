(function() {
  var Ctrl = function(post) {
    var self = this;

    self.post = post;
  };

  angular.module("foodspace").controller('DetailController', Ctrl);
})();
