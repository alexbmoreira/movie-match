module MatchlistActions
  class LikesWithUser < ApplicationInteraction
    string :user_id

    def execute
      policy_scope(MatchlistLike).where(friend_id: user_id)
    end
  end
end
