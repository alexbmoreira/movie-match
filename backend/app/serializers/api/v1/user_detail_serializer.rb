module Api
  module V1
    class UserDetailSerializer < ApplicationSerializer
      type 'users'

      attributes :username
    end
  end
end
