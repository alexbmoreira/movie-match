module Api
  module V1
    class UserAuthSerializer < ApplicationSerializer
      type 'users'

      attributes :username,
        :email
    end
  end
end
