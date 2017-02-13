app.factory('user', ['Auth', function(Auth) {
    let usr = {
      user: []
    }

    usr.getUser = () => {
      return Auth.currentUser().then((user) => {
        usr.user = user
      })
    }

    return usr
  }
])
