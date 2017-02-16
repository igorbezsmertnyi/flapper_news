app.factory('user', ['Auth', function(Auth) {
    let o = {
      user: []
    }

    o.getCurrentUser = () => {
      return Auth.currentUser().then((user) => {
        o.user = user
      })
    }

    return o
  }
]);
