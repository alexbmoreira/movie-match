module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :require_login, only: [:login_user, :register, :logout_user]
      skip_after_action :verify_authorized, only: [:login_user, :register, :logout_user]

      def register
        user = Sessions::Register.run(user_params)

        auto_login(user.result) if user.valid?

        respond_with user, serializer: versioned_class(UserAuthSerializer)
      end

      def login_user
        params = user_params
        username = params[:username]&.strip
        password = params[:password]

        user = login(username, password)

        return failed_login_response unless user

        respond_with user, serializer: versioned_class(UserAuthSerializer)
      end

      def logout_user
        logout
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
