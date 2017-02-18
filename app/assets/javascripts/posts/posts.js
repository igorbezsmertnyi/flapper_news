app.factory('posts', ['$http', 'Auth', ($http, Auth) => {
    let o = {
      posts: []
    }

    o.getAll = () => {
      if(Auth.isAuthenticated) {
        return $http.get('/posts.json').then((data) => {
          angular.copy(data.data, o.posts)
        })
      } else {
        return {}
      }
    }

    o.getUserPost = (id) => {
      return $http.get(`/posts/user/${id}.json`).then((data) => {
        angular.copy(data.data, o.posts)
      })
    }

    o.create = (post) => {
      return $http.post('/posts.json', post).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    o.delete = (id) => {
      return $http.delete(`posts/${id}.json`).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    o.upvote = (post) => {
      return $http.put(`/posts/${post.id}/upvote.json`).then((data) => {
        post.upvotes += 1
      })
    }

    o.get = (id) => {
      return $http.get(`/posts/${id}.json`).then((res) => {
        return res.data
      })
    }

    o.deleteComment = (comment) => {
      return $http.delete(`/posts/${comment.post_id}/comments/${comment.id}.json`).then((data) => {
        return true
      }, (err) => {
        return false
      })
    }

    o.addComment = (id, comment) => {
      return $http.post(`/posts/${id}/comments.json`, comment).then((data) => {
        o.posts.push(data)
      })
    }

    o.upvoteComment = (post, comment) => {
      return $http.put(`/posts/${post.id}/comments/${comment.id}/upvote.json`).then((data) => {
        comment.upvotes += 1
      })
    }

    return o
  }
]);
