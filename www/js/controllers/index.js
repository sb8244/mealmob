(function() {
  var Ctrl = function(Post) {
    var self = this;

    self.title = "Food Space";

    Post.fetch().then(function(posts) {
      self.posts = posts;
    });
  };

  angular.module("foodspace").controller('IndexController', Ctrl);
})();
