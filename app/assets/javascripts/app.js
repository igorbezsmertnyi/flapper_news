const app = angular.module('flapperNews', ['ui.router', 'templates', 'Devise', 'angularFileUpload'])

app.config(['$stateProvider', '$urlRouterProvider', 'AuthProvider',
  function($stateProvider, $urlRouterProvider, AuthProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: [
            'posts', 'Auth', '$state', (posts, Auth, $state) => {
              if(!Auth.isAuthenticated) {
                $state.go('login')
              }
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
      .state('account', {
        url: '/account',
        templateUrl: 'page_account/_page_account.html',
        controller: 'PageAccountCtrl',
        resolve: {
          userPromise: ['user', (user) => {
            return user.getCurrentUser()
          }]
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
      .state('user-post', {
        url: '/posts/user/{id}',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', '$stateParams', (posts, $stateParams) => {
            return posts.getUserPost($stateParams.id)
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', ($state, Auth) => {
          Auth.currentUser().then(() => {
            $state.go('home');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', ($state, Auth) => {
          Auth.currentUser().then(() => {
            $state.go('home');
          })
        }]
      })

    $urlRouterProvider.otherwise('login')
  }
]);
