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
          get :joint_watchlist
          get :matchlist
        end
      end

      resources :tmdb_movies, path: '/movies', only: [:show]
      resources :tmdb_people, path: '/people', only: [:show]

      resources :friend_requests, only: [:index, :create, :destroy] do
        collection do
          get '/:user_id', action: :show, as: :show
        end
        member do
          post :accept
        end
      end
      resources :friendships, only: [:destroy] do
        collection do
          get '/:user_id', action: :show, as: :show
        end
      end
      resources :watchlist_movies, only: [:create, :destroy] do
        collection do
          get '/:movie_id', action: :show, as: :show
        end
      end

      resources :matchlist_actions, only: [:show, :destroy]
      resources :matchlist_likes, only: [:create] do
        collection do
          get '/with_user/:user_id', action: :with_user
        end
      end
      resources :matchlist_dislikes, only: [:create] do
        collection do
          get '/with_user/:user_id', action: :with_user
        end
      end
    end
  end
end
