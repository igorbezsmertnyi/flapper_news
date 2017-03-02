class CommentsController < ApplicationController
  before_filter :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user_id: current_user.id, user: current_user))
    respond_with post, comment
  end

  def upvote
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    comment.increment!(:upvotes)
    respond_with post, comment
  end

  def destroy
    post = Post.find(params[:post_id])
    comments = post.comments.find(params[:id])
    if current_user.id.eql? comments.user_id
      comments = post.comments.find(params[:id]).destroy
    end
  end

  private

    def comment_params
     params.require(:comment).permit(:body)
    end

    def as_json(options = {})
      super(options.merge(include: [:user, comments: {include: :user}]))
    end

end
