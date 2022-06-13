module Api
  module Edge
    class UserAuthSerializer < ApplicationSerializer
      type 'users'

      attributes :username,
        :email
    end
  end
end
