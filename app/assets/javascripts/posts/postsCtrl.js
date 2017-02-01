app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts',
  function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.comments = $scope.post.comments;

    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      console.log($scope.post.comments);
      $scope.body = '';
    };

    $scope.incrementUpvotesComment = function(comment) {
      comment.upvotes += 1;
    };
  }
]);
