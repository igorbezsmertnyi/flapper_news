app.controller('MainCtrl', ['$scope', 'posts',
  function ($scope, posts) {
    $scope.posts = posts.posts

    console.log($scope.posts)

    $scope.addPost = function(){
      let data = {
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      }
      if(!$scope.title || $scope.title === '') { return }
      posts.create(data)
      location.reload()
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }
]);
