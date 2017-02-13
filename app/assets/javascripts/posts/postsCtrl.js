app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post', 'user',
  function($scope, $stateParams, posts, post, user){
    $scope.post = post;
    $scope.comments = $scope.post.comments;
    $scope.user = user.user

    console.log($scope.user)

    $scope.addComment = function(){
      let data = {
        body: $scope.body,
        author: $scope.user.username,
        upvotes: 0
      }
      console.log(post);
      if($scope.body === '') { return; }
        posts.addComment(post.id, data).then((comment) => {
          $scope.comments.push(data)
          console.log(comment);
        })
    };

    $scope.incrementUpvotesComment = function(comment) {
      posts.upvoteComment(post, comment)
    };
  }
]);
