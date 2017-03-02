app.controller('MainCtrl', ['$scope', 'posts', '$window', 'user',
  function($scope, posts, $window, user) {
    $scope.posts = posts.posts
    let userData = user.user

    console.log($scope.posts)

    const generatePostId = () => {
      let arr = []

      $scope.posts.forEach((val, index) => {
        arr[index] = val.id
      })

      return Math.max(...arr) + 1
    }

    $scope.addPost = () => {
      let data = {
        title: $scope.title,
        link: $scope.link,
        user_id: userData.id,
        upvotes: 0,
        id: generatePostId()
      }

      let tmpUsr = {
        title: $scope.title,
        link: $scope.link,
        user_id: userData.id,
        upvotes: 0,
        id: generatePostId(),
        user: {
          username: userData.username
        }
      }

      if(!$scope.title || $scope.title === '') { return }
        posts.create(data).then((status) => {
          console.log(status)
          if(status) {
            alert('Successfuly posted')
            $scope.posts.push(tmpUsr)
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

    $scope.showRm = (post) => {
      return (post.user_id === userData.id) ? true : false
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
