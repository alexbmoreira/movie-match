module Api
  module Edge
    class SessionsController < ApplicationController
      skip_before_action :require_login, only: [:login_user, :register]
      skip_after_action :verify_authorized, only: [:login_user, :register]

      def register
        inputs = {
          username: user_params[:username],
          email: user_params[:email],
          password: user_params[:password],
          password_confirmation: user_params[:password_confirmation]
        }

        user = Sessions::Register.run(inputs)

        auto_login(user) if user.valid?

        respond_with user, serializer: versioned_class(UserAuthSerializer)
      end

      def login_user
        params = user_params
        email = params[:email]&.strip
        password = params[:password]

        user = login(email, password)

        return failed_login_response unless user

        respond_with user, serializer: versioned_class(UserAuthSerializer)
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