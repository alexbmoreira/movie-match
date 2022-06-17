module FriendRequests
  class List < ApplicationInteraction
    def execute
      FriendRequest.where('creator_id = ? OR receiver_id = ?', current_user.id, current_user.id)
    end
  end
end
