module Api
  module V1
    class UserAuthSerializer < ApplicationSerializer
      type 'users'

      attributes :username,
        :email,
        :token

      def token
        @instance_options[:token]
      end
    end
  end
end
