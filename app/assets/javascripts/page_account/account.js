app.factory('account', ['$http', ($http) => {
    let acc = {
      iusr: []
    }

    acc.getUser = () => {
      return $http.get('/account.json').then((data) => {
        return acc.iusr.push(data.data)
      })
    }

    acc.updatePass = (passParams) => {
      return $http.put('account/update/password.json', passParams).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    acc.updateEmeil = (email) => {
      return $http.put('account/update/email', email).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    acc.updateUserName = (username) => {
      return $http.put('account/update/username.json', username).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    return acc
  }
])
