app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post', 'user',
  function($scope, $stateParams, posts, post, user) {
    $scope.post = post
    $scope.comments = $scope.post.comments
    let userData = user.user

    console.log(userData, $scope.comments)

    $scope.addComment = () => {
      let data = {
        body: $scope.body,
        author: userData.username,
        upvotes: 0
      }
      console.log(post)
      if($scope.body === '') { return }
        posts.addComment(post.id, data).then((comment) => {
          $scope.comments.push(data)
          $scope.body = ''
        })
    };

    $scope.incrementUpvotesComment = (comment) => {
      posts.upvoteComment(post, comment)
    }

    $scope.showRm = (comment) => {
      return (comment.user_id === userData.id) ? true : false
    }

    $scope.removeComment = (comment, index) => {
      posts.deleteComment(comment).then((status) => {
        if(status) {
          alert('Comment successfuly deleted')
          $scope.comments.splice(index, 1);
        } else {
          alert('An error occurred')
        }
      })
    }
  }
])
