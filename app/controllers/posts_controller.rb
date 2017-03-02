class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote, :show, :destroy]

  def index
    respond_with Post.all
  end

  def create
    respond_with Post.create(post_params.merge(user_id: current_user.id))
  end

  def show
    post = Post.find(params[:id])
    respond_with post
  end

  def user_posts
    respond_with Post.where(user_id: params[:id]).all
  end

  def upvote
    post = Post.find(params[:id])
    post.increment!(:upvotes)
    respond_with post
  end

  def destroy
    post = Post.find(params[:id])
    if current_user.id.eql? post.user_id
      comments = Comment.where(post_id: params[:id])
      comments.delete_all
      post.destroy
    end
  end

  private

    def post_params
      params.require(:post).permit(:link, :title)
    end

    def as_json(options = {})
      super(options.merge(include: [:user, comments: [include: :user ]]))
    end

end
