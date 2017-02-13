app.controller('MainCtrl', ['$scope', 'posts', '$window', 'user',
  function ($scope, posts, $window, user) {
    $scope.posts = posts.posts
    $scope.user = user.user

    console.log($scope.user);

    $scope.addPost = function(){
      let data = {
        title: $scope.title,
        link: $scope.link,
        username: $scope.user.username
      }

      if(!$scope.title || $scope.title === '') { return; }
        posts.create(data);
        $window.location.reload();
        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }
]);
