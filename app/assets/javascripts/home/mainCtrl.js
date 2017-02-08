app.controller('MainCtrl', ['$scope', 'posts',
  function ($scope, posts) {
    $scope.posts = posts.posts

    console.log($scope.posts);

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        link: $scope.link,
        upvote: 0
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }
]);
