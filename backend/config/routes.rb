Rails.application.routes.draw do
  root to: 'application#not_authorized'

  namespace :api do
    namespace :v1 do
      post '/register', to: 'authentication#register'
      post '/login', to: 'authentication#login'

      resource :search, only: [:show]

      resources :users, only: [:show] do
        member do
          get :friends
          get :watchlist
        end
      end

      resources :tmdb_movies, path: '/movies', only: [:show]
      resources :tmdb_people, path: '/people', only: [:show]

      resources :friend_requests, only: [:show, :index, :create, :destroy] do
        member do
          post :accept
        end
      end
      resources :friendships, only: [:show, :destroy]
      resources :watchlist_movies, only: [:create, :destroy] do
        get '/:movie_id', on: :collection, action: :show, as: :show
      end

      resources :matchlist_actions, only: [:show, :destroy]
      resources :matchlist_likes, only: [:show, :index, :create]
      resources :matchlist_dislikes, only: [:show, :index, :create]
    end
  end
end
