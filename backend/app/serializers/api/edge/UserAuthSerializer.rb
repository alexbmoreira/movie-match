module Api
  module Edge
    class UserAuthSerializer < ApplicationSerializer
      attributes :username,
        :email

      attribute(:attribute) { object }
    end
  end
end
