(function() {
  var Ctrl = function(post, Comment) {
    var self = this;

    self.post = post;

    Comment.forPost(post).then(function(comments) {
      self.comments = comments;
    });
  };

  angular.module("foodspace").controller('DetailController', Ctrl);
})();
