Rails.application.routes.draw do
  root to: 'application#not_authorized'

  namespace :api do
    namespace :v1 do
      resource :sessions, only: [:show] do
        post :login_user
        post :register
        delete :logout_user
      end

      resource :search, only: [:show]

      resources :tmdb_movies, path: '/movies', only: [:show]
      resources :tmdb_people, path: '/people', only: [:show]

      resources :friend_requests, only: [:show, :index, :create, :destroy] do
        member do
          post :accept
        end
      end
      resources :friendships, only: [:show, :index, :destroy]

      resources :watchlist_movies, only: [:show, :index, :create, :destroy]
      resources :matchlist_actions, only: [:show]
      resources :matchlist_likes, only: [:show, :index, :create, :destroy]
      resources :matchlist_dislikes, only: [:show, :index, :create, :destroy]
    end
  end
end
