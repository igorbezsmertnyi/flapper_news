app.controller('PageAccountCtrl', ['$scope', 'user', 'Auth', 'account', '$state', '$window',
  function($scope, user, Auth, account, $state, $window) {
    $scope.user = user.user

    $scope.changePassword = () => {
      let passParams = {
        password: $scope.passNew,
        password_confirmation: $scope.passConfirm
      }

      account.updatePass(passParams).then((ststus) => {
        console.log(status)
        Auth.logout()
        // $scope.$on('devise:logout', (e, user) => {
        //   $scope.user = {}
        //   $state.go('login')
        // })
      })
    }

    $scope.changeUsername = () => {
      let user = {
        username: $scope.newName
      }
      console.log(user)
      account.updateUserName(user).then((status) => {
        if(status) {
          $window.location.reload()
          alert('Name Successfuly changed')
        }
      })
    }

    $scope.changeEmail = () => {
      let data = {
        email: $scope.newEmail
      }

      account.updateEmeil(data).then((status) => {
        if(status) {
          alert('Email Successfuly updated')
          $window.location.reload()
        }
      })
    }

  }
])
