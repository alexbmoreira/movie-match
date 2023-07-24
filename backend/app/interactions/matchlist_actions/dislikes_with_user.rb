module MatchlistActions
  class DislikesWithUser < ApplicationInteraction
    string :user_id

    def execute
      policy_scope(MatchlistDislike).where(friend_id: user_id)
    end
  end
end
