class AccountController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    respound_with current_user
  end
end
