class CommentsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  before_filter :find_post, only: [:create, :upvote]

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with post, comment
  end

  def upvote
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    comment.increment!(:upvotes)
    respond_with post, comment
  end

  private

    def find_post
      post = Post.find(params[:post_id])
    end

    def comment_params
     params.require(:comment).permit(:body, :author)
    end

    def as_json(options = {})
      super(options.merge(include: [:user, comments: {include: :user}]))
    end

end
