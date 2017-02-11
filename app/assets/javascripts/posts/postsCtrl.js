app.controller('PostsCtrl', ['$scope', '$stateParams','posts', 'post',
  function($scope, $stateParams, posts, post){
    $scope.post = post;
    $scope.comments = $scope.post.comments;

    $scope.addComment = function(){
      console.log(post)

      let data = {
        body: $scope.body,
        author: 'user',
        upvotes: 0
      }

      if($scope.body === '') { return }
        posts.addComment(post.id, data).then((comment) => {
          $scope.comments.push(data)
          $scope.body = ''
          console.log($scope.post.comments);
        })
    };

    $scope.incrementUpvotesComment = function(comment) {
      posts.upvoteComment(post, comment)
    };
  }
]);
