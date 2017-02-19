app.controller('PageAccountCtrl', ['$scope', 'user',
  function($scope, user) {
    $scope.user = user.user

    console.log($scope.user);
  }
])
