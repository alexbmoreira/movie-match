Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :sessions, only: [:show] do
        post :login_user
        post :register
        delete :logout
      end
    end
  end
end
