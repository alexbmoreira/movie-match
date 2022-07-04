module Friendships
  class ListForUser < ApplicationInteraction
    object :user, class: User

    def execute
      policy_scope(Friendship).for_user(user)
    end
  end
end
