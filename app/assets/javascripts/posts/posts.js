app.factory('posts', ['$http', function($http) {
    var o = {
      posts: []
    };

    o.getAll = function() {
      return $http.get('/posts.json').then(function(data){
        //o.posts.push(data)
        angular.copy(data, o.posts);
      });
    };

    o.create = function(post) {
      return $http.post('/posts.json', post).then(function(data){
        o.posts.push(data);
      });
    };

    return o;
  }
]);
