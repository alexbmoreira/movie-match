module Api
  module V1
    class AuthenticationController < ApplicationController
      skip_before_action :authorize, only: [:register, :login, :logout]

      def register
        ActiveRecord::Base.transaction do
          user = User.new(user_params)
          if user.save
            token = encode_token({ user_id: user.id })
            persist_jwt_token(token)
          end
          respond_with user, serializer: versioned_class(UserSerializer)
        end
      end

      def login
        ActiveRecord::Base.transaction do
          user = User.find_by(username: user_params[:username])
    
          if user&.authenticate(user_params[:password])
            token = encode_token({ user_id: user.id })
            persist_jwt_token(token)
            respond_with user, serializer: versioned_class(UserSerializer)
          else
            return failed_login_response unless user
          end
        end
      end

      def logout
        cookies.delete(:jwt)
        respond_with({ message: 'Logged out' })
      end

      private

      def failed_login_response
        result = User.new
        result.errors.add(:base, 'Incorrect username or password')

        respond_with result
      end

      def user_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(
          params, only: [:email, :username, :password, :passwordConfirmation]
        )
      end

      def persist_jwt_token(token)
        cookies.signed[:jwt] = {
          value:  token,
          httponly: true,
          secure: Rails.env.production?,
          same_site: :none
        }
      end
    end
  end
end
