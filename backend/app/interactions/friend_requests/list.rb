module FriendRequests
  class List < ApplicationInteraction
    def execute
      policy_scope(FriendRequest)
    end
  end
end
