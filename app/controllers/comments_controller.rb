class CommentsController < ApplicationController
  before_filter :authenticate_user!
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

  def destroy
    post = Post.find(params[:post_id])
    comments = post.comments.find(params[:id])
    if current_user.id.eql? comments.user_id
      comments = post.comments.find(params[:id]).destroy
    end
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
