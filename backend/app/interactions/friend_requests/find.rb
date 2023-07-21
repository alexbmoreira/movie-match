module FriendRequests
  class Find < ApplicationInteraction
    string :user_id

    def execute
      policy_scope(FriendRequest).
        where('creator_id = :user_id OR receiver_id = :user_id', user_id:).first
    end
  end
end
