app.controller('NavCtrl', ['$scope', '$state','Auth',
  function($scope, $state, Auth) {
    $scope.signedIn = Auth.isAuthenticated
    $scope.logout = Auth.logout

    Auth.currentUser().then((user) => {
      $scope.user = user
      console.log(user)
    })

    $scope.$on('devise:new-registration', (e, user) => {
      $scope.user = user
    })

     $scope.$on('devise:login', (e, user) => {
       $scope.user = user
     })

     $scope.$on('devise:logout', (e, user) => {
       $scope.user = {}
       $state.go('login')
     })
  }
]);
