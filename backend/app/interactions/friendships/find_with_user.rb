module Friendships
  class FindWithUser < ApplicationInteraction
    object :user, class: User

    def execute
      policy_scope(Friendship).between_users(user, current_user)
    end
  end
end
