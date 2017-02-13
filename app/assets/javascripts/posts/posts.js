app.factory('posts', ['$http', function($http) {
    let o = {
      posts: []
    }

    o.getAll = () => {
      return $http.get('/posts.json').then((data) => {
        angular.copy(data.data, o.posts)
      }) || {}
    }

    o.create = (post) => {
      return $http.post('/posts.json', post).then((data) => {
        o.posts.push(data)
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
