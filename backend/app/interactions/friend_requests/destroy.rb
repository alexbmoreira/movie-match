module FriendRequests
  class Destroy < ApplicationInteraction
    object :friend_request, class: FriendRequest

    def execute
      friend_request.destroy
      friend_request
    end
  end
end
