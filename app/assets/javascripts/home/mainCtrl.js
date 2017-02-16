app.controller('MainCtrl', ['$scope', 'posts', '$window', 'user',
  function($scope, posts, $window, user) {
    $scope.posts = posts.posts
    let userData = user.user

    console.log($scope.posts, userData);

    $scope.addPost = () => {
      let data = {
        title: $scope.title,
        link: $scope.link,
        username: userData.username,
        upvotes: 0
      }

      if(!$scope.title || $scope.title === '') { return }
        posts.create(data).then((status) => {
          if(status) {
            alert('Successfuly posted')
            $scope.posts.push(data)
            $scope.title = ''
            $scope.link = ''
          } else {
            alert('An error occurred')
          }
        })
    }

    $scope.incrementUpvotes = (post) => {
      posts.upvote(post)
    }

    $scope.removePost = (id, index) => {
      posts.delete(id).then((status) => {
        if(status) {
          alert('Successfuly deleted')
          $scope.posts.splice(index, 1)
        } else {
          alert('An error occurred')
        }
      })
    }
  }
])
