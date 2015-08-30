angular.module("foodspace").factory("Comment", function($q) {
  function Comment(json) {
    json.updated_at = moment(json.updated_at);
    _.extend(this, json);
  }

  Comment.prototype = {
    getRelativeUpdatedAt: function() {
      return this.updated_at.fromNow();
    }
  };

  var comments = [
    {
      id: 1,
      content: "Wow this looks delicious! I really like the fresh lemon zest.",
      author: {
        name: "@steve",
        image_path: "img/gordon.jpg"
      },
      updated_at: (new Date()).setDate(0)
    },
    {
      id: 2,
      content: "Have you thought about scorching the top of the tarts?",
      author: {
        name: "@vulgarsteve",
        image_path: "img/vulgar.jpg"
      },
      updated_at: new Date()
    }
  ];

  Comment.forPost = function(post) {
    return $q(function(resolve, reject) {
      var mapped = _.map(comments, function(raw) {
        return new Comment(raw);
      });

      resolve(mapped);
    });
  };

  Comment.create = function(commentData) {
    return $q(function(resolve, reject) {
      var data = {
        id: parseInt(Math.random() * 1000) + 2,
        content: commentData.content,
        author: {
          name: "demo",
          image_path: "img/gordon.jpg"
        },
        updated_at: new Date()
      };

      resolve(new Comment(data));
    });
  };

  return Comment;
});
