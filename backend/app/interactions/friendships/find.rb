module Friendships
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(Friendship).for_user(current_user).find(id)
    end
  end
end
