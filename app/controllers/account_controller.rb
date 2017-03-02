class AccountController < ApplicationController
  before_filter :authenticate_user!

  def index
    token = current_user.reset_password_token
    respond_with current_user, token
  end

  def update_pass
    current_user.update(user_params)
  end

  def update_email
    current_user.update(user_email)
  end

  def update_nick
    current_user.update(user_name)
  end

  private

    def user_params
      params.permit(:password, :password_confirmation)
    end

    def user_name
      params.permit(:username)
    end

    def user_email
      params.permit(:email)
    end

end
