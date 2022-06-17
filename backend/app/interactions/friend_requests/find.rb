module FriendRequests
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(FriendRequest).find(id)
    end
  end
end
