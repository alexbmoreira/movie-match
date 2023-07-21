module Friendships
  class Find < ApplicationInteraction
    string :user_id

    def execute
      policy_scope(Friendship).where(user_id: user_id, friend_id: current_user.id).or(
        policy_scope(Friendship).where(user_id: current_user.id, friend_id: user_id)
      ).first
    end
  end
end
