(function() {
  var Ctrl = function(post, Comment) {
    var self = this;

    self.post = post;
    self.newCommentData = {};

    Comment.forPost(post).then(function(comments) {
      self.comments = comments;
    });

    self.createComment = function() {
      Comment.create(self.newCommentData).then(function(comment) {
        self.comments.push(comment);
        self.newCommentData = {};
      });
    };
  };

  angular.module("foodspace").controller('DetailController', Ctrl);
})();
