Rails.application.routes.draw do
  root to: 'application#not_found'

  namespace :api do
    namespace :v1 do
      resource :sessions, only: [:show] do
        post :login_user
        post :register
        delete :logout
      end

      resource :search, only: [:show]
    end
  end
end
