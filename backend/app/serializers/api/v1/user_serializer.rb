module Api
  module V1
    class UserSerializer < ApplicationSerializer
      type 'users'

      attributes :username,
        :email
    end
  end
end
