Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #root to: 'home#index'
  root to: 'application#angular'

  resources :posts, only: [:create, :index, :show, :destroy] do
    resources :comments, only: [:show, :create, :destroy] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end

end
