app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post',
  function($scope, $stateParams, posts, post){
    $scope.post = post;
    $scope.comments = $scope.post.comments;

    $scope.addComment = function(){
      console.log(post);
      if($scope.body === '') { return; }
        posts.addComment(post.id, {
          body: $scope.body,
          author: 'user'
        }).then((comment) => {
          $scope.comments.push(comment)
          $scope.body = ''
          console.log($scope.post.comments);
        })
    };

    $scope.incrementUpvotesComment = function(comment) {
      posts.upvoteComment(post, comment)
    };
  }
]);
