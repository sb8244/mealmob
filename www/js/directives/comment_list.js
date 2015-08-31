(function() {
  var directive = {
    scope: {
      comments: '='
    },
    templateUrl: "templates/directives/comment_list.html",
    controller: function($scope, Comment) {
      var self = this;

      self.comments = $scope.comments;
      self.newCommentData = {};

      self.createComment = function() {
        Comment.create(self.newCommentData).then(function(comment) {
          self.comments.push(comment);
          self.newCommentData = {};
        });
      };
    },
    controllerAs: 'ctrl'
  };

  angular.module("foodspace").directive("commentList", function() {
    return directive;
  });
})();
