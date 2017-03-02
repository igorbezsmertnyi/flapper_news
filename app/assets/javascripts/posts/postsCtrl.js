app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post', 'user',
  function($scope, $stateParams, posts, post, user) {
    $scope.post = post
    $scope.comments = $scope.post.comments
    let userData = user.user

    console.log(post)

    // console.log(userData, $scope.comments)

    $scope.addComment = () => {
      let data = {
        body: $scope.body,
        upvotes: 0
      }
      let tmp = {
        user_id: userData.id,
        body: $scope.body,
        upvotes: 0,
        user: {
          username: userData.username
        }
      }
      console.log(post)
      if($scope.body === '') { return }
        posts.addComment(post.id, data).then((comment) => {
          $scope.comments.push(tmp)
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
