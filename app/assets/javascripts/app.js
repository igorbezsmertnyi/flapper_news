const app = angular.module('flapperNews', ['ui.router', 'templates', 'Devise'])

app.config(['$stateProvider', '$urlRouterProvider', 'AuthProvider',
  function($stateProvider, $urlRouterProvider, AuthProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: [
            'posts', (posts) => {
              return posts.getAll()
            }
          ],
          userPromise: [
            'user', (user) => {
              return user.getCurrentUser()
            }
          ]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: 'posts/_posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', ($stateParams, posts) => {
            return posts.get($stateParams.id)
          }],
          userPromise: [
            'user', (user) => {
              return user.getCurrentUser()
            }
          ]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      })

    $urlRouterProvider.otherwise('home')
  }
]);
