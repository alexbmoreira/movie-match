module Api
  module V1
    class UserDetailSerializer < ApplicationSerializer
      type 'users'

      attributes :username

      attribute(:avatar_color) { Avatar.color(object.avatar_color.to_sym) }
      attribute(:avatar_initial) { Avatar.initial(object.username) }
    end
  end
end
