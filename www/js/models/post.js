angular.module("foodspace").factory("Post", function($q, Ingredient) {
  function Post(json) {
    json.updated_at = moment(json.updated_at);
    json.ingredients = _.mapValues(json.ingredients, function(ingredients, key) {
      return _.map(ingredients, function(data) {
        return new Ingredient(data);
      });
    });
    _.extend(this, json);
  }

  Post.prototype = {
    like: function() {
      this.liked = !this.liked;
    },
    formatFlavorProfile: function() {
      return this.flavor_profile.slice(0, 2).join(", ");
    },
    getRelativeUpdatedAt: function() {
      return this.updated_at.fromNow();
    }
  };

  var posts = [
    {
      id: 1,
      title: "Lemon Meringue Tart",
      main_image_path: "img/lemon.jpg",
      liked: false,
      flavor_profile: ["sweet"],
      author: {
        name: "@gordongram",
        image_path: "img/gordon.jpg"
      },
      difficulty: "hard",
      updated_at: (new Date()).setDate(0),
      ingredients: {
        main: [
          { name: "All-purpose Flour", quantity: {main: 1, top: 2, bottom: 8, display: "1 1/4"}, units: "cups" },
          { name: "Sugar", quantity: { main: 1, top: 4, bottom: 8, display: "1 1/2" }, units: "cups" },
          { name: "Salt" , quantity: { main: 1, top: 0, bottom: 8, display: "1" }, units: "pinch" },
          { name: "Butter, cold diced", quantity: { main: 6, top: 0, bottom: 8, display: "8" }, units: "tablespoons" },
          { name: "Egg Whites", quantity: { main: 4, top: 0, bottom: 8, display: "4" }, units: "units" },
          { name: "Cream of Tartar", quantity: { main: 0, top: 2, bottom: 8, display: "1/4"}, units: "teaspoons" }
        ],
      "Lemon Filling": [
          { name: "Unsalted Butter", quantity: { main: 8, top: 0, bottom: 8, display: "8" }, units: "tablespoons" },
          { name: "Sugar", quantity: { main: 1, top: 4, bottom: 8, display: "1 1/2" }, units: "cups" },
          { name: "Eggs", quantity: { main: 4, top: 0, bottom: 8, display: "8" }, units: "units" },
          { name: "Lemon Zest", quantity: { main: 0, top: 4, bottom: 8, display: "1/2" }, units: "cups" }
        ]
      },
      recipes: {
        "Lemon Filling": [
          "Cream the butter and sugar in the bowl of an electric mixer fitted with the paddle attachment for 1 minute.",
          "On low speed, add the eggs and egg yolks one at a time, and then add the lemon zest, lemon juice, and salt. Don't worry; it will look curdled.",
          "Pour the mixture into a small saucepan and cook over medium-low heat for 8 to 10 minutes, until thick, stirring constantly with a wooden spoon.",
          "Whisk briskly when it starts to thicken and cook over low heat for 1 to 2 minutes, whisking constantly. Don't allow it to boil! It will be 175 degrees F on an instant-read thermometer.",
          "Pour into a bowl and cool to room temperature."
        ],
        main: [
          "Combine the flour, 3 tablespoons of the sugar, and 1/2 teaspoon salt in a bowl and place in the freezer for 30 minutes.",
          "Put the flour mixture in the bowl of a food processor fitted with a steel blade. Add the butter and shortening and pulse about 10 times until the butter is in small bits.",
          "Add the ice water and process until the dough comes together. Dump on a well-floured board and form into a disk. Wrap in plastic and chill for at least 30 minutes.",
          "Meanwhile, preheat the oven to 375 degrees F.",
          "Roll out the dough and fit into a 9-inch tart pan with removable sides. Don't stretch the dough when placing it in the pan or it will shrink during baking.",
          "Cut off the excess by rolling the pin across the top of the pan.",
          "Line the tart shell with a piece of buttered aluminum foil, butter side down, and fill it with dried beans or rice. Bake for 10 minutes.",
          "Remove the beans and foil and prick the bottom of the shell all over with a fork to allow the steam to escape.",
          "Bake for another 15 to 20 minutes, until lightly browned. Set aside to cool.",
          "Raise the oven temperature to 425 degrees F.",
          "For the meringue, whip the egg whites, cream of tartar, and 1/4 teaspoon salt in the bowl of an electric mixer fitted with the whisk attachment on high speed until frothy.",
          "With the mixer still running, slowly add the remaining 1/2 cup of sugar and beat until the meringue is thick and shiny, about 2 minutes.",
          "Immediately spread the lemon filling in the cooled tart shell and pipe the meringue over it with a large star tip. Be sure the meringue covers the entire top and touches the edges of the shell, to prevent it from shrinking.",
          "Bake for 3 to 5 minutes, until the meringue is lightly browned. Cool to room temperature."
        ]
      },
      cps: 5,
      time_needed: "1h 0m"
    },
    {
      id: 2,
      title: "Grilled Cheese & Bacon",
      main_image_path: "img/sandwich.jpg",
      liked: true,
      difficulty: "easy",
      flavor_profile: ["salty", "umami"],
      author: {
        name: "@vulgarchef",
        image_path: "img/vulgar.jpg"
      },
      updated_at: new Date()
    }
  ];

  Post.fetch = function() {
    return $q(function(resolve, reject) {
      resolve(_.map(posts, function(data) {
        return new Post(data);
      }));
    });
  };

  Post.find = function(id) {
    return $q(function(resolve, reject) {
      var post = _.find(posts, function(post) {
        return post.id == id;
      });

      if (post) {
        resolve(new Post(post));
      } else {
        reject("Not found");
      }
    });
  };

  return Post;
});
