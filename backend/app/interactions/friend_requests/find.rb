module FriendRequests
  class Find < ApplicationInteraction
    string :id

    def execute
      FriendRequest.find(id)
    end
  end
end
