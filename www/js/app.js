// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('foodspace', [
  'ionic',
  'mobile-angular-ui.core.capture',
  'ionic-toast',
  'ngCordova'
])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('feed', {
        url: '/',
        templateUrl: 'templates/index.html',
        controller: 'IndexController as ctrl'
      })
      .state('detail', {
        url: '/detail/:id',
        templateUrl: 'templates/detail.html',
        controller: 'DetailController as ctrl',
        resolve: {
          post: function($stateParams, Post) {
            return Post.find($stateParams.id);
          }
        }
      })
      .state('new', {
        url: '/new',
        templateUrl: 'templates/new.html',
        controller: 'NewController as ctrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  }).

  config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("top");
  });
