module Api
  module V1
    class AuthenticationController < ApplicationController
      skip_before_action :authorize, only: [:register, :login, :logout]

      def register
        ActiveRecord::Base.transaction do
          user = User.new(user_params)
          if user.save
            token = encode_token({ user_id: user.id })
          end
          respond_with user, serializer: versioned_class(UserAuthSerializer), token: token
        end
      end

      def login
        ActiveRecord::Base.transaction do
          user = User.find_by(username: user_params[:username])

          if user&.authenticate(user_params[:password])
            token = encode_token({ user_id: user.id })
            respond_with user, serializer: versioned_class(UserAuthSerializer), token: token
          else
            failed_login_response
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
    end
  end
end
