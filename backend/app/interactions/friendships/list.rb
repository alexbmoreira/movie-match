module Friendships
  class List < ApplicationInteraction
    def execute
      policy_scope(Friendship).for_user(current_user)
    end
  end
end
